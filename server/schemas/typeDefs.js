const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    userLibrary: String!
    email: String
    password: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users : [User]
}

type Mutation {
    addUser(userLibrary: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;