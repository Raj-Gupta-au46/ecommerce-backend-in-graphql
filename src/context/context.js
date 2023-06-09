import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const getUser = async (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return user;
    }
    return null;
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      throw new GraphQLError("Invalid token. Please provide a valid JWT.", {
        extensions: {
          code: "TOKEN_INVALID ",
        },
      });
    }
    throw new GraphQLError(`Error ${error}`, {
      extensions: {
        code: `ERROR ${error}`,
      },
    });
  }
};
