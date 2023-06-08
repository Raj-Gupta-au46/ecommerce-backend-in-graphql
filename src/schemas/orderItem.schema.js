import gql from "graphql-tag";
const orderItemSchema = gql`
  scalar DateTime
  type OrderItem {
    id: ID!
    productId: Product!
    categoryId: Category!
    quantity: Int!
    price: Float!
    totalPrice: Float!
    createdAt: DateTime!
  }

  type Query {
    getAllOrderItem: [OrderItem]!
    getOrderItem(id: ID!): OrderItem!
  }

  type Mutation {
    createOrderItem(input: createOrderItemInput): OrderItem!
    updateOrderItem(id: ID!, input: updateOrderItemInput): OrderItem!
    deleteOrderItem(id: ID!): Boolean!
  }

  input createOrderItemInput {
    productId: ID!
    categoryId: ID!
    quantity: Int!
    price: Float!
  }
  input updateOrderItemInput {
    quantity: Int!
    price: Float!
  }
`;

export default orderItemSchema;
