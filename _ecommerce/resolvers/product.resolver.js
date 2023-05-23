// import ProductModel from "../models/product.model";
// import { uploadFile } from '../AWS/aws.js'

// import throwCustomError , {
//     ErrorTypes,
// } from '../helpers/error-handler.helper'


// const  productResolver = {
//     Query : {
//         getProduct: async (parents, {id}) =>{
//             const getProduct = await ProductModel.findById(id);
//             if(!getProduct){
//                 throwCustomError(`Product with id ${id} does not exist`,
//                 ErrorTypes.NOT_FOUND
//                 )
//             }
//             // getAllProductModel: () =>{
//             //     return ProductModel
//             return {
//                 id:getProduct._id,
//                 ...getProduct._docs,
//             }
//             },
//             async getAllProduct(parent,args,contextValue) {
//                 const price = args.price;
//                 const allProduct = await ProductModel.find()
//                 .sort({createdAt:-1})
//                 .limit(price);
//                 return allProduct
//             },
//         },

//         Mutation :{
//             createProduct: async (parents,{name,description,price,category,productImage }) => {
//                 const id = Math.random().toString(36).substr(2, 9);
//              const CreatedProduct =  {
//                 _id,
//                 name,
//                 description,
//                 price,
//                 category,
//                 productImage,

//              }
//              ProductModel.push(CreatedProduct)
//              return CreatedProduct
//             },

//             updateProduct: async (parents,{id,name,description,price,category,productImage }) => {
//                 const productIndex = ProductModel.findIndex((product) => product.id === id) ;
//                 if(productIndex < 0){
//                     ProductModel[productIndex].name = name || ProductModel[productIndex].name;
//                     ProductModel[productIndex].description = description || ProductModel[productIndex].description;
//                     ProductModel[productIndex].price = price || ProductModel[productIndex].price;
//                     ProductModel[productIndex].category = category || ProductModel[productIndex].category;
//                     ProductModel[productIndex].productImage = productImage || ProductModel[productIndex].productImage;
                    
//                     // Return the updated product
//                     return ProductModel[productIndex];  
//         } 

//    return null;
//     },
//     deleteProduct: (parent, { id }) => {
//       // Find the product index by ID in the ProductModel array or database
//       const productIndex = ProductModel.findIndex((product) => product.id === id);
      
//       // If the product is found, remove it from the ProductModel array or database
//       if (productIndex !== -1) {
//         const deletedProduct = ProductModel.splice(productIndex, 1)[0];
        
//         // Return the deleted product
//         return deletedProduct;
//       }
      
//       // If the product is not found, return null or throw an error
//       return null;
//     },
//   },
// };


// const productResolver = {
//     Query: {
//       getProduct: async (parents, { id }) => {
//         const getProduct = await ProductModel.findById(id);
//         if (!getProduct) {
//           throwCustomError(`Product with id ${id} does not exist`, ErrorTypes.NOT_FOUND);
//         }
//         return {
//           id: getProduct._id,
//           ...getProduct._doc,
//         };
//       },
//       getAllProduct: async (parent, args, contextValue) => {
//         const price = args.price;
//         const allProduct = await ProductModel.find()
//           .sort({ createdAt: -1 })
//           .limit(price);
//         return allProduct;
//       },
//     },
//     Mutation: {
//       createProduct: async (parents, { name, description, price, category, productImage }) => {
//         const createdProduct = await ProductModel.create({
//           name,
//           description,
//           price,
//           category,
//           productImage,
//         });
//         return createdProduct;
//       },
//       updateProduct: async (parents, { id, name, description, price, category, productImage }) => {
//         const updatedProduct = await ProductModel.findByIdAndUpdate(
//           id,
//           {
//             name,
//             description,
//             price,
//             category,
//             productImage,
//           },
//           { new: true }
//         );
//         return updatedProduct;
//       },
//       deleteProduct: async (parent, { id }) => {
//         const deletedProduct = await ProductModel.findByIdAndDelete(id);
//         return deletedProduct;
//       },
//     },
//   };
  
//   export default productResolver;



// import products from "../models/product.model.js";
// import { uploadFile } from '../AWS/aws.js'


// function generateUserId() {
//   // Generate a unique user ID
//   const Id = Math.random().toString(36).substring(2, 10); // Generate a random string

//   // You can add additional logic here to ensure the generated ID is unique,
//   // such as checking if it already exists in your user database or using a UUID library.

//   return Id;
// }
  

// const productResolvers = {
//     Query: {
//       getProduct: (parent, { id }) => {
//         // Find a product by ID in the products array or database
//         const product = products.find((product) => product.id === id);
        
//         if (!product) {
//           throw new Error(`Product with ID ${id} not found.`);
//         }
        
//         return product;
//       },
//       getAllProducts: () => {
//         // Return all products from the products array or database
//         return products;
//       },
//     },
//     Mutation: {

//       createProduct: async (parent, { name, description, price, category, productImage }) => {
//         let productImageUrl;
    
//         if (productImage) {
//           const uploadedImage = await uploadFile(productImage);
//           productImageUrl = uploadedImage;
//         }
    
//         const newProduct = new products{
//           id: generateUserId(), 
//           name: name,
//           description:description,
//           price:price,
//           category:category,
//           productImage: productImageUrl,
//           createdAt:new Date().toISOString()
//         });
//         const res = await newProduct.save();
//         // console.log(res)    
//         // products.push(newProduct);
//         // console.log(newProduct)
//         return res
    
//       },
    
//       updateProduct: (parent, { id, name, description, price, category, productImage }) => {

