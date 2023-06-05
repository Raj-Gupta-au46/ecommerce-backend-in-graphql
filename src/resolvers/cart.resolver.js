// import CartModel from "../models/cart.model.js";
// import UserModel from "../models/user.models.js";
// import Product from "../models/product.model.js";
// import { ApolloError } from "apollo-server-errors";
// import { GraphQLError } from "graphql";

// const cartResolvers = {
//   Query: {
//     getCart:  async () => {
//       try {
//         const cartItems = await Cart.find()
//           .populate("userId")
//           .populate("item.productId");
//         // console.log(cartItems);
//         if (!cartItems) {
//           throw new GraphQLError("Cart items is not found", {
//             extensions: {
//               code: "CART_ITEMS_NOT_FOUND",
//             },
//           });
//         } else {
//           return cartItems;
//         }
//       } catch (error) {
//         throw new GraphQLError(`Error is found ${error}`, {
//           extensions: {
//             code: `ERROR_FOUND_${error}`,
//           },
//         });
//       }
//     },
//   Mutation: {
//     addProductToCart: async (_, { userId, productId, quantity,price }) => {
//       try {
//         const existingCart = await CartModel.findOne({ user: userId });

//         if (existingCart) {
//           throw new Error("Cart already exists for this user");
//         }
//       const totalValue = quantity*price
//         const newCart = new CartModel({
//           user: userId,
//           products: [
//             {
//               product: productId,
//               quantity: quantity,
//             },
//           ],
//           total:totalValue
//         });

//         const createdCart = await newCart.save();

//         return createdCart;
//       } catch (error) {
//         throw new ApolloError(
//           "Failed to add product to cart",
//           "ADD_PRODUCT_TO_CART_ERROR"
//         );
//       }
//     },

//     updateCartItemQuantity: async (_, { userId, cartItemId, quantity }) => {
//       try {
//         const user = await UserModel.findByIdAndUpdate(
//           userId,
//           { $set: { "cart.products.$[elem].quantity": quantity } },
//           { new: true, arrayFilters: [{ "elem._id": cartItemId }] }
//         );

//         if (!user) {
//           throw new Error("User not found");
//         }

//         return user.cart;
//       } catch (error) {
//         throw new Error("Failed to update cart item quantity");
//       }
//     },
//     removeProductFromCart: async (_, { cartItemId }) => {
//       try {
//         console.log(cartItemId);
//         const user = await UserModel.findOneAndUpdate(
//           { "cart.products._id": cartItemId },
//           { $pull: { "cart.products": { _id: cartItemId } } },
//           { new: true }
//         ).populate("cart.products.product");
//         console.log(user);

//         if (!user) {
//           throw new ApolloError(
//             "Failed to remove product from cart",
//             "REMOVE_PRODUCT_FROM_CART_ERROR"
//           );
//         }

//         return user.cart;
//       } catch (error) {
//         throw new ApolloError(
//           "Failed to remove product from cart",
//           "REMOVE_PRODUCT_FROM_CART_ERROR"
//         );
//       }
//     },
//     clearCart: async (_, { cartId }) => {
//       try {
//         const cart = await CartModel.findByIdAndDelete(cartId);
//         if (!cart) {
//           throw new Error(`Cart with ID ${cartId} not found.`);
//         }
//         return true;
//       } catch (error) {
//         throw new ApolloError(
//           "Failed to clear cart please check the provided details",
//           "CLEAR_CART_ERROR"
//         );
//       }
//     },
//   },
// };

// export default cartResolvers;

import CartModel from "../models/cart.model.js";
import UserModel from "../models/user.models.js";
import Product from "../models/product.model.js";
import { ApolloError } from "apollo-server-errors";
import { GraphQLError } from "graphql";

const cartResolvers = {
  Query: {
    getCart: async () => {
      try {
        const cartItems = await CartModel.find()
          .populate("userId")
          .populate("item.productId");

        if (!cartItems) {
          throw new GraphQLError("Cart items not found", {
            extensions: {
              code: "CART_ITEMS_NOT_FOUND",
            },
          });
        } else {
          return cartItems;
        }
      } catch (error) {
        throw new GraphQLError(`Error found: ${error}`, {
          extensions: {
            code: `ERROR_FOUND_${error}`,
          },
        });
      }
    },
  },
  Mutation: {
    addProductToCart: async (_, { userId, productId, quantity, price }) => {
      try {
        const existingCart = await CartModel.findOne({ user: userId });

        if (existingCart) {
          throw new Error("Cart already exists for this user");
        }

        const totalValue = quantity * price;
        const product = await Product.findById(productId);
        if (!product) {
          throw new GraphQLError("Product not found", {
            extensions: {
              code: "PRODUCT_NOT_FOUND",
            },
          });
        }
        const newCart = new CartModel({
          userId,
          item: [{ productId, quantity, price }],
          total: totalPrice,
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

    clearCart: async (_, { cartId }) => {
      try {
        const cart = await CartModel.findByIdAndDelete(cartId);
        if (!cart) {
          throw new Error(`Cart with ID ${cartId} not found.`);
        }
        return true;
      } catch (error) {
        throw new ApolloError(
          "Failed to clear cart. Please check the provided details.",
          "CLEAR_CART_ERROR"
        );
      }
    },
  },
};

export default cartResolvers;
