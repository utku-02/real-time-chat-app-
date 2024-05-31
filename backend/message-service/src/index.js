const express = require('express');
const ApolloClient = require('apollo-boost').default;
const gql = require('graphql-tag');
const fetch = require('cross-fetch');
const authMiddleware = require('./utils/authMiddleware');
const { publishToQueue, consumeFromQueue } = require('../../common/rabbit-mq');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;
const baseUrl = process.env.BASE_URL || '';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI || 'http://graphql-gateway:4000/graphql',
  fetch
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
        timestamp
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation: CREATE_MESSAGE,
      variables: { senderId: req.user.userId, receiverId, content }
    });

    const message = JSON.stringify({
      event: 'NEW_MESSAGE',
      data: result.data.createMessage,
    });
    await publishToQueue('chat-messages', message);

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
        timestamp
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

consumeFromQueue('chat-messages', async (message) => {
  const parsedMessage = JSON.parse(message);

  // Process the message using GraphQL Gateway
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
      variables: {
        chatId: parsedMessage.data.chatId,
        senderId: parsedMessage.data.senderId,
        content: parsedMessage.data.content,
      }
    });

    console.log(`Processed message: ${result.data.addMessage}`);
  } catch (error) {
    console.error(`Failed to process message: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Message service listening on port ${port}`);
});
