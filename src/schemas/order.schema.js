import gql from "graphql-tag";

const orderSchema = gql`
  type Order {
    _id: ID!
    user: UserWithToken!
    items: [OrderItem]
    totalPrice: Int
    totalItems: Int
    totalQuantity: Int
  }

  type OrderItem {
    product: Product!
    quantity: Int!
  }

  type Query {
    getOrderById(orderId: ID!): Order
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order
    updateOrder(input: UpdateOrderInput): Order
    deleteOrder(orderId: ID!): Boolean
  }

  input UpdateOrderInput {
    orderId: ID!
    totalItems: Int
    totalPrice: Int
    totalQuantity: Int
  }

  input CreateOrderInput {
    userId: ID!
    items: [CreateOrderItemInput!]
    totalPrice: Int!
    totalItems: Int!
    totalQuantity: Int!
  }

  input CreateOrderItemInput {
    productId: ID!
    quantity: Int!
  }
`;

export default orderSchema;
