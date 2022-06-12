# Twitter Clone Backend
Twitter Clone Backend using Node.js, Express.js, MongoDB, Typescript with architecture layers - Router, Controller and Model

<p align="center">
    <img alt="Twitter Clone Backend" src="https://raw.githubusercontent.com/pallavi-shekhar/twitter-clone-backend/main/assets/twitter-clone-backend.png" />
</p>

## Why this project?
I am Pallavi, and I have created this project for my learning purpose. I aimed to learn and make a highly modular backend project with a scalable architecture. So, I decided to build this Twitter Clone Backend. I took the AfterAcademy project as a reference to create this project.

## Highlights of the project
* Node.js
* Express
* MongoDB
* Mongoose
* Typescript
* Async/await for the promises
* Architecture Layers: Router, Controller and Model
* Error handling
* JWT Authentication
* Unit Test
* Docker

## Architecture Layers: Router, Controller and Model
<p align="center">
    <img alt="Architecture Layer" src="https://raw.githubusercontent.com/pallavi-shekhar/twitter-clone-backend/main/assets/architecture-layer.png" />
</p>

## Twitter Clone Features
* Login/SignUp using email and password
* Tweet Create, Fetach, Like
* Timeline
* User Profile
* Follow/Unfollow a user

## Public API Flow of Twitter Clone Backend
<p align="center">
     <img alt="Public Api Flow" src="https://raw.githubusercontent.com/pallavi-shekhar/twitter-clone-backend/main/assets/public-api-flow.png" />
</p>

## Private API Flow of Twitter Clone Backend
<p align="center">
     <img alt="Private Api Flow" src="https://raw.githubusercontent.com/pallavi-shekhar/twitter-clone-backend/main/assets/authenticated-private-api-flow.png" />
</p>

## API documentation of Twitter Backend Clone
<a href="https://documenter.getpostman.com/view/6307230/Uz5Nisha" target="_blank">
    <img alt="button-view-api-docs" src="https://raw.githubusercontent.com/pallavi-shekhar/twitter-clone-backend/main/assets/button-view-api-docs.png" width="200" height="60"/>
</a>

## Packages used in this project
* Express: It is a Node.js web application framework that provides a robust set of features to develop web and mobile appliactions. It also allows to setup middlewares to respond to HTTP requests.
* JWT: JSON Web Token is an open standard used to securely transfer information between two parties - client and server. Each JWT contains encoded JSON objects, including a set of claims. JWTs are signed using a cryptographic algorithm to ensure that claims cannot be altered after the token is issued.
* JOI: Joi is an object schema description language and validator for JavaScript objects. Joi allows you to create blueprints or schemas for JavaScript objects to ensure validation of key information. It also allows you to create your validations with a simple and clear object syntax.
* Jest: Jest is a Javascript testing framework. It is fast and safe, gives code coverage and also providides easy mocking abilities.
* Supertest: SuperTest is a Node.js library that helps to test APIs. It extends another library called superagent, a JavaScript HTTP client for Node.js and the browser.SuperTest can be used as a standalone library or with JavaScript testing frameworks like Mocha or Jest.
* Many more packages

## How to build and run this project

 * Build and run Twitter Clone Backend without Docker
    * Clone this repo.
    * Make a copy of **.env.example** file to **.env**.
    * Make a copy of **keys/private.pem.example** file to **keys/private.pem**.
    * Make a copy of **keys/public.pem.example** file to **keys/public.pem**.
    * Make a copy of **tests/.env.test.example** file to **tests/.env.test**.
    * Install MongoDB on your local.
    * Install node.js and npm on your local machine.
    * From the root of the project execute in terminal `npm install`.
    * *Use the latest version of node on the local machine if the build fails*.
    * Create users in MongoDB and seed the data taking reference from the **/init-mongo.js**
    * Change the `DB_HOST` to `localhost` in **.env** and **tests/.env.test** files.
    * Execute `npm start` and you will be able to access the API from http://localhost:3000
    * To run the tests execute `npm test`.


