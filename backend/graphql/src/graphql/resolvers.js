const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    userSettings: async (_, { id }) => {
      const user = await User.findById(id);
      return user.settings;
    },
    chatRoom: async (_, { id }) => {
      return await ChatRoom.findById(id).populate('members');
    },
    message: async (_, { id }) => {
      return await Message.findById(id).populate('sender').populate('chatRoom');
    },
    messagesByChatId: async (_, { chatId }) => {
      return await Message.find({ chatRoom: chatId }).populate('sender').populate('chatRoom');
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = new User(input);
      await user.save();
      return user;
    },
    updateUser: async (_, { id, input }) => {
      return await User.findByIdAndUpdate(id, input, { new: true });
    },
    updateUserSettings: async (_, { id, settings }) => {
      const user = await User.findById(id);
      user.settings = settings;
      await user.save();
      return user.settings;
    },
    createChatRoom: async (_, { input }) => {
      const chatRoom = new ChatRoom(input);
      await chatRoom.save();
      return chatRoom;
    },
    updateChatRoom: async (_, { id, input }) => {
      return await ChatRoom.findByIdAndUpdate(id, input, { new: true });
    },
    deleteChatRoom: async (_, { id }) => {
      await ChatRoom.findByIdAndDelete(id);
      return true;
    },
    inviteUsersToChatRoom: async (_, { id, users }) => {
      const chatRoom = await ChatRoom.findById(id);
      chatRoom.members.push(...users);
      await chatRoom.save();
      return chatRoom.populate('members');
    },
    createMessage: async (_, { input }) => {
      const message = new Message(input);
      await message.save();
      return message.populate('sender').populate('chatRoom');
    }
  }
};

module.exports = { getResolvers: () => resolvers };
