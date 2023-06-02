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
