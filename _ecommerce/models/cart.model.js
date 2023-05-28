import mongoose , {Schema, model} from 'mongoose'
import UserModel from './user.models.js';
import Product from './product.model.js'

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product, // Update to string value 'Product'
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
}, { timestamps: true });

// Add populate method to populate the products field
cartSchema.pre('findOne', function (next) {
  this.populate('products.product'); // Populate the products.product field
  next();
});

// Add populate method to populate the products field when using find methods
cartSchema.pre('find', function (next) {
  this.populate('products.product'); // Populate the products.product field
  next();
});

const CartModel = model('Cart', cartSchema);

export default CartModel;

