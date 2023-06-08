import gql from "graphql-tag";
const paymentSchema = gql`
  scalar DateTime
  type Payment {
    id: ID!
    paymentStatus: PaymentStatus!
    orderId: Order!
    paymentMethod: String!
    amount: Float!
    createdAt: Date!
  }

  enum PaymentStatus {
    PENDING
    COMPLETED
    FAILED
  }

  type Query {
    getAllPayment: [Payment!]!
    getPaymentID(id: ID!): Payment!
  }

  type Mutation {
    createPayment(input: createPaymentInput): Payment!
    updatePayment(id: ID!, input: updatePaymentInput): Payment!
    deletePayment(id: ID!): Boolean!
  }

  input createPaymentInput {
    orderId: ID!
    paymentStatus: String!
    paymentMethod: String!
    amount: Float!
  }

  input updatePaymentInput {
    amount: Float!
    paymentStatus: PaymentStatus!
    paymentMethod: String!
  }
`;
export default paymentSchema;
