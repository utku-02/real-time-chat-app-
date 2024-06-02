const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const { getResolvers } = require('./graphql/resolvers');

const initializeServer = async () => {
  const resolvers = await getResolvers();

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`GraphQL service running at ${url}`);
  });
};

initializeServer();
