import gql from "graphql-tag";
import { constraintDirectiveTypeDefs } from "graphql-constraint-directive";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import * as yup from "yup";

const userSchema = gql`
  ${constraintDirectiveTypeDefs}

  scalar DateTime

  input SignupInput {
    email: String! @constraint(format: "email")
    password: String! @constraint(minLength: 8)
    fname: String!
    lname: String
  }

  input LoginInput {
    email: String! @constraint(format: "email")
    password: String! @constraint(minLength: 8)
  }

  type User {
    _id: ID
    email: String
    password: String
    fname: String
    lname: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    getUsers(total: Int): [User]
    getUserById(id: ID!): User!
  }

  type JwtToken {
    token: String!
  }

  type UserWithToken {
    _id: String
    email: String
    fname: String
    lname: String
    createdAt: DateTime
    updatedAt: DateTime
    userJwtToken: JwtToken
  }

  type Mutation {
    login(input: LoginInput): UserWithToken
    signup(input: SignupInput): UserWithToken
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [userSchema],
});

const validationMiddleware = {
  async Mutation(resolve, parent, args, context, info) {
    const { operation } = info;

    if (operation === "signup") {
      const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        fname: yup.string().required(),
        lname: yup.string(),
      });

      await schema.validate(args.input, { abortEarly: false });
    }

    return resolve(parent, args, context, info);
  },
};

const schemaWithMiddleware = applyMiddleware(schema, validationMiddleware);

export default schemaWithMiddleware;
