

import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import Product from "../models/product.model.js";

const orderResolver = {
  Query: {
    getOrderById: async (_, { orderId }) => {
      const order = await OrderModel.findById(orderId);
      return order;
    },
  },
  Mutation: {
    createOrder: async (_, args) => {
      const { input } = args;
      const { userId, items } = input;

      // Create a new order using the OrderModel
      const newOrder = new OrderModel({
        user: userId,
        items: items.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
      });

      // Save the order to the database
      const createdOrder = await newOrder.save();

      return createdOrder; // Return the created order
    },
  },
  Order: {
    user: async (parent) => {
      console.log(parent , "0")
      const user = await UserModel.findById(parent.user);
      return user;
    },
    items: async (parent) => {
      console.log(parent , "1")
      const items = await Product.find({ _id: { $in: parent.items } });
      return items;
    },
  },
  OrderItem: {
    product: async (parent) => {
      console.log(parent , "2")
      const product = await Product.findById(parent.product);
      return product;
    },
  },
};

export default orderResolver;