import userTypeDefs from "./typeDefs/user.typeDefs.js";
import userSchema from "./user.schema.js";
import productTypeDefs from "./typeDefs/product.typeDefs.js";
import productSchema from "./product.schema.js";
import categorySchema from "./category.schema.js";
import categoryTypeDefs from "./typeDefs/category.typeDefs.js"; 
import cartSchema from "./cart.schema.js";
import cartTypeDefs from "./typeDefs/cart.typeDefs.js";
import orderSchema from "./order.schema.js";
import orderTypeDefs from "./typeDefs/order.typeDefs.js";


export default [ userSchema,userTypeDefs , productSchema,productTypeDefs , categorySchema,categoryTypeDefs , cartSchema,cartTypeDefs , orderTypeDefs,orderSchema ]