import Category from "../models/category.model.js";
import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import { GraphQLError } from "graphql";

function generateCategoryId() {
  // Generate a unique category ID
  const Id = Math.random().toString(36).substring(2, 10); // Generate a random string

  return Id;
}

const categoryResolver = {
  Query: {
    getCategory: async (parent, { id }) => {
      const objectId = mongoose.Types.ObjectId.createFromHexString(id);
      const category = await Category.findById(objectId);

      return category;
    },
    getAllCategory: async () => {
      try {
        const categories = await Category.find().populate("products");
        return categories;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createCategory: async (_, args, context) => {
      // console.log(args);
      const { user } = context;
      try {
        const adminDetails = await Admin.findById(user.adminId);

        if (adminDetails._id && user.adminId) {
          const { name, description } = args.input;
          const categoryExit = await Category.findOne({ name });
          if (categoryExit) {
            throw new GraphQLError("Category name is already exist", {
              extensions: {
                code: "CATEGORY_NAME_ALREADY_EXIST",
              },
            });
          } else {
            const newCategory = new Category({
              name,
              description,
            });
            const res = await newCategory.save();
            return {
              id: res.id,
              ...res._doc,
            };
          }
        } else {
          throw new GraphQLError("User is not Authenticated/Not found", {
            extensions: {
              code: "User_NOT_AUTHENTICATED",
            },
          });
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    updateCategory: (parent, { id, name }) => {
      const categoryIndex = Category.findIndex(
        (category) => category.id === id
      );

      if (categoryIndex === -1) {
        throw new Error(`Category with ID ${id} not found`);
      }

      Category[categoryIndex].name = name || Category[categoryIndex].name;

      return Category[categoryIndex];
    },

    deleteCategory: async (parent, { id }, context) => {
      // Implement logic to delete a category
      try {
        const { user } = context;
        const adminDetails = await Admin.findById(user.adminId);
        if (adminDetails._id && user.adminId) {
          const category = await Category.findByIdAndDelete(id);

          if (!category) {
            throw new Error("Category not found eith the ${id");
          }

          // Remove the category from associated products

          return true;
        } else {
          throw new Error("Only admin can delete the category");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default categoryResolver;
