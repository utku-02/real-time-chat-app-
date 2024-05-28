const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const url = process.env.MONGODB_URI || 'mongodb://mongo:27017/userdb';
const dbName = 'userdb';
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  db = client.db(dbName);
});

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Message {
    id: ID!
    senderId: ID!
    content: String!
    timestamp: String!
  }

  type Chat {
    id: ID!
    users: [ID!]!
    messages: [Message]!
  }

  type Query {
    users: [User]
    messages(userId: ID!): [Message]
    chats(userId: ID!): [Chat]
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): String
    createMessage(senderId: ID!, receiverId: ID!, content: String!): Message
    createChat(userIds: [ID!]!): Chat
    addMessage(chatId: ID!, senderId: ID!, content: String!): Message
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await db.collection('users').find().toArray();
    },
    messages: async (_, { userId }) => {
      return await db.collection('messages').find({ $or: [{ senderId: userId }, { receiverId: userId }] }).toArray();
    },
    chats: async (_, { userId }) => {
      return await db.collection('chats').find({ users: userId }).toArray();
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.collection('users').insertOne({ email, password: hashedPassword });
      return { id: result.insertedId, email };
    },
    login: async (_, { email, password }) => {
      const user = await db.collection('users').findOne({ email });
      if (!user) throw new Error('Invalid email or password');

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Invalid email or password');

      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
      return token;
    },
    createMessage: async (_, { senderId, receiverId, content }) => {
      const result = await db.collection('messages').insertOne({ senderId, receiverId, content });
      return { id: result.insertedId, senderId, receiverId, content };
    },
    createChat: async (_, { userIds }) => {
      const result = await db.collection('chats').insertOne({ users: userIds, messages: [] });
      return { id: result.insertedId, users: userIds, messages: [] };
    },
    addMessage: async (_, { chatId, senderId, content }) => {
      const chat = await db.collection('chats').findOne({ _id: new ObjectId(chatId) });
      if (!chat) throw new Error('Chat not found');

      const message = { id: new ObjectId(), senderId, content, timestamp: new Date().toISOString() };
      await db.collection('chats').updateOne(
        { _id: new ObjectId(chatId) },
        { $push: { messages: message } }
      );
      return message;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
