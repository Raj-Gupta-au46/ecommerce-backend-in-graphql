HI EVERYONE !!!!-----------

BASICALLY THIS PROJECT CONTAINS THE BACKEND CODE OF ECOMMERCE WEBSITE IN GRAPHQL BY THE HELP OF MANY LIBRARIES LIKE APOLLO SERVER , AWS , JWT ETC ......

SO THE FIRST THING YOU NEED TO DO IN THIS PROJECT IS TO CREATE YOUR ACCOUNT FOR WHICH U NEED TO FOLLOW GIVEN EXAMPLE AND PROVIDE YOUR DATA OR CREDENTIALS

CREATING USER -

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

{
"input": {
"password": "",
"lname": "",
"fname": "",
"email": ""
}
}
