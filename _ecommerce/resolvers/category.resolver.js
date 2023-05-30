import Category from "../models/category.model.js";
import mongoose from "mongoose";

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
    getAllCategory: () => {
      return Category.find();
    },
  },
  Mutation: {
    createCategory: async (parent, { name, field }) => {
      const newCategory = new Category({
        id: generateCategoryId(),
        name: name,
        field: field,
      });

      const res = await newCategory.save();
      return res;
    },
    updateCategory: (parent, { id, name, field }) => {
      const categoryIndex = Category.findIndex(
        (category) => category.id === id
      );

      if (categoryIndex === -1) {
        throw new Error(`Category with ID ${id} not found`);
      }

      Category[categoryIndex].name = name || Category[categoryIndex].name;
      Category[categoryIndex].field = field || Category[categoryIndex].field;

      return Category[categoryIndex];
    },

    deleteCategory: async (parent, { id }, context) => {
      // Implement logic to delete a category
      const category = await Category.findByIdAndRemove(id);

      if (!category) {
        throw new Error("Category not found");
      }

      // Remove the category from associated products
      await Product.updateMany(
        { categories: id },
        { $pull: { categories: id } }
      );

      return id;
    },
  },
};

export default categoryResolver;
