const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./utils/authMiddleware');
const Message = require('./models/Message');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/messagedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/messages', authMiddleware, async (req, res) => {
  const { receiverId, content } = req.body;
  const message = new Message({
    senderId: req.user.userId,
    receiverId,
    content
  });
  await message.save();
  res.status(201).send(message);
});

app.get('/messages', authMiddleware, async (req, res) => {
  const messages = await Message.find({ $or: [{ senderId: req.user.userId }, { receiverId: req.user.userId }] });
  res.send(messages);
});

app.listen(port, () => {
  console.log(`Message service listening on port ${port}`);
});
