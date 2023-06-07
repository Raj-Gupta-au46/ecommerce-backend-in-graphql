import Order from "../models/order.model.js";
import UserModel from "../models/user.models.js";

import { GraphQLError } from "graphql";

const orderResolver = {
  Query: {
    getAllOrder: async () => {
      try {
        const res = await Order.find().populate("customer");

        return res;
      } catch (error) {
        throw new GraphQLError(`Error ${error}`, {
          extensions: {
            code: `ERROR ${error}`,
          },
        });
      }
    },
    getOrder: async (_, args, context) => {
      const orderId = await Order.findById(args.id);

      if (!orderId) {
        throw new GraphQLError("OrderID not found ", {
          extensions: {
            code: "ORDER_ID IS NOT FOUND",
          },
        });
      } else {
        return orderId;
      }
    },
  },
  Mutation: {
    createOrder: async (_, args, context) => {
      console.log(args);
      try {
        const { orderNumber, customer, totalAmount } = args.input;
        const user = await UserModel.findById(customer);

        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: {
              code: "USER_NOT_FOUND",
            },
          });
        } else {
          const existingOrder = await Order.findOne({ orderNumber });
          console.log("orderId");
          console.log(existingOrder);
          if (existingOrder) {
            throw new GraphQLError("Order is already created", {
              extensions: {
                code: "ORDER ALREADY CREATED",
              },
            });
          } else {
            const newOrder = new Order({
              orderNumber,
              customer,
              totalAmount,
            });
            const res = await newOrder.save();
            //  console.log(res);
            return {
              id: res.id,
              ...res._doc,
              customer: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
              },
            };
          }
        }
      } catch (error) {
        throw new GraphQLError(`Error ${error}`, {
          extensions: {
            code: "ERROR",
          },
        });
      }
    },
    updateOrder: async (_, args, context) => {
      console.log(args);
      const orderID = await Order.findById(args.id);
      if (!orderID) {
        throw new GraphQLError("Order is Not Found", {
          extensions: {
            code: "ORDER IS NOT FOUND",
          },
        });
      } else {
        const updateOrder = await Order.findByIdAndUpdate(args.id, args.input, {
          new: true,
        });

        return updateOrder;
      }
    },
    deleteOrder: async (_, args, context) => {
      console.log(args);
      const OrderID = await Order.findById(args.id);
      if (!OrderID) {
        throw new GraphQLError("Order is Not Found", {
          extensions: {
            code: "ORDER IS NOT FOUND",
          },
        });
      } else {
        const deletedOrder = await Order.findByIdAndDelete(args.id);

        return deletedOrder;
      }
    },
  },
};

export default orderResolver;
