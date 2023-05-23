import mongoose, { Schema, model} from 'mongoose'
import UserModel from './user.models.js'
import Product from './product.model.js'

const orderSchema = new Schema({
user :{
    type: mongoose.Schema.Types.ObjectId,
    ref:UserModel,
    required:true,
    trim:true 
},
 items: [{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:Product,
        required:true,
        trim:true
    },
    quantity: {
        type: Number,
        required:true,
        trim:true,
        min:1
    }
 }],
 totalPrice:{
    type:Number,
    required:true,
    trim:true

 },
 totalItems:{
    type:Number,
    required:true,
    trim:true 
 },
 totalQuantity :{
    type:Number,
    required:true,
    trim:true
 },

})

const OrderModel = model('Order',orderSchema)

export default OrderModel;

