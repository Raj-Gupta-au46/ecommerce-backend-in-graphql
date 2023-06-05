import gql from "graphql-tag";

const productSchema = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Int!
    category: Category
    productImage: String
  }
  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product]!
  }
  input ProductsFilterInput {
    name: String
  }
  type Query {
    getProduct(id: ID!): Product
    getAllProducts: [Product]
  }

  type Mutation {
    createProduct(
      name: String!
      description: String!
      price: Int!
      categoryId: String
      productImage: String
    ): Product
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Int
      categoryId: String
      productImage: String
    ): Product
    deleteProduct(id: ID!): Boolean!
  }
`;

export default productSchema;
