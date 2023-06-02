import gql from "graphql-tag";

const reviewSchema = gql`
  scalar DateTime

  type Review {
    id: ID!
    createdAt: DateTime!
    title: String!
    comment: String!
    rating: Int!
  }

  input AddReviewInput {
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
  input UpdateReviewInput {
    id: ID
    updatedAt: DateTime
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
  type Mutation {
    addReview(input: AddReviewInput!): Review!
    updateReview(id: ID!, input: UpdateReviewInput!): Review
    deleteReview(id: ID!): Boolean!
  }
`;

export default reviewSchema;
