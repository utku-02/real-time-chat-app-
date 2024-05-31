const express = require('express');
const ApolloClient = require('apollo-boost').default;
const gql = require('graphql-tag');
const fetch = require('cross-fetch');
const { publishToQueue } = require('../../common/rabbit-mq/producer');
const { consumeFromQueue } = require('../../common/rabbit-mq/consumer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI || 'http://graphql-gateway:4000/graphql',
  fetch
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

    const message = JSON.stringify({
      event: 'USER_REGISTERED',
      data: result.data.register,
    });
    await publishToQueue('user-events', message);

    res.status(201).send(result.data.register);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
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

consumeFromQueue('user-events', async (message) => {
  const parsedMessage = JSON.parse(message);

  // Process the message and handle it as needed
  console.log(`Processed message: ${message}`);
});

app.listen(port, () => {
  console.log(`User service listening on port ${port}`);
});
