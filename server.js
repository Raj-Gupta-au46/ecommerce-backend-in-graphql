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

const mongoDB = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB..");
    return startStandaloneServer(server, {
      listen: { port: process.env.PORT },
      context: async ({ req, res }) => {
        try {
          const token = req.headers.authorization || " ";
          if (!token) {
            throw new Error("Missing authentication token");
          }
          const user = await getUser(token);
          console.log(user.role);
          const admin = user.role;
          if (!user) {
            throw new GraphQLError("User is not authenicated", {
              extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
              },
            });
          } else {
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
    });
  })
  .then((server) => {
    console.log(`🚀  Server ready at: ${server.url}`);
  });
