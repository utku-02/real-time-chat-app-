const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    const users = [
      { email: 'user1@example.com', username: 'user1', password: 'password1' },
      { email: 'user2@example.com', username: 'user2', password: 'password2' },
      { email: 'user3@example.com', username: 'user3', password: 'password3' }
    ];
    
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    
    const chatRooms = [
      { name: 'General' },
      { name: 'Tech' },
      { name: 'Random' }
    ];
    
    await User.deleteMany({});
    console.log('Existing users cleared');
    
    await ChatRoom.deleteMany({});
    console.log('Existing chat rooms cleared');
    
    await Message.deleteMany({});
    console.log('Existing messages cleared');
    
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded successfully');
    
    chatRooms[0].members = [createdUsers[0]._id, createdUsers[1]._id];
    chatRooms[1].members = [createdUsers[1]._id, createdUsers[2]._id];
    chatRooms[2].members = [createdUsers[0]._id, createdUsers[2]._id];
    
    const createdChatRooms = await ChatRoom.insertMany(chatRooms);
    console.log('Chat rooms seeded successfully');
    
    const messages = [
      { content: 'Hello world', sender: createdUsers[0]._id, chatRoom: createdChatRooms[0]._id },
      { content: 'Hi there', sender: createdUsers[1]._id, chatRoom: createdChatRooms[1]._id },
      { content: 'Good morning', sender: createdUsers[2]._id, chatRoom: createdChatRooms[2]._id }
    ];
    
    await Message.insertMany(messages);
    console.log('Messages seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
