const { GraphQLScalarType, Kind } = require('graphql');
const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client input variables
  },
  serialize(value) {
    return value.toISOString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});

const resolvers = {
  Date: dateScalar,
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
    chatRooms: async () => {
      try {
        return await ChatRoom.find({}).populate('members');
      } catch (err) {
        console.error('Error fetching chat rooms:', err);
        throw new Error('Error fetching chat rooms');
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
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new Error('Email already exists');
        }
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
        if (input.password) {
          input.password = await bcrypt.hash(input.password, 10);
        }
        return await User.findByIdAndUpdate(id, input, { new: true });
      } catch (err) {
        console.error('Error updating user:', err);
        throw new Error('Error updating user');
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
        return await ChatRoom.findByIdAndUpdate(id, input, { new: true }).populate('members');
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
        // Fetch the user and chat room using the IDs provided in the input
        const sender = await User.findById(input.senderId);
        const chatRoom = await ChatRoom.findById(input.chatRoomId);
    
        if (!sender || !chatRoom) {
          throw new Error('Invalid sender or chat room');
        }
    
        // Create the message object
        const message = new Message({
          content: input.content,
          sender: sender._id,
          chatRoom: chatRoom._id,
          timestamp: input.timestamp || new Date()
        });
    
        // Save the message
        await message.save();
    
        // Populate sender and chat room fields
        await message.populate('sender');
        await message.populate('chatRoom');
    
        return message;
      } catch (err) {
        console.error('Error creating message:', err);
        throw new Error('Error creating message');
      }
    } 
  }
};

module.exports = { getResolvers: () => resolvers };
