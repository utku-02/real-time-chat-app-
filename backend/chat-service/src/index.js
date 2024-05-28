const express = require('express');
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
const fetch = require('cross-fetch');
const authMiddleware = require('./utils/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const baseUrl = process.env.BASE_URL || '';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI || 'http://graphql-gateway:4000/graphql',
  cache: new InMemoryCache(),
  fetch
});

app.use(express.json());

app.post(`${baseUrl}/chats`, authMiddleware, async (req, res) => {
  const { otherUserId } = req.body;

  const CREATE_CHAT = gql`
    mutation CreateChat($userIds: [ID!]!) {
      createChat(userIds: $userIds) {
        id
        users
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation: CREATE_CHAT,
      variables: { userIds: [req.user.userId, otherUserId] }
    });
    res.status(201).send(result.data.createChat);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post(`${baseUrl}/chats/:id/messages`, authMiddleware, async (req, res) => {
  const { content } = req.body;

  const ADD_MESSAGE = gql`
    mutation AddMessage($chatId: ID!, $senderId: ID!, $content: String!) {
      addMessage(chatId: $chatId, senderId: $senderId, content: $content) {
        id
        senderId
        content
        timestamp
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation: ADD_MESSAGE,
      variables: { chatId: req.params.id, senderId: req.user.userId, content }
    });
    res.status(201).send(result.data.addMessage);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get(`${baseUrl}/chats`, authMiddleware, async (req, res) => {
  const GET_CHATS = gql`
    query GetChats($userId: ID!) {
      chats(userId: $userId) {
        id
        users
        messages {
          id
          senderId
          content
          timestamp
        }
      }
    }
  `;

  try {
    const result = await client.query({
      query: GET_CHATS,
      variables: { userId: req.user.userId }
    });
    res.send(result.data.chats);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Chat service listening on port ${port}`);
});
