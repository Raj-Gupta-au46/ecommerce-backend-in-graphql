import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { uploadFile } from "../AWS/aws.js";

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
    getAllProducts: async () => {
      try {
        const products = await Product.find().populate("category");
        return products;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createProduct: async (
      parent,
      { name, description, price, categoryId, productImage }
    ) => {
      try {
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
