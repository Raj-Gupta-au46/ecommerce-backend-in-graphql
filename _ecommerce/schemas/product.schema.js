import gql from 'graphql-tag';

const productSchema = gql`
type Product {
    id: ID!
    name: String!
    description: String!
    price: Int!
    category: String
    productImage: String
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
      category: String
      productImage: String
    ): Product
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Int
      category: String
      productImage: String
    ): Product
    deleteProduct(id: ID!): Product
  }
`

export default productSchema