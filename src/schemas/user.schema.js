// import { constraintDirectiveTypeDefs } from "graphql-constraint-directive";
// import gql from "graphql-tag";

// const userSchema = gql`
//   ${constraintDirectiveTypeDefs}

//   scalar DateTime
//   input SignupInput {
//     email: String!
//       @constraint(pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")
//     password: String! @constraint(minLength: 8)
//     fname: String!
//     lname: String
//   }

//   input LoginInput {
//     email: String!
//       @constraint(pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")
//     password: String! @constraint(minLength: 8)
//   }

//   type User {
//     _id: ID
//     email: String
//     password: String
//     fname: String
//     lname: String
//     createdAt: DateTime
//     updatedAt: DateTime
//   }

//   type Query {
//     getUsers(total: Int): [User]
//     getUserById(id: ID!): User!
//   }

//   type JwtToken {
//     token: String!
//   }

//   type UserWithToken {
//     _id: String
//     email: String
//     fname: String
//     lname: String
//     createdAt: DateTime
//     updatedAt: DateTime
//     userJwtToken: JwtToken
//   }

//   type Mutation {
//     login(input: LoginInput): UserWithToken
//     signup(input: SignupInput): UserWithToken
//   }
// `;

// export default userSchema;

import { constraintDirectiveTypeDefs } from "graphql-constraint-directive";
import gql from "graphql-tag";

const userSchema = gql`
  ${constraintDirectiveTypeDefs}

  scalar DateTime
  input SignupInput {
    email: String!
      @constraint(pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$")
    password: String! @constraint(minLength: 8)
    fname: String!
    lname: String
  }

  input LoginInput {
    email: String!
      @constraint(pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$")
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

export default userSchema;
