import UserModel from "../models/user.models.js";
import userHelper from "../helpers/user.helper.js";
import jwt from "jsonwebtoken";
import validator from "validator";
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
      const errors = [];
      if (!validator.isEmail(email)) {
        errors.push({ message: "E-mail is invalid" });
      }

      const isUserExists = await userHelper.isEmailAlreadyExist(email);
      if (isUserExists) {
        throwCustomError(
          "Email is already registered",
          ErrorTypes.ALREADY_EXISTS
        );
      }
      const createdUser = new UserModel({
        email: email,
        password: password,
        fname: fname,
        lname: lname,
      });
      const user = await createdUser.save();
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.TOKEN_EXPIRY_TIME }
      );

      return {
        __typename: "UserWithToken",
        ...user._doc,
        userJwtToken: {
          token: token,
        },
      };
    },
    // here working on graphql validation

    login: async (_, { input: { email, password } }, context) => {
      const user = await UserModel.findOne({
        $and: [{ email: email }, { password: password }],
      });
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
  },
};

export default userResolver;
