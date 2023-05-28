

import gql from 'graphql-tag'

const cartSchema = gql`

type User {
  id: ID!
  name: String!
  email: String!
}

type CartItem {
  id: ID!
  product: Product!
  quantity: Int!
}
type Product {
  _id: ID!
  name: String!
  price: Int!
}



type Cart {
  _id: ID!
  products: [CartItem!]!
  user: User!
}

type Query {
  getCart(id: ID!): Cart
}

type Mutation {
  addProductToCart(userId: ID!, productId: ID!, quantity: Int!): Cart
  updateCartItemQuantity(userId: ID!, cartItemId: ID!, quantity: Int!): Cart
  removeProductFromCart(userId: ID!, cartItemId: ID!): Cart
  clearCart(userId: ID!): Cart
}
`

export default cartSchema  