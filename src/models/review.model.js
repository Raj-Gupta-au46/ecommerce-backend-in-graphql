import mongoose, { Schema, model } from "mongoose";
import Product from "./product.model.js";

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
  },
  { timestamps: true }
);

const ReviewModel = model("Review", reviewSchema);
export default ReviewModel;
