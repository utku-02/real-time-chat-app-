const express = require('express');
const ApolloClient = require('apollo-boost').default;
const gql = require('graphql-tag');
const fetch = require('cross-fetch');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./utils/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || '';
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI || 'http://graphql-gateway:4000/graphql',
  fetch
});

app.use(express.json());

app.post(`${baseUrl}/register`, async (req, res) => {
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

app.post(`${baseUrl}/login`, async (req, res) => {
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

app.get(`${baseUrl}/protected`, authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
