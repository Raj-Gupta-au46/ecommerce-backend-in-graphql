import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import allTypeDefs from "./src/schemas/index.schema.js";
import allResolvers from "./src/resolvers/index.resolver.js";
import context from "./src/context/context.js";
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
      context: context,
    });
  })
  .then((server) => {
    console.log(`🚀  Server ready at: ${server.url}`);
  });
