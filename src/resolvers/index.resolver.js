import userResolver from "./user.resolver.js";
import productResolvers from "./product.resolver.js";
import categoryResolver from "./category.resolver.js";
import cartResolver from "./cart.resolver.js";
import orderResolver from "./order.resolver.js";
import reviewResolver from "./review.resolver.js";

export default [
  userResolver,
  productResolvers,
  categoryResolver,
  cartResolver,
  orderResolver,
  reviewResolver,
];
