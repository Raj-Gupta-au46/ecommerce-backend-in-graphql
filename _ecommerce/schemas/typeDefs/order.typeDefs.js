 import gql from 'graphql-tag'


 const orderTypeDefs = gql `
 type Order {
   _id: ID!
   user: User!
   items: [OrderItem]
   totalPrice: Int
   totalItems: Int
   totalQuantity: Int
 }
 `

 export default orderTypeDefs 