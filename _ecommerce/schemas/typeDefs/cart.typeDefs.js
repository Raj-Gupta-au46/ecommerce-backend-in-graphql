import gql from 'graphql-tag'

const typeDefs = gql`
type Cart {
  _id:ID
  items:[CartItem]
  Product:[Product]
  User:User
  
}
 
`;

export default typeDefs;