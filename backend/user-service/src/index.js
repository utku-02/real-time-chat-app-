const express = require('express');
const { ApolloClient, InMemoryCache, gql } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const fetch = require('cross-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql', fetch }),
  cache: new InMemoryCache()
});

app.use(express.json());

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const REGISTER_USER = gql`
    mutation Register($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        id
        email
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation: REGISTER_USER,
      variables: { email, password }
    });
    res.status(201).send(result.data.register);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `;

  try {
    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email, password }
    });
    res.send({ token: result.data.login });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/users', async (req, res) => {
  const GET_USERS = gql`
    query GetUsers {
      users {
        id
        email
      }
    }
  `;

  try {
    const result = await client.query({
      query: GET_USERS
    });
    res.send(result.data.users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`User service listening on port ${port}`);
});