* Build and run Twitter Clone Backend using Docker Compose 
    * Clone this repo.
    * Make a copy of **.env.example** file to **.env**.
    * Make a copy of **keys/private.pem.example** file to **keys/private.pem**.
    * Make a copy of **keys/public.pem.example** file to **keys/public.pem**.
    * Make a copy of **tests/.env.test.example** file to **tests/.env.test**.
    * Install Docker and Docker Compose. [Find Instructions Here](https://docs.docker.com/install/).
    * Execute `docker-compose up -d` in terminal from the repo directory.
    * You will be able to access the api from http://localhost:3000
    * *If having any issue* then make sure 3000 port is not occupied else provide a different port in **.env** file.
    * *If having any issue* then make sure 27017 port is not occupied else provide a different port in **.env** file.
    * Run The Tests
      * Install node.js and npm on your local machine.
      * From the root of the project execute in terminal `npm install`.
      * *Use the latest version of node on the local machine if the build fails*.
      * To run the tests execute `npm test`.

  
## This backend project has following folders:
* core: This conatains the classes which is shared across the project like ApiError.ts, ApiResponse.ts.
* database: This contains the models and repositories classes which interact with mongo database.
* middlewares: This consists of middlewares used. Ex - authentication.ts is used for authenticating each private request.
* routes: This consists of various routes of the project. Ex - login.ts, signup.ts.
* controllers: This consists of various controllers, corresponding to routes. Ex - login.controller.ts, tweet.controller.ts.

 ```
├── Dockerfile
├── README.md
├── docker-compose.yml
├── init-mongo.js
├── jest.config.js
├── keys
│   ├── private.pem
│   └── public.pem
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── config.ts
│   ├── controllers
│   │   ├── access
│   │   │   ├── login.controller.ts
│   │   │   ├── signup.controller.ts
│   │   │   └── token.controller.ts
│   │   ├── follow
│   │   │   ├── follow.controller.ts
│   │   │   ├── followers.controller.ts
│   │   │   ├── followings.controller.ts
│   │   │   └── unfollow.controller.ts
│   │   ├── like
│   │   │   └── like.controller.ts
│   │   ├── profile
│   │   │   └── profile.controller.ts
│   │   └── tweet
│   │       ├── feed.controller.ts
│   │       └── tweet.controller.ts
│   ├── core
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── JWT.ts
│   │   └── authUtils.ts
│   ├── database
│   │   ├── index.ts
│   │   ├── model
│   │   │   ├── ApiKey.ts
│   │   │   ├── Follow.ts
│   │   │   ├── Like.ts
│   │   │   ├── Tweet.ts
│   │   │   └── User.ts
│   │   └── repository
│   │       ├── ApiKeyRepo.ts
│   │       ├── FollowRepo.ts
│   │       ├── LikeRepo.ts
│   │       ├── TweetRepo.ts
│   │       └── UserRepo.ts
│   ├── middlewares
│   │   ├── apikey.ts
│   │   ├── asyncHandler.ts
│   │   ├── authentication.ts
│   │   ├── schema.ts
│   │   └── validator.ts
│   ├── routes
│   │   └── v1
│   │       ├── access
│   │       │   ├── login.ts
│   │       │   ├── schema.ts
│   │       │   ├── signup.ts
│   │       │   └── token.ts
│   │       ├── follow
│   │       │   ├── follow.ts
│   │       │   ├── followers.ts
│   │       │   ├── followings.ts
│   │       │   ├── schema.ts
│   │       │   └── unfollow.ts
│   │       ├── index.ts
│   │       ├── like
│   │       │   ├── like.ts
│   │       │   └── schema.ts
│   │       ├── profile
│   │       │   ├── profile.ts
│   │       │   └── schema.ts
│   │       └── tweet
│   │           ├── feed.ts
│   │           ├── schema.ts
│   │           └── tweet.ts
│   ├── server.ts
│   └── types
│       └── app-request.d.ts
├── tests
│   ├── middlewares
│   │   ├── apikey
│   │   │   └── unit.test.ts
│   │   └── authentication
│   │       └── unit.test.ts
│   ├── mock.ts
│   ├── routes
│   │   └── v1
│   │       ├── follow
│   │       │   ├── follow
│   │       │   │   └── unit.test.ts
│   │       │   └── followings
│   │       │       └── unit.test.ts
│   │       ├── like
│   │       │   └── unit.test.ts
│   │       ├── profile
│   │       │   └── unit.test.ts
│   │       └── tweet
│   │           ├── feed
│   │           │   └── unit.test.ts
│   │           └── tweet
│   │               └── unit.test.ts
│   └── setup.ts
└── tsconfig.json

 ```
 
 ## API Call Code Flow

 * Signup
     * `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /database/repository/ApiKeyRepo.ts → /routes/v1/signup.ts → schema.ts → /middlewares/validator.ts → /controllers/aceess/signup.controller.ts → asyncHandler.ts → /database/repository/UserRepo.ts → /database/model/User.ts → /core/ApiResponses.ts`
 * Login
     * `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /database/repository/ApiKeyRepo.ts → /routes/v1/login.ts → schema.ts → /middlewares/validator.ts → /controllers/aceess/login.controller.ts → asyncHandler.ts → /database/repository/UserRepo.ts → /database/model/User.ts → /core/ApiResponses.ts`
  * Post Tweet 
     * `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /database/repository/ApiKeyRepo.ts → /routes/v1/tweet.ts → /middlewares/authentication.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /core/authUtils.ts → /core/JWT.ts → /core/authUtils.ts → /database/repository/UserRepo.ts → /database/model/User.ts → schema.ts → /middlewares/validator.ts → /controllers/tweet/tweet.controller.ts → asyncHandler.ts → database/repository/TweetRepo.ts → /database/model/Tweet.ts  → /core/ApiResponses.ts`
  * Follow
     * `/src → server.ts → app.ts → /routes/v1/index.ts → /auth/apikey.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /database/repository/ApiKeyRepo.ts → /routes/v1/follow.ts → /middlewares/authentication.ts → schema.ts → /middlewares/validator.ts → asyncHandler.ts → /core/authUtils.ts → /core/JWT.ts → /core/authUtils.ts → /database/repository/UserRepo.ts → /database/model/User.ts → schema.ts → /middlewares/validator.ts → /controllers/follow/follow.controller.ts → asyncHandler.ts → database/repository/FollowRepo.ts → /database/model/Follow.ts  → /core/ApiResponses.ts`
 
 ## API request and response
* Signup
    * Method and Headers
    ```
    POST /v1/signup/basic HTTP/1.1
    Host: localhost:3000
    x-api-key: GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
      "username": "Test",
      "email":"test@gmail.com",
      "password":"123456789",
      "firstName":"Test First",
      "lastName":"Test Last",
      "bio": "This is test bio",
      "dateOfBirth": "2017-06-10"
    }
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "Signup Successful",
      "data": {
          "user": {
              "_id": "62a38c440d7dc524cdcd4e73",
              "username": "Test",
              "email": "test@gmail.com"
          },
          "tokens": {
              "accessToken": "<access_token>",
              "refreshToken": "<refresh_token>"
            }
          }
      }
    ```
* Post Tweet
    * Method and Headers
    ```
    POST /v1/tweet HTTP/1.1
    Host: localhost:3000
    x-api-key: GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj
    Content-Type: application/json
    Authorization: Bearer <access_token> 
    ```
    * Request Body
    ```json
    {
	    "content": "Test First Tweet"
    }
    ```
    * Response Body: 200
    ```json
    {
      "statusCode": "10000",
      "message": "Tweet created successfully",
      "data": {
          "_id": "62a391ad0d7dc524cdcd4e79",
          "content": "Test First Tweet",
          "createdBy": "62a38c440d7dc524cdcd4e73",
          "createdAt": "2022-06-10T18:47:09.703Z"
        }
    }
    ```

### License

```
   Copyright (C) 2022 Pallavi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```