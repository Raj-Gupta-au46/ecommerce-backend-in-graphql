import gql from "graphql-tag";

const cartSchema = gql`
  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    total: Float!
    createdAt: DateTime
  }

  type Cart {
    id: ID!
    user: UserWithToken!
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
