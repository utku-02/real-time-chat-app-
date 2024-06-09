const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const consumer = require('./utils/consumer');
const { GraphQLClient, gql } = require('graphql-request');
const amqp = require('amqplib');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Initialize GraphQL Client
const client = new GraphQLClient(process.env.GRAPHQL_URL);

app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.get('/users/:id', userController.getUser);
app.get('/users', userController.getUsers);
app.get('/users/:id/settings', userController.getUserSettings);
app.put('/users/:id/settings', userController.updateUserSettings);

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.get('/readiness', async (req, res) => {
  try {
    const query = gql`
      query {
        healthCheck
      }
    `;
    const data = await client.request(query);
    if (data.healthCheck !== 'OK') {
      return res.status(503).send('GraphQL service not ready');
    }
  } catch (err) {
    return res.status(503).send('GraphQL service not ready');
  }

  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    await connection.close();
  } catch (err) {
    return res.status(503).send('RabbitMQ not ready');
  }

  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`User service running on port ${port}`);
  consumer.consumeMessages();
});
