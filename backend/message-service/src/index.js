const express = require('express');
const { ApolloClient, InMemoryCache, gql } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const fetch = require('cross-fetch');
const authMiddleware = require('./utils/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;
const baseUrl = process.env.BASE_URL || '';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_URI || 'http://graphql-gateway:4000/graphql', fetch }),
  cache: new InMemoryCache()
});

app.use(express.json());

app.post(`${baseUrl}/messages`, authMiddleware, async (req, res) => {
  const { receiverId, content } = req.body;

  const CREATE_MESSAGE = gql`
    mutation CreateMessage($senderId: ID!, $receiverId: ID!, $content: String!) {
      createMessage(senderId: $senderId, receiverId: $receiverId, content: $content) {
        id
        senderId
        receiverId
        content
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation: CREATE_MESSAGE,
      variables: { senderId: req.user.userId, receiverId, content }
    });
    res.status(201).send(result.data.createMessage);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get(`${baseUrl}/messages`, authMiddleware, async (req, res) => {
  const GET_MESSAGES = gql`
    query GetMessages($userId: ID!) {
      messages(userId: $userId) {
        id
        senderId
        receiverId
        content
      }
    }
  `;

  try {
    const result = await client.query({
      query: GET_MESSAGES,
      variables: { userId: req.user.userId }
    });
    res.send(result.data.messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Message service listening on port ${port}`);
});
