const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
const secretKey = 'your_secret_key'; // Replace with your secret key

mongoose.connect('mongodb://mongo:27017/chatdb', { useNewUrlParser: true, useUnifiedTopology: true });

const ChatRoomSchema = new mongoose.Schema({
  name: String,
  members: [String],
});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

app.use(bodyParser.json());

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.sendStatus(403);
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
};

// Create a chat room
app.post('/chatrooms', verifyToken, async (req, res) => {
  const { name, members } = req.body;
  const chatRoom = new ChatRoom({ name, members });
  await chatRoom.save();
  res.sendStatus(201);
});

// Get chat rooms
app.get('/chatrooms', verifyToken, async (req, res) => {
  const chatRooms = await ChatRoom.find({ members: req.user.username });
  res.json(chatRooms);
});

app.listen(port, () => {
  console.log(`Chat service running on port ${port}`);
});
