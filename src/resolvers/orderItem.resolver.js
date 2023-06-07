import { GraphQLError } from "graphql";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
const orderItemResolvers = {
  Query: {
    getAllOrderItem: async () => {
      try {
        const orderItemId = await OrderItem.find()
          .populate("productId")
          .populate("categoryId");
        if (!orderItemId) {
          throw new GraphQLError("OrderItem is not Found", {
            extensions: {
              code: "ORDER_ITEM_IS_NOT_FOUND",
            },
          });
        } else {
          return orderItemId;
        }
      } catch (error) {
        throw new GraphQLError(`Error / ${error}`, {
          extensions: {
            code: `ERROR / ${error}}`,
          },
        });
      }
    },
    getOrderItem: async (_, args, context) => {
      try {
        const OrderItemID = await OrderItem.findById(args.id)
          .populate("productId")
          .populate("categoryId");
        if (!OrderItemID) {
          throw new GraphQLError("OrderItem not found", {
            extensions: {
              code: "ORDER_ITEM_NOT_FOUND",
            },
          });
        } else {
          return OrderItemID;
        }
      } catch (error) {
        throw new GraphQLError(`Error Found \ ${error}`, {
          extensions: {
            code: `ERROR_FOUND \ ${error}`,
          },
        });
      }
    },
  },
  Mutation: {
    createOrderItem: async (_, args, context) => {
      try {
        const { productId, categoryId, quantity, price } = args.input;
        const product = await Product.findById(productId);
        if (!product) {
          throw new GraphQLError("Product is not Found", {
            extensions: {
              code: "PRODUCT_NOT_FOUND",
            },
          });
        }
        const category = await Category.findById(categoryId);
        if (!category) {
          throw new GraphQLError("Category is not Found", {
            extensions: {
              code: "CATEGORY_ID_NOT_FOUND",
            },
          });
        }

        const orderItemIdProductExit = await OrderItem.findOne({ productId });

        if (orderItemIdProductExit) {
          throw new GraphQLError("OrderItem is already exist", {
            extensions: {
              code: "ORDER_ITEM_ALREADY_EXIST",
            },
          });
        }
        const totalPrices = quantity * price;
        const newOrderItem = new OrderItem({
          productId,
          categoryId,
          quantity,
          price,
          totalPrice: totalPrices,
        });

        const res = await newOrderItem.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        throw new GraphQLError(`Error / ${error}`, {
          extensions: {
            code: `ERROR_${error}`,
          },
        });
      }
    },
    updateOrderItem: async (_, args, context) => {
      try {
        const { quantity, price } = args.input;
        const updateOrderId = await OrderItem.findById(args.id);
        if (!updateOrderId) {
          throw new GraphQLError("OrderItem Id is not found", {
            extensions: {
              code: "ORDER_ITEM_ID_NOT_EXIST",
            },
          });
        } else {
          const totalPrice = quantity * price;
          const updatedOrderItem = await OrderItem.findByIdAndUpdate(
            args.id,
            { ...args.input, totalPrice },
            { new: true }
          )
            .populate("productId")
            .populate("categoryId");

          return updatedOrderItem;
        }
      } catch (error) {
        throw new GraphQLError(`Error ${error}`, {
          extensions: {
            code: `ERROR \ ${error}`,
          },
        });
      }
    },
    deleteOrderItem: async (_, args, context) => {
      try {
        const deleteOrderId = await OrderItem.findById(args.id);
        if (!deleteOrderId) {
          throw new GraphQLError("Order ID is not found", {
            extensions: {
              code: "ORDER_ID_NOT_FOUND",
            },
          });
        } else {
          const deletedOrderItem = await OrderItem.findByIdAndDelete(args.id)
            .populate("productId")
            .populate("categoryId");
          return deletedOrderItem;
        }
      } catch (error) {
        throw new GraphQLError(`Error Found /${error}`, {
          extensions: {
            code: `ERROR_FOUND_${error}`,
          },
        });
      }
    },
  },
};

export default orderItemResolvers;
