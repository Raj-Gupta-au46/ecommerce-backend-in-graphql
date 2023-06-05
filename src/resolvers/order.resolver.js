import Order from "../models/order.model.js";
import UserModel from "../models/user.models.js";
import Product from "../models/product.model.js";
import { GraphQLError } from "graphql";

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
      const person = await UserModel.findById(user);
      if (!person) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "USER_NOT_FOUND",
          },
        });
      }

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
        return createdOrder;
      } catch (error) {
        throw new Error("Failed to create order.");
      }
    },
    updateOrder: async (_, args) => {
      const orderID = await Order.findById(args.id);
      if (!orderID) {
        throw new GraphQLError("Order is not available", {
          extensions: {
            code: "NO_ORDER_AVAILABLE",
          },
        });
      }

      const updatedOrder = await Order.findByIdAndUpdate(args.id, args.input, {
        new: true,
      });
      return updatedOrder;
    },

    deleteOrder: async (_, { orderId }) => {
      try {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new GraphQLError("Order not found", {
            extensions: {
              code: "ORDER_NOT_FOUND",
            },
          });
        }
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        return true;
      } catch (error) {
        throw new Error("Failed to delete order.");
      }
    },
  },
};

export default orderResolver;
