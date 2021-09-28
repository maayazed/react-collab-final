const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    email: String
    password: String
}

type Library {
    _id: ID
    location: String
    currentBooks: [Book]
}

type Book {
    _id: ID
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    user(userId: ID!): User
    users : [User]
    library(libraryId: ID!): Library
    libraries: [Library]
}

type Mutation {
    addUser(email: String!, password:String!): Auth
    addBook(bookId: String!, libraryId: String!, title: String!, authors: [String]!, description: String!, image: String!, link: String!): Library
    login(email: String!, password: String!): Auth
    removeBook(libraryId: ID!, bookId: String!): Library
    addLibrary(location: String!, currentBooks:[String]!):Library
}

`;

module.exports = typeDefs;

//WIP
