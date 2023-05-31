import gql from "graphql-tag";

const orderSchema = gql`
  type Order {
    _id: ID!
    user: User!
    items: [OrderItem]
    totalPrice: Int
    totalItems: Int
    totalQuantity: Int
  }

  type User {
    _id: ID!
  }

  type OrderItem {
    product: Product!
    quantity: Int!
  }

  type Product {
    _id: ID!
  }

  type Query {
    getOrderById(orderId: ID!): Order
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order
  }

  input CreateOrderInput {
    user: ID!
    items: [CreateOrderItemInput]!
    totalPrice: Int!
    totalItems: Int!
    totalQuantity: Int!
  }

  input CreateOrderItemInput {
    product: ID!
    quantity: Int!
  }
`;

export default orderSchema;
