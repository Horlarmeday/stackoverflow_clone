# Stackoverflow Clone
> This project is a simple implementation of stackoverflow.

This project is structured using the three-layer principle, ie separation of concerns.
Separating concerns is a great way to enforce structure, and it also provides useful qualities when thinking about testing.
The three layer include: Controller layer, Service layer and Data access layer

<img src="https://softwareontheroad.com/static/122dab3154cb7e417bbb210bbce7ca01/8299d/server_layers.jpg" alt="structure">

> Borrowed this image from this <a href="https://softwareontheroad.com">site</a>.

The Controller layer is only in charge of the accepting body from the client and giving appropriate response back.

The Service layer is where the business logic of the project lives, no database query exists here. While,

The Data access layer is charge of reading/writing to the database. 

## Table of Contents

- [Installation](#installation)
- [Structure](#structure)
- [Features](#features)
- [Usage](#usage)
- [Documentation](#documentation)
- [Test](#test)
- [Meta](#meta)


## Installation

- All the `code` required to get started

### Clone

- Clone this repo to your local machine using `https://github.com/Horlarmeday/stackoverflow_clone`

### Setup

> run npm install to download the project dependencies

```shell
$ npm install
```

#### Development setup

In order to be able use the ES6 features like `async/await`, `classes`, `template strings` etc and linting. You need to work in a development mode.
> npm run dev
```sh
npm run dev
```

#### Production setup

For working in production mode, run below command.
> Run `npm run build` to bundle the project and then start server
```sh
npm run start
```

---

## Structure

This project is structured in modules. We have the User module and the Q&A module

### User Module
The User module houses account creation and authentication aspect of the project. The principle of three-layer architecture is used here. The folders in this module include
user controller, user model, repository (Data access layer), user routes, user services and the user validations.

## Q&A Module
The Q&A module houses the everything about questions, and answers. The same principle used in the `User Module` was used here.
The folders are also structured exactly the same.

<img src="https://drive.google.com/file/d/1RMWiGPgSSIJ8hGTqi3iXkghxpnNWLJzX/view?usp=sharing" alt="structure"/>

## Features
The features of this project include the following.

- Register a user
- Login a user
- Authenticated user can create question
- Users can up vote a question
- Users can down vote a question
- User can answer a question 
- User can subscribe to a question
- User get email notification as soon as question is answered
- User can only subscribe once to a question
- Questions, answers and users can be searched and it will return search based on the index score


## Documentation
The API documentation for testing the endpoints is located <a href="https://documenter.getpostman.com/view/9548350/T17GgUCg">here</a>

## Tests
To run the tests

> run npm run test

```shell
$ npm run test
```

## Meta

Mahmud Ajao – [@YourTwitter](https://twitter.com/@MahmudAjao1) – ajaomahmud@gmail.com

[https://github.com/Horlarmeday/stackoverflow_clone](https://github.com/dbader/)
