import mongoose , {Schema, model} from 'mongoose'
import UserModel from './user.models.js';
import Product from './product.model.js'

const cartSchema = new Schema ({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:UserModel,
        required: true,
      },
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
    });
    
    const CartModel = model('Cart', cartSchema);
    
    export default CartModel;
