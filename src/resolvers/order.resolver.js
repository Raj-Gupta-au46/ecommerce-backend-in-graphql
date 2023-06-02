import Order from "../models/order.model.js";
import UserModel from "../models/user.models.js";
import Product from "../models/product.model.js";

const orderResolver = {
  Query: {
    getOrderById: async (_, { orderId }) => {
      const order = await Order.findById(orderId);
      return order;
    },
  },
  Mutation: {
    createOrder: async (_, { input }) => {
      const { user, items, totalPrice, totalItems, totalQuantity } = input;

      // Create a new order using the Order model
      const newOrder = new Order({
        user,
        items: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
        totalPrice,
        totalItems,
        totalQuantity,
      });

      try {
        // Save the order to the database
        const createdOrder = await newOrder.save();

        // Retrieve the populated order from the database
        const populatedOrder = await Order.findById(createdOrder._id)
          .populate("user")
          .populate("items.product");

        return populatedOrder; // Return the populated order
      } catch (error) {
        throw new Error("Failed to create order.");
      }
    },
  },
  Order: {
    user: async (parent) => {
      const user = await UserModel.findById(parent.user);
      return user;
    },
    items: async (parent) => {
      const itemIds = parent.items.map((item) => item.product);
      const items = await Product.find({ _id: { $in: itemIds } });
      return items;
    },
  },
  OrderItem: {
    product: async (parent) => {
      const product = await Product.findById(parent.product);
      return product;
    },
    quantity: (parent) => parent.quantity,
  },
};

export default orderResolver;
