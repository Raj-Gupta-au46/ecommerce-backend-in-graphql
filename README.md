# HI EVERYONE !!!!-----------

...BASICALLY THIS PROJECT CONTAINS THE BACKEND CODE OF ECOMMERCE WEBSITE IN GRAPHQL BY THE HELP OF MANY LIBRARIES LIKE APOLLO SERVER , AWS , JWT ETC ......

1)- SO THE FIRST THING YOU NEED TO DO IN THIS PROJECT IS TO CREATE YOUR ACCOUNT FOR WHICH U NEED TO FOLLOW GIVEN EXAMPLE AND PROVIDE YOUR DATA OR CREDENTIALS

### CREATING USER -

```
mutation CreateUser($input: SignupInput) {
signup(input: $input) {
userJwtToken {
token
}
updatedAt
lname
fname
email
\_id
}
}
```

```json -
{
  "input": {
    "password": "",
    "lname": "",
    "fname": "",
    "email": ""
  }
}
```

2)- IF YOU ALLREADY CREATED YOUR ACCOUNT THEN YOU JUST NEED TO FOLLOW THE LOGIN API

### LOGIN USER -

```
mutation Login($input: LoginInput) {
login(input: $input) {
userJwtToken {
token
}
lname
fname
email
\_id
createdAt
}
}
```

```json -
{
  "input": {
    "password": "",
    "email": ""
  }
}
```

3)-Create product

### Create Product

```
mutation CreateProduct($name: String!, $description: String!, $price: Int!) {
  createProduct(name: $name, description: $description, price: $price) {
    price
    name
    id
    description
  }
}

```

```json-
{  "name": "",
  "description": "",
  "price":
}

```

4)- Create Review of the product

### Reaview Creation

```
mutation AddReview($input: AddReviewInput!) {
  addReview(input: $input) {
    title
    rating
    createdAt
    comment
    id
  }
}
```

```json-
{
  "input": {
    "title": "",
    "rating": ,
    "productId":"" ,
    "comment": ""
  }
}
```

5)-Create Category for the products

### Create Category

```
mutation CreateCategory($name: String!, $input: ProductsFilterInput) {
  createCategory(name: $name) {
    name
    id
    products(input: $input) {
      name
    }
  }
}
```

```json-
{
  "name": "",
  "input": {
    "id": ""
  }
}
```

6)-Create Order for the present product

### Create Order

```
mutation CreateOrder($input: createOrderInput) {
  createOrder(input: $input) {
    totalAmount
    orderNumber
    id
    customer {

      email
    }
    createAt
  }
}
```

```json-
{
  "input": {
    "totalAmount": ,
    "orderNumber": "",
    "customer": ""
  }
}

```
