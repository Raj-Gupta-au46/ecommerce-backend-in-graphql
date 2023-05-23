import gql from 'graphql-tag'

const categoryTypeDefs = gql `
type Category{
    _id: ID!
    name: String!
    field:String
}
`

export default categoryTypeDefs