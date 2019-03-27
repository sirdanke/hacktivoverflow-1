# hacktivoverflow


List of routes:

| Route                 | HTTP              | Header(s)                     |Body                       | Description

|---------------        |:------            |:---------                     |:-------                   |:-----------

|/users                 |POST               | none                          | name : string (Required), email:String (Required),password:String (Required) | create new users

|/users/tag             |GET                | required                      | none                      | get user watched tags list

|/users/login           |POST               | none                          | email:String (Required), password: string (Required) | endpoint for user login

|/users/updateTag      |PATCH               |required                       | tags : Object(required)   | endpoint for update user's watched tags

|/postings              |GET                | none                          | none                      | get all posting data

|/postings              |POST               | required                      | title :string (required), description :string (Required), tags:Object (Required) | post new posting - user only

|/postings/:id          |PATCH              | required                      | user : userId (required) | addvote to posting user only

|/postings/:id          |PUT                | required                      | data to update            | edit posting - user only

|/postings/:id          |DELETE             | required                      | none                      | delete posting - user only

|/answers               |POST               | required                      | description : String (required) | create answer - user only

|/answers/:id           |PATCH              | required                      | user : userId (required)  | addvote to answer user only

|/answers/:id           |PUT                | required                      | data to update            | update answer - user only

Usage
Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install 

$ npm start 

$ npm run dev