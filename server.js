import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import allTypeDefs from "./src/schemas/index.schema.js";
import allResolvers from "./src/resolvers/index.resolver.js";
import { getUser } from "./src/context/context.js";
import {
  constraintDirectiveTypeDefs,
  constraintDirective,
} from "graphql-constraint-directive";
import { GraphQLError } from "graphql";

dotenv.config();

const server = new ApolloServer({
  typeDefs: [constraintDirectiveTypeDefs, allTypeDefs],
  resolvers: allResolvers,
  schemaDirectives: {
    constraint: constraintDirective,
  },
  includeStacktraceInErrorResponses: false, //to exclude stackTrace parameter from error messages
  introspection: true,
});

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is connected successfully");
    return startStandaloneServer(server, {
      context: async ({ req, res }) => {
        try {
          const token = req.headers.authorization || " ";

          if (!token) {
            throw new Error("Missing authentication token");
          }
          const user = await getUser(token);

          if (!user) {
            throw new GraphQLError("User is not authenticated", {
              extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
              },
            });
          } else {
            const admin = user.role;
            if (admin === "admin") {
              return { user };
            } else {
              return { user };
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      listen: {
        port: 4000,
      },
    });
  })
  .then((server) => {
    console.log(`🚀  Server ready at: ${server.url}`);
  })
  .catch((error) => {
    console.log(error);
  });
