const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type Query {
    healthCheck: String
    users: [User]
    user(id: ID!): User
    userByEmail(email: String!): User
    chatRooms: [ChatRoom]
    chatRoom(id: ID!): ChatRoom
    message(id: ID!): Message
    messagesByChatId(chatId: ID!): [Message]
  }

  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
  }

  type ChatRoom {
    id: ID!
    name: String!
    members: [User]
  }

  type Message {
    id: ID!
    content: String!
    sender: User!
    timestamp: Date!
    chatRoom: ChatRoom
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
  }

  input CreateChatRoomInput {
    name: String!
  }

  input UpdateChatRoomInput {
    name: String
  }

  input CreateMessageInput {
    content: String!
    senderId: ID!
    timestamp: Date!
    chatRoomId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    updateUser(id: ID!, input: UpdateUserInput): User
    createChatRoom(input: CreateChatRoomInput): ChatRoom
    updateChatRoom(id: ID!, input: UpdateChatRoomInput): ChatRoom
    deleteChatRoom(id: ID!): Boolean
    inviteUsersToChatRoom(id: ID!, users: [ID!]!): ChatRoom
    createMessage(input: CreateMessageInput): Message
  }
`;

module.exports = typeDefs;