//         // const ProductUpdate = products.findByIdAndUpdate(id,{
//         //   name, description, price, category, productImage
//         // },(err,result)=>{

//         // })
//         // Find the product by ID in the products array or database
//         const productIndex = products.findIndex((product) => product.id === id);
        
//         if (productIndex === -1) {
//           throw new Error(`Product with ID ${id} not found.`);
//         }
        
//         // Update the product properties
//         products[productIndex].name = name || products[productIndex].name;
//         products[productIndex].description = description || products[productIndex].description;
//         products[productIndex].price = price || products[productIndex].price;
//         products[productIndex].category = category || products[productIndex].category;
//         products[productIndex].productImage = productImage || products[productIndex].productImage;
          
//         // Return the updated product
//         return products[productIndex];
//       },
//       deleteProduct: (parent, { id }) => {
//         // Find the product index by ID in the products array or database
//         const productIndex = products.findIndex((product) => product.id === id);
        
//         if (productIndex === -1) {
//           throw new Error(`Product with ID ${id} not found.`);
//         }
        
//         // Remove the product from the products array or database
//         const deletedProduct = products.splice(productIndex, 1)[0];
          
//         // Return the deleted product
//         return deletedProduct;
//       },
//     },
//   };
  
//   export default productResolvers;


// import products from "../models/product.model.js";
// import { uploadFile } from '../AWS/aws.js';

// function generateUserId() {
//   // Generate a unique user ID
//   const Id = Math.random().toString(36).substring(2, 10); // Generate a random string

//   // You can add additional logic here to ensure the generated ID is unique,
//   // such as checking if it already exists in your user database or using a UUID library.

//   return Id;
// }

// const productResolvers = {
//   Query: {
//     getProduct: (parent, { id }) => {
//       // Find a product by ID in the products array or database
//       const product = products.find((product) => product.id === id);

//       if (!product) {
//         throw new Error(`Product with ID ${id} not found.`);
//       }

//       return product;
//     },
//     getAllProducts: () => {
//       // Return all products from the products array or database
//       return products;
//     },
//   },
//   Mutation: {
//     createProduct: async (parent, { name, description, price, category, productImage }) => {
//       let productImageUrl;

//       if (productImage) {
//         const uploadedImage = await uploadFile(productImage);
//         productImageUrl = uploadedImage;
//       }

//       const newProduct = new products({
//         id: generateUserId(),
//         name: name,
//         description: description,
//         price: price,
//         category: category,
//         productImage: productImageUrl,
//         createdAt: new Date().toISOString()
//       });

//       const res = await newProduct.save();
//       console.log(res)
//       return res;
//     },
//     updateProduct: (parent, { id, name, description, price, category, productImage }) => {
//       const productIndex = products.findIndex((product) => product.id === id);

//       if (productIndex === -1) {
//         throw new Error(`Product with ID ${id} not found.`);
//       }

//       products[productIndex].name = name || products[productIndex].name;
//       products[productIndex].description = description || products[productIndex].description;
//       products[productIndex].price = price || products[productIndex].price;
//       products[productIndex].category = category || products[productIndex].category;
//       products[productIndex].productImage = productImage || products[productIndex].productImage;

//       return products[productIndex];
//     },
//     deleteProduct: (parent, { id }) => {
//       const productIndex = products.findIndex((product) => product.id === id);

//       if (productIndex === -1) {
//         throw new Error(`Product with ID ${id} not found.`);
//       }

//       const deletedProduct = products.splice(productIndex, 1)[0];

//       return deletedProduct;
//     },
//   },
// };

// export default productResolvers;


import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import { uploadFile } from '../AWS/aws.js';

const productResolvers = {
  Query: {
    getProduct: async (parent, { id }) => {
      try {
        const product = await Product.findById(id).populate('category');
        if (!product) {
          throw new Error(`Product with ID ${id} not found.`);
        }
        return product;
      } catch (error) {
        throw new Error(error);
      }
    },
    getAllProducts: async () => {
      try {
        const products = await Product.find().populate('category');
        return products;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createProduct: async (parent, { name, description, price, categoryId, productImage }) => {
      try {
        let productImageUrl = '';
        if (productImage) {
          const uploadedImage = await uploadFile(productImage);
          productImageUrl = uploadedImage;
        }
        
        // const category = await Category.findById(categoryId);
        // if (!category) {
        //   throw new Error(`Category with ID ${categoryId} not found.`);
        // }

        const newProduct = new Product({
          name:name,
          description:description,
          price:price,
          // category: Category._id,
          productImage: productImageUrl,
          createdAt: new Date().toISOString(),
        });

        const savedProduct = await newProduct.save();
        // await savedProduct.populate('category').execPopulate();
        // console.log(savedProduct)
        return savedProduct;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateProduct: async (parent, { id, name, description, price, categoryId, productImage }) => {
      try {
        const product = await Product.findById(id);
        if (!product) {
          throw new Error(`Product with ID ${id} not found.`);
        }

        if (categoryId) {

          const category = await Category.findById(categoryId);
          if (!category) {
            throw new Error(`Category with ID ${categoryId} not found.`);
          }
          product.category = category._id;
        }

        if (name) {
          product.name = name;
        }

        if (description) {
          product.description = description;
        }

        if (price) {
          product.price = price;
        }

        if (productImage) {
          const uploadedImage = await uploadFile(productImage);
          product.productImage = uploadedImage;
        }

        const updatedProduct = await product.save();
        await updatedProduct.populate('category').execPopulate();
        return updatedProduct;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteProduct: async (parent, { id }) => {
      try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          throw new Error(`Product with ID ${id} not found.`);
        }
        return product;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default productResolvers;