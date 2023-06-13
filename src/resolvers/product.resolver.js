import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { uploadFile } from "../AWS/aws.js";
import Admin from "../models/admin.model.js";

const productResolvers = {
  Query: {
    getProduct: async (parent, { id }) => {
      try {
        const product = await Product.findById(id).populate("category");
        if (!product) {
          throw new Error(`Product with ID ${id} not found.`);
        }
        return product;
      } catch (error) {
        throw new Error(error);
      }
    },
    getAllProducts: async (_, { page, limit }) => {
      try {
        const skip = (page - 1) * limit;
        const totalCount = await Product.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        const products = await Product.find().skip(skip).limit(limit);

        return {
          products,
          totalPages,
          currentPage: page,
          totalCount,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createProduct: async (
      parent,
      { name, description, price, categoryId, productImage },
      context
    ) => {
      try {
        const { user } = context; // Assuming the authenticated user is available in the context
        console.log("hit");
        console.log(user);
        console.log("end");
        console.log(user.adminId);

        const adminDetails = await Admin.findById(user.adminId);
        console.log("admin");
        console.log(adminDetails);
        console.log("end");
        console.log(adminDetails._id + "adminid");
        console.log(user.adminId + "user id");
        if (adminDetails._id && user.adminId) {
          let productImageUrl = "";
          if (productImage) {
            const uploadedImage = await uploadFile(productImage);
            productImageUrl = uploadedImage;
          }

          const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            categoryId: categoryId,
            productImage: productImageUrl,
            createdAt: new Date().toISOString(),
          });

          const savedProduct = await newProduct.save();
          // await savedProduct.populate('category').execPopulate();
          // console.log(savedProduct)
          return savedProduct;
        } else {
          throw new Error("Only admin can create a product");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    updateProduct: async (
      parent,
      { id, name, description, price, categoryId, productImage }
    ) => {
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
        await updatedProduct.populate("category").execPopulate();
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
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default productResolvers;
