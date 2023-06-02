import mongoose, { Schema, model } from "mongoose";
import Category from "./category.model.js";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
  },
  productImage: {
    type: String,
  },
});

const Product = model("Product", productSchema);

export default Product;
