const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const db = require('./config/connection');
// schemas (typeDefs, resolvers)
// authentication middleware

const app = express();
const PORT = process.env.PORT || 3001;

// make server with apollo
// apply server middleware

// using MERN not Restful, so extended: false, not using express routing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    // console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});