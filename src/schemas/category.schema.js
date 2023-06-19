import gql from "graphql-tag";

const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
    description: String!
  }
  type Query {
    getAllCategory: [Category]!
    getCategory(id: ID!): Category!
  }

  type Mutation {
    createCategory(input: createCategoryInput): Category!
    updateCategory(id: ID!, input: updateCategoryInput): Category!
    deleteCategory(id: ID!): Boolean!
  }

  input createCategoryInput {
    name: String!
    description: String!
  }

  input updateCategoryInput {
    name: String!
    description: String!
  }
`;

export default categorySchema;
