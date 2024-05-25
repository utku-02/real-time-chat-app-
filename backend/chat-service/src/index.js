const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./utils/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const baseUrl = process.env.BASE_URL || '';

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/chatdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const chatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model('Chat', chatSchema);

app.post(`${baseUrl}/chats`, authMiddleware, async (req, res) => {
  const chat = new Chat({
    users: [req.user.userId, req.body.otherUserId],
  });
  await chat.save();
  res.status(201).send(chat);
});

app.post(`${baseUrl}/chats/:id/messages`, authMiddleware, async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  if (!chat) return res.status(404).send('Chat not found');

  const message = {
    sender: req.user.userId,
    content: req.body.content,
  };

  chat.messages.push(message);
  await chat.save();
  res.status(201).send(message);
});

app.get(`${baseUrl}/chats`, authMiddleware, async (req, res) => {
  const chats = await Chat.find({ users: req.user.userId });
  res.send(chats);
});

app.listen(port, () => {
  console.log(`Chat service listening on port ${port}`);
});
