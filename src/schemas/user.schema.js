import gql from "graphql-tag";

const userSchema = gql`
  scalar DateTime
  input SignupInput {
    email: String!
    password: String!
    fname: String!
    lname: String
  }

  type User {
    id: ID!
    email: String!
    fname: String!
    lname: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  input LoginInput {
    email: String!
    password: String!
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
    password: String
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
    deleteUser(userId: ID!): Boolean!
  }
`;

export default userSchema;
