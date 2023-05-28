
// import Category from '../models/category.model.js'

// function generateCategoryId() {
//   // Generate a unique user ID
//   const Id = Math.random().toString(36).substring(2, 10); // Generate a random string

//   // You can add additional logic here to ensure the generated ID is unique,
//   // such as checking if it already exists in your user database or using a UUID library.

//   return Id;
// }


// const categoryResolver ={
//     Query: {
//         getCategory: (parents, {id}) => {
//             const category = Category.find((category) =>{category.id === id});

//             if(!product){
//                 throw new Error('Category not found')
//             }
//                 return category
//         },
//         getAllCategory: () => {
//             return Category
//         },
//     },

//     Mutation : {
//         createCategory : async (parents, {name,field}) => {
//             const newCategory = {
//                 id: generateCategoryId(),
//                 name:name,
//                 field:field    
//             };
//             const res = await newCategory.save();
//             Category.push(newCategory)
//             return res
//         },
//         updateCategory: (parents,{name,field}) => {

//             const categoryIndex = Category.findIndex((category)=>category.id === id )
//                 if(categoryIndex === -1){
//                     throw new Error(`Category with ID ${id} not found`)
//                 }
//                 Category[categoryIndex].name = name || Category[categoryIndex].name
//                 Category[categoryIndex].field = field || Category[categoryIndex].field
                
//                 return Category[categoryIndex]
//         },
//         deleteCategory: (parents,{id}) => {
//             const categoryIndex = Category.findIndex((category) => category.id ===id)
//             if(categoryIndex === -1){
//                 throw new Error(`Product with ID ${id} not found.`);
//             }
//         const deleteCategory = Category.splice(categoryIndex,1)[0];
//         return deleteCategory
//     },
// },
// }

// export default categoryResolver 


import Category from '../models/category.model.js';
import mongoose from 'mongoose';

function generateCategoryId() {
  // Generate a unique category ID
  const Id = Math.random().toString(36).substring(2, 10); // Generate a random string

  // You can add additional logic here to ensure the generated ID is unique,
  // such as checking if it already exists in your category database or using a UUID library.

  return Id;
}

const categoryResolver = {
  Query: {
    getCategory: async (parent, { id }) => {
      const objectId = mongoose.Types.ObjectId.createFromHexString(id);
   const category = await Category.findById(objectId)
        
    
      return category

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
      const categoryIndex = Category.findIndex((category) => category.id === id);

      if (categoryIndex === -1) {
        throw new Error(`Category with ID ${id} not found`);
      }

      Category[categoryIndex].name = name || Category[categoryIndex].name;
      Category[categoryIndex].field = field || Category[categoryIndex].field;

      return Category[categoryIndex];
    },
    deleteCategory: (parent, { id }) => {
      const categoryIndex = Category.findIndex((category) => category.id === id);

      if (categoryIndex === -1) {
        throw new Error(`Category with ID ${id} not found.`);
      }

      const deletedCategory = Category.splice(categoryIndex, 1)[0];
      return deletedCategory;
    },
  },
};

export default categoryResolver;

