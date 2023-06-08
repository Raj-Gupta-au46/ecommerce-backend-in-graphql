import userResolver from "./user.resolver.js";
import productResolvers from "./product.resolver.js";
import categoryResolver from "./category.resolver.js";
import cartResolver from "./cart.resolver.js";
import orderResolver from "./order.resolver.js";
import reviewResolver from "./review.resolver.js";
import adminResolver from "./admin.resolver.js";
import orderItemResolvers from "./orderItem.resolver.js";
import paymentResolvers from "./payment.resolver.js";

export default [
  userResolver,
  productResolvers,
  categoryResolver,
  cartResolver,
  orderResolver,
  reviewResolver,
  adminResolver,
  orderItemResolvers,
  paymentResolvers,
];
