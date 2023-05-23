

import gql from 'graphql-tag'

const cartSchema = gql`

type Product {
    id: ID!
    name: String!
    price: Int!
  }
  
  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
  }
  

  
  type Query {
    getUser(id: ID!): Cart
  }
  
  type Mutation {
    addProductToCart(userId: ID!, productId: ID!, quantity: Int!): Cart
    updateCartItemQuantity(user:ID!,productId:ID!,quantity:Int!):Cart
    removeProductFromCart(cartId: ID!, itemId: ID!): Cart
    clearCart(userId:ID!):Cart
  }
`

export default cartSchema 