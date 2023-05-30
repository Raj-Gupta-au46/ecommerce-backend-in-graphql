import CartModel from "../models/cart.model.js";
import UserModel from "../models/user.models.js";
import ProductModel from "../models/product.model.js";
import { ApolloError } from "apollo-server-errors";

const resolvers = {
  Query: {
    getCart: async (_, { userId }) => {
      try {
        const cart = await CartModel.findOne({ user: user }).populate(
          "products.product"
        );
        return cart;
      } catch (error) {
        throw new ApolloError("Failed to fetch cart", "FETCH_CART_ERROR");
      }
    },
  },
  Mutation: {
    addProductToCart: async (_, { userId, productId, quantity }) => {
      try {
        const existingCart = await CartModel.findOne({ user: userId });

        if (existingCart) {
          throw new Error("Cart already exists for this user");
        }

        const newCart = new CartModel({
          user: userId,
          products: [
            {
              product: productId,
              quantity: quantity,
            },
          ],
        });

        const createdCart = await newCart.save();

        return createdCart;
      } catch (error) {
        throw new ApolloError(
          "Failed to add product to cart",
          "ADD_PRODUCT_TO_CART_ERROR"
        );
      }
    },

    updateCartItemQuantity: async (_, { userId, cartItemId, quantity }) => {
      try {
        const user = await UserModel.findByIdAndUpdate(
          userId,
          { $set: { "cart.products.$[elem].quantity": quantity } },
          { new: true, arrayFilters: [{ "elem._id": cartItemId }] }
        );

        if (!user) {
          throw new Error("User not found");
        }

        return user.cart;
      } catch (error) {
        throw new Error("Failed to update cart item quantity");
      }
    },
    removeProductFromCart: async (_, { cartItemId }) => {
      try {
        const user = await UserModel.findOneAndUpdate(
          { "cart.products._id": cartItemId },
          { $pull: { "cart.products": { _id: cartItemId } } },
          { new: true }
        ).populate("cart.products.product");

        if (!user) {
          throw new ApolloError(
            "Failed to remove product from cart",
            "REMOVE_PRODUCT_FROM_CART_ERROR"
          );
        }

        return user.cart;
      } catch (error) {
        throw new ApolloError(
          "Failed to remove product from cart",
          "REMOVE_PRODUCT_FROM_CART_ERROR"
        );
      }
    },
    clearCart: async (_, { userId }) => {
      try {
        const cart = await UserModel.findOneAndUpdate(
          { _id: userId },
          { $unset: { cart: 1 } },
          { new: true }
        ).populate("cart.products.product");

        if (!cart) {
          throw new ApolloError("Failed to clear cart", "CLEAR_CART_ERROR");
        }

        return cart.cart;
      } catch (error) {
        throw new ApolloError("Failed to clear cart", "CLEAR_CART_ERROR");
      }
    },
  },
};

export default resolvers;
