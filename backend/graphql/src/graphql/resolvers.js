const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');

const resolvers = {
  Query: {
    healthCheck: () => 'OK',
    users: async () => {
      try {
        return await User.find({});
      } catch (err) {
        console.error('Error fetching users:', err);
        throw new Error('Error fetching users');
      }
    },
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (err) {
        console.error('Error fetching user:', err);
        throw new Error('Error fetching user');
      }
    },
    userByEmail: async (_, { email }) => {
      try {
        return await User.findOne({ email });
      } catch (err) {
        console.error('Error fetching user by email:', err);
        throw new Error('Error fetching user by email');
      }
    },
    userSettings: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user.settings;
      } catch (err) {
        console.error('Error fetching user settings:', err);
        throw new Error('Error fetching user settings');
      }
    },
    chatRoom: async (_, { id }) => {
      try {
        return await ChatRoom.findById(id).populate('members');
      } catch (err) {
        console.error('Error fetching chat room:', err);
        throw new Error('Error fetching chat room');
      }
    },
    message: async (_, { id }) => {
      try {
        return await Message.findById(id).populate('sender').populate('chatRoom');
      } catch (err) {
        console.error('Error fetching message:', err);
        throw new Error('Error fetching message');
      }
    },
    messagesByChatId: async (_, { chatId }) => {
      try {
        return await Message.find({ chatRoom: chatId }).populate('sender').populate('chatRoom');
      } catch (err) {
        console.error('Error fetching messages by chat ID:', err);
        throw new Error('Error fetching messages by chat ID');
      }
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const user = new User(input);
        await user.save();
        return user;
      } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Error creating user');
      }
    },
    updateUser: async (_, { id, input }) => {
      try {
        return await User.findByIdAndUpdate(id, input, { new: true });
      } catch (err) {
        console.error('Error updating user:', err);
        throw new Error('Error updating user');
      }
    },
    updateUserSettings: async (_, { id, settings }) => {
      try {
        const user = await User.findById(id);
        user.settings = settings;
        await user.save();
        return user.settings;
      } catch (err) {
        console.error('Error updating user settings:', err);
        throw new Error('Error updating user settings');
      }
    },
    createChatRoom: async (_, { input }) => {
      try {
        const chatRoom = new ChatRoom(input);
        await chatRoom.save();
        return chatRoom;
      } catch (err) {
        console.error('Error creating chat room:', err);
        throw new Error('Error creating chat room');
      }
    },
    updateChatRoom: async (_, { id, input }) => {
      try {
        return await ChatRoom.findByIdAndUpdate(id, input, { new: true });
      } catch (err) {
        console.error('Error updating chat room:', err);
        throw new Error('Error updating chat room');
      }
    },
    deleteChatRoom: async (_, { id }) => {
      try {
        await ChatRoom.findByIdAndDelete(id);
        return true;
      } catch (err) {
        console.error('Error deleting chat room:', err);
        throw new Error('Error deleting chat room');
      }
    },
    inviteUsersToChatRoom: async (_, { id, users }) => {
      try {
        const chatRoom = await ChatRoom.findById(id);
        chatRoom.members.push(...users);
        await chatRoom.save();
        return chatRoom.populate('members');
      } catch (err) {
        console.error('Error inviting users to chat room:', err);
        throw new Error('Error inviting users to chat room');
      }
    },
    createMessage: async (_, { input }) => {
      try {
        const message = new Message(input);
        await message.save();
        return message.populate('sender').populate('chatRoom');
      } catch (err) {
        console.error('Error creating message:', err);
        throw new Error('Error creating message');
      }
    }
  }
};

module.exports = { getResolvers: () => resolvers };
