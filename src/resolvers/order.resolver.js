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
      try {
        const { user, items, totalPrice, totalItems, totalQuantity } = input;
        // console.log(input);
        const users = await UserModel.findById({ _id: user });
        console.log(users);
        // if (!users) {
        //   throw new GraphQLError("User not found", "USER_NOT_FOUND");
        // }
        // const newOrder = new Order({
        //   user,
        //   items: [{product,quantity}]
        //   totalPrice,
        //   totalItems,
        //   totalQuantity,
        // });
        // console.log("newOrder==", newOrder);
        // const createdOrder = await newOrder.save();
        // console.log("createdOrder==", createdOrder);
        // return createdOrder;
        const newOrder = await Order.create({
          user,
          items,
          totalPrice,
          totalItems,
          totalQuantity,
        });
        return newOrder;
      } catch (error) {
        if (error.extensions) {
          throw error;
        } else {
          throw new GraphQLError(
            "Failed to create order",
            "CREATE_ORDER_FAILED"
          );
        }
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
