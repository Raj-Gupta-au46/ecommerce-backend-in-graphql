import mongoose, { Schema, model } from 'mongoose';
import Category from './category.model.js';

const productSchema = new Schema({
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
    
  },
  productImage: {
    type: String,
  },
});

const Product = model('Product', productSchema);

export default Product;


