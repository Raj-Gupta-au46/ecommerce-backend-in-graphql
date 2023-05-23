import gql from 'graphql-tag'

const cartTypeDefs = gql`
type Cart {
    _id:ID
    products:Product
    User:User

}
`

export default cartTypeDefs