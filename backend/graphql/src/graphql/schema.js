const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
  }

  type ChatRoom {
    id: ID!
    name: String!
    members: [User!]!
  }

  type Message {
    id: ID!
    content: String!
    sender: User!
    chatRoom: ChatRoom!
  }

  type Query {
    user(id: ID!): User
    chatRoom(id: ID!): ChatRoom
    message(id: ID!): Message
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
  }

  input CreateChatRoomInput {
    name: String!
  }

  input CreateMessageInput {
    content: String!
    senderId: ID!
    chatRoomId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    createChatRoom(input: CreateChatRoomInput!): ChatRoom
    createMessage(input: CreateMessageInput!): Message
  }
`;

module.exports = typeDefs;
