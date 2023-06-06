import gql from "graphql-tag";

const adminSchema = gql`
  type Admin {
    id: ID!
    username: String!
    password: String!
    email: String!
    token: JwtToken!
    role: String!
  }

  type Query {
    getAdmin(id: ID!): Admin!
  }

  type Mutation {
    createAdmin(input: createAdminInput): Admin!
    updateAdmin(id: ID!, input: updateAdminInput): Admin!
    deleteAdmin(id: ID!): Admin!
    loginAdmin(input: loginAdminInput): Boolean!
  }

  input loginAdminInput {
    username: String!
    password: String!
  }
  type JwtToken {
    token: String!
  }
  input createAdminInput {
    username: String!
    email: String!
    password: String!
    role: String!
  }

  input updateAdminInput {
    username: String!
    email: String!
    password: String!
  }
`;

export default adminSchema;
