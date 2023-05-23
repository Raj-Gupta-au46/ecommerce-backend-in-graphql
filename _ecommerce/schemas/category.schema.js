import gql from 'graphql-tag';

const categorySchema = gql `
type Ctaegory {
    name:String!
    field:String!
}

type Query {
    getCategory(id:ID!):Category
    getAllCategory:[Category]
}

type Mutation {
    createCategory(
        name:String!
        field:String!
        ):Category
    updateCategory(
        id:ID!
        name:String
        field:String
    ):Category
    deleteCategory(
        id:ID!
    ):Category

}

`

export default categorySchema