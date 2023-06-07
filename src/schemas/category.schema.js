import gql from "graphql-tag";

const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
    products(input: ProductsFilterInput): [Product]!
  }

  input ProductsFilterInput {
    id: ID
    name: String
  }

  type Query {
    getCategory(id: ID!): Category
    getAllCategory: [Category]
  }

  type Mutation {
    createCategory(name: String!): Category
    updateCategory(id: ID!, name: String): Category
    deleteCategory(id: ID!): Boolean!
  }
`;

export default categorySchema;
