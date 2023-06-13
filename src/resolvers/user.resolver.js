import UserModel from "../models/user.models.js";
import userHelper from "../helpers/user.helper.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcryptjs";
import throwCustomError, {
  ErrorTypes,
} from "../helpers/error-handler.helper.js";
import { GraphQLError } from "graphql";

const userResolver = {
  Query: {
    getUsers: async (_, { total }, contextValue) => {
      try {
        const users = await UserModel.find()
          .sort({ createdAt: -1 })
          .limit(total);
        return users;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getUserById: async (_, { id }, contextValue) => {
      try {
        const user = await UserModel.findById(id);
        return user;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const { email, password, fname, lname } = input;

      if (!validator.isEmail(email)) {
        throwCustomError(
          "E-mail type is not in the correct format",
          ErrorTypes.BAD_USER_INPUT
        );
      }

      if (password.length < 6) {
        throwCustomError(
          "Password should be at least 6 characters long",
          ErrorTypes.BAD_USER_INPUT
        );
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      if (fname.length < 2 || fname.length > 150) {
        throwCustomError(
          "First name should be between 2 and 150 characters long",
          ErrorTypes.BAD_USER_INPUT
        );
      }

      if (lname.length < 2 || lname.length > 150) {
        throwCustomError(
          "Last name should be between 2 and 150 characters long",
          ErrorTypes.BAD_USER_INPUT
        );
      }

      const isUserExists = await userHelper.isEmailAlreadyExist(email);
      if (isUserExists) {
        throwCustomError(
          "Email is already registered",
          ErrorTypes.ALREADY_EXISTS
        );
      }

      const userToCreate = new UserModel({
        email: email,
        password: hashedPassword,
        fname: fname,
        lname: lname,
      });

      const user = await userToCreate.save();

      const generateToken = (user) => {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_PRIVATE_KEY,
          { expiresIn: process.env.TOKEN_EXPIRY_TIME }
        );
        return token;
      };
      const token = generateToken(user);

      return {
        __typename: "UserWithToken",
        ...user._doc,
        userJwtToken: {
          token: token,
        },
      };
    },

    login: async (_, { input: { email, password } }, context) => {
      const user = await UserModel.findOne({
        $and: [{ email: email }, { password: password }],
      });

      if (!validator.isEmail(email)) {
        throwCustomError(
          "E-mail type is not in the correct format",
          ErrorTypes.BAD_USER_INPUT
        );
      }

      if (user) {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_PRIVATE_KEY,
          { expiresIn: process.env.TOKEN_EXPIRY_TIME }
        );

        return {
          ...user._doc,
          userJwtToken: {
            token: token,
          },
        };
      }

      throwCustomError(
        "Invalid email or password entered.",
        ErrorTypes.BAD_USER_INPUT
      );
    },
    deleteUser: async (parent, { userId }) => {
      try {
        const user = await UserModel.findByIdAndDelete(userId);
        if (!user) {
          throw new Error(`User with id ${userId} is not present`);
        }
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default userResolver;
