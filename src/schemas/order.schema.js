import gql from "graphql-tag";
const orderTypeDefs = gql`
  scalar Date
  type Order {
    id: ID!
    orderNumber: String!
    customer: User!
    totalAmount: Float!
    createAt: Date
  }

  type Query {
    getAllOrder: [Order!]!
    getOrder(id: ID!): Order!
  }

  type Mutation {
    createOrder(input: createOrderInput): Order!
    updateOrder(id: ID!, input: updateOrderInput): Order!
    deleteOrder(id: ID!): Boolean!
  }

  input createOrderInput {
    orderNumber: String!
    customer: ID!
    totalAmount: Float!
  }
  input updateOrderInput {
    orderNumber: String!
    totalAmount: Float!
  }
`;

export default orderTypeDefs;
