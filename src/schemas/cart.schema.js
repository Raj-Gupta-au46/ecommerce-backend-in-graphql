import gql from "graphql-tag";

const cartSchema = gql`
  type CartItem {
    id: ID!
    productId: Product!
    quantity: Int!
    total: Float!
    createdAt: DateTime
  }

  type Cart {
    id: ID!
    userId: UserWithToken!
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
    clearCart(id: ID!): Boolean!
  }
`;

export default cartSchema;
