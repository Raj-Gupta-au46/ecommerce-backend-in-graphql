import gql from "graphql-tag";

const cartSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    total: Float!
    createdAt: DateTime
  }

  type Cart {
    id: ID!
    user: User!
    items: [CartItem]!
    total: Float!
  }

  type Query {
    getCart(userId: ID!): [Cart]!
  }

  type Mutation {
    addProductToCart(
      userId: ID!
      productId: ID!
      quantity: Int!
      price: Int!
    ): Cart
    updateCartItemQuantity(userId: ID!, cartItemId: ID!, quantity: Int!): Cart
    removeProductFromCart(userId: ID!, cartItemId: ID!): Cart
    clearCart(userId: ID!): Boolean
  }
`;

export default cartSchema;
