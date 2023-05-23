

import UserModel from "../models/user.models.js";
import Product from "../models/product.model.js";
import throwCustomError, { ErrorTypes } from '../helpers/error-handler.helper.js';

const cartResolver = {
  Query: {
    getUser: async (_, { userId }) => {
      const user = await UserModel.findById(userId);
      return user;
    },
  },
  Mutation: {
    addProductToCart: async (_, { userId, productId, quantity }) => {
      try {
        const user = await UserModel.findById(userId);
        if (!user) {
          throwCustomError('User not found', ErrorTypes.NOT_FOUND);
        }

        const product = await Product.findById(productId);
        if (!product) {
          throwCustomError('Product not found', ErrorTypes.NOT_FOUND);
        }

        const cartItem = {
          product: product._id,
          quantity,
        };

        user.cart.products.push(cartItem);
        await user.save();

        return user.cart;
      } catch (error) {
        throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
      }
    },
    updateCartItemQuantity: async (_, { userId, cartItemId, quantity }) => {
      try {
        const user = await UserModel.findById(userId);
        if (!user) {
          throwCustomError('User not found', ErrorTypes.NOT_FOUND);
        }

        const cartItem = user.cart.products.find(item => item._id.toString() === cartItemId);
        if (!cartItem) {
          throwCustomError('Cart item not found', ErrorTypes.NOT_FOUND);
        }

        cartItem.quantity = quantity;
        await user.save();

        return user.cart;
      } catch (error) {
        throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
      }
    },
    removeProductFromCart: async (_, { userId, cartItemId }) => {
      try {
        const user = await UserModel.findById(userId);
        if (!user) {
          throwCustomError('User not found', ErrorTypes.NOT_FOUND);
        }

        const cartItemIndex = user.cart.products.findIndex(item => item._id.toString() === cartItemId);
        if (cartItemIndex === -1) {
          throwCustomError('Cart item not found', ErrorTypes.NOT_FOUND);
        }

        user.cart.products.splice(cartItemIndex, 1);
        await user.save();

        return user.cart;
      } catch (error) {
        throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
      }
    },
    clearCart: async (_, { userId }) => {
      try {
        const user = await UserModel.findById(userId);
        if (!user) {
          throwCustomError('User not found', ErrorTypes.NOT_FOUND);
        }

        user.cart.products = [];
        await user.save();

        return user.cart;
      } catch (error) {
        throwCustomError(error.message, ErrorTypes.INTERNAL_SERVER_ERROR);
      }
    },
  },
};

export default cartResolver;