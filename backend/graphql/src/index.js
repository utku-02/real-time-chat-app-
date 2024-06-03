const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema');
const { getResolvers } = require('./graphql/resolvers');

const initializeServer = async () => {
  const resolvers = await getResolvers();

  const server = new ApolloServer({ typeDefs, resolvers });

  const mongoURL = process.env.MONGO_URL || 'mongodb://mongo:27017/real-time-chat-app';
  mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      server.listen().then(({ url }) => {
        console.log(`GraphQL service running at ${url}`);
      });
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err.message);
    });
};

initializeServer();
