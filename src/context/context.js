import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const getUser = async (token) => {
  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return decodedToken;
    }
    return null;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new GraphQLError("Token expired. Please authenticate again.", {
        extensions: {
          code: "TOKEN_EXPIRED",
        },
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new GraphQLError("Invalid token. Please provide a valid JWT.", {
        extensions: {
          code: "TOKEN_INVALID",
        },
      });
    } else {
      throw new GraphQLError("Error occurred while decoding token.", {
        extensions: {
          code: "TOKEN_DECODING_ERROR",
        },
      });
    }
  }
};
