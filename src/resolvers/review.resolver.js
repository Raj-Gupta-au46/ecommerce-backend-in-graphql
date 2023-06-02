import ReviewModel from "../models/review.model.js";

const reviewResolver = {
  Mutation: {
    addReview: async (_, { input }) => {
      const { title, comment, rating, productId } = input;

      const newReview = await ReviewModel.create({
        title,
        comment,
        rating,
        product: productId,
      });

      return newReview;
    },

    updateReview: async (_, { id, input }) => {
      const updatedReview = await ReviewModel.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true }
      );

      return updatedReview;
    },

    deleteReview: async (_, { id }) => {
      await ReviewModel.findByIdAndDelete(id);
      return true;
    },
  },
};

export default reviewResolver;
