import { GraphQLError } from "graphql";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import adminHelper from "../helpers/admin.helper.js";
import { ErrorTypes } from "../helpers/error-handler.helper.js";

const adminResolver = {
  Query: {
    getAdmin: async (_, args, context) => {
      try {
        const existingAdmin = await Admin.findById(args.id);
        if (!existingAdmin) {
          throw new GraphQLError("Admin not found", {
            extensions: {
              code: "ADMIN_NOT_FOUND",
            },
          });
        } else {
          return existingAdmin;
        }
      } catch (error) {
        throw new GraphQLError(`Error__:${error}`, {
          extensions: {
            code: `ERROR__:${error}`,
          },
        });
      }
    },
  },

  Mutation: {
    createAdmin: async (_, args, context) => {
      const { username, email, password, role } = args.input;

      if (!validator.isEmail(email)) {
        throw new GraphQLError(
          "E-mail type is not in the correct format",
          null,
          null,
          {
            errorType: ErrorTypes.BAD_USER_INPUT,
          }
        );
      }

      if (password.length < 6) {
        throw new GraphQLError(
          "Password should be at least 6 characters long",
          null,
          null,
          {
            errorType: ErrorTypes.BAD_USER_INPUT,
          }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      if (username.length < 2 || username.length > 150) {
        throw new GraphQLError(
          "Username should be between 2 and 150 characters long",
          null,
          null,
          {
            errorType: ErrorTypes.BAD_USER_INPUT,
          }
        );
      }

      const isadminExists = await adminHelper.isEmailAlreadyExist(email);
      if (isadminExists) {
        throw new GraphQLError("Email is already registered", null, null, {
          errorType: ErrorTypes.ADMIN_ALREADY_EXISTS,
        });
      }

      const adminToCreate = new Admin({
        email: email,
        password: hashedPassword,
        username: username,
        role: role,
      });

      try {
        const admin = await adminToCreate.save();

        const token = jwt.sign(
          { adminId: admin._id, email: admin.email },
          process.env.JWT_PRIVATE_KEY,
          { expiresIn: process.env.TOKEN_EXPIRY_TIME }
        );

        return {
          __typename: "Admin",
          ...admin._doc,
          adminJwtToken: {
            token: token,
          },
        };
      } catch (error) {
        throw new GraphQLError(`Error__${error}`, null, null, {
          errorType: ErrorTypes.INTERNAL_SERVER_ERROR,
        });
      }
    },
    updateAdmin: async (_, args, context) => {
      const { username, email, password } = args.input;
      try {
        const existingAdmin = await Admin.findById(args.id);
        console.log(existingAdmin);
        if (!existingAdmin) {
          throw new GraphQLError("Admin not exist", {
            extensions: {
              code: "ADMIN_NOT_EXIST",
            },
          });
        } else {
          const updatedAdmin = await Admin.findByIdAndUpdate(
            args.id,
            args.input,
            { new: true }
          );
          return updatedAdmin;
        }
      } catch (error) {
        throw new GraphQLError(`Error__${error}`, {
          extensions: {
            code: `ERROR__${error}`,
          },
        });
      }
    },

    deleteAdmin: async (_, args, context) => {
      try {
        const isAmdinDeleted = await Admin.findById(args.id);
        if (!isAmdinDeleted) {
          throw new GraphQLError("Admin not found", {
            extensions: {
              code: "Admin",
            },
          });
        } else {
          const deleteAdmin = await Admin.findByIdAndDelete(args.id);
          return deleteAdmin;
        }
      } catch (error) {
        throw new GraphQLError(`Error__${error}`, {
          extensions: {
            code: `ERROR__${error}`,
          },
        });
      }
    },

    loginAdmin: async (_, args, context) => {
      const { username, password } = args.input;

      if (!validator.isEmail(username)) {
        throw new GraphQLError("Username should be a valid email", null, null, {
          errorType: ErrorTypes.BAD_USER_INPUT,
        });
      }

      try {
        const admin = await Admin.findOne({ email: username });
        if (admin) {
          const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
          );
          if (isPasswordValid) {
            const token = jwt.sign(
              { adminId: admin._id, email: admin.email },
              process.env.JWT_PRIVATE_KEY,
              { expiresIn: process.env.TOKEN_EXPIRY_TIME }
            );
            return {
              ...admin._doc,
              adminJwtToken: {
                token: token,
              },
            };
          }
        }
        throw new GraphQLError("Invalid email or password", null, null, {
          errorType: ErrorTypes.BAD_USER_INPUT,
        });
      } catch (error) {
        throw new GraphQLError(`Error__${error}`, {
          extensions: {
            code: `ERROR__${error}`,
          },
        });
      }
    },
  },
};

export default adminResolver;
