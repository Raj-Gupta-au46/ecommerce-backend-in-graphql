import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const getUser = async (token) => {
  try {
    if (token) {
      const user = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return user;
    }
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  } catch (error) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
const context = async ({ req, res }) => {
  try {
    const token = req.headers.authorization || "";
    console.log(token);
    if (!token)
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });

    const user = await getUser(token);

    if (!user) {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    } else {
      const admin = user.role === "admin"; // Assuming the user object has a 'role' property
      if (admin) {
        return { user, isAdmin: true };
      } else {
        return { user };
      }
    }
  } catch (error) {
    // console.log(error);
    // throw new GraphQLError(`Error ${error}`, {
    //   extensions: {
    //     code: `ERROR_ ${error}`,
    //     http: { status: 401 },
    //   },
    // });
  }
};

export default context;
