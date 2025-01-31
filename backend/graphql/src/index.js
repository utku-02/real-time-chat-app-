const { ApolloServer } = require('apollo-server');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema');
const { getResolvers } = require('./graphql/resolvers');
const seedDatabase = require('./services/seedDatabase'); 
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
const healthCheckPort = 4001;

app.use(bodyParser.json());
app.use(cors());

const initializeServer = async () => {
  const resolvers = await getResolvers();

  const server = new ApolloServer({ typeDefs, resolvers });

  const mongoURL = process.env.MONGO_URL || 'mongodb://mongo:27017/real-time-chat-app';

  mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log('Connected to MongoDB');

      await seedDatabase();

      server.listen({ port }).then(({ url }) => {
        console.log(`GraphQL service running at ${url}`);
      });
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1);
    });
};

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.get('/readiness', (req, res) => {
  const dbState = mongoose.connection.readyState;
  if (dbState !== 1) {
    console.error('Database not ready:', dbState);
    return res.status(503).send('Database not ready');
  }
  res.status(200).send('OK');
});

app.listen(healthCheckPort, () => {
  console.log(`Health check service running on port ${healthCheckPort}`);
});

initializeServer();
