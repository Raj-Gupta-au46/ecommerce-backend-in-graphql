import gql from 'graphql-tag'

const productTypeDefs = gql`
type Product{
    _id:ID
    name: String!
    price:Int!
    description:String
    category:String
    productImage:String
    

}
`

export default productTypeDefs 







