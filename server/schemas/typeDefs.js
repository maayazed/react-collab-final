const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    email: String
}

type Book {
    _id: ID
    title: String
    authors: Array
    description: String
    image: String
    link: String
}

type Library {
    _id: ID
    location: String
    currentBooks: Array
}

type Auth {
    token: ID
    user: User
}

type Query {
    users : [User]
    books : [Book]
    libraries: [Library]
    book(id: Int!): Book
    library(id: Int!): Library
}

type Mutation {
    addUser(email: String!, password:String!): Auth
    addBook(title: String!, authors: Array!, description: String!, image: String!, link: String!): Library
    login(email: String!, password: String!): Auth
    removeBook(libraryId: ID!, bookId: ID!): Library
}

`

module.exports = typeDefs;

//WIP
