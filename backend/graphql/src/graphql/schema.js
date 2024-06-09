const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    healthCheck: String
    user(id: ID!): User
    userSettings(id: ID!): UserSettings
    chatRoom(id: ID!): ChatRoom
    message(id: ID!): Message
    messagesByChatId(chatId: ID!): [Message!]
  }

  type User {
    id: ID!
    email: String!
    username: String!
    settings: UserSettings
  }

  type UserSettings {
    notifications: Boolean
    privacy: String
    theme: String
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

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
  }

  input UpdateUserSettingsInput {
    notifications: Boolean
    privacy: String
    theme: String
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
    chatRoomId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    updateUserSettings(id: ID!, settings: UpdateUserSettingsInput!): UserSettings
    createChatRoom(input: CreateChatRoomInput!): ChatRoom
    updateChatRoom(id: ID!, input: UpdateChatRoomInput!): ChatRoom
    deleteChatRoom(id: ID!): Boolean
    inviteUsersToChatRoom(id: ID!, users: [ID!]!): ChatRoom
    createMessage(input: CreateMessageInput!): Message
  }
`;

module.exports = typeDefs;
