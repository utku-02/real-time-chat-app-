const express = require('express');
const mongoose = require('mongoose');
const Message = require('./models/Message');
const authMiddleware = require('../shared-utils/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/messagedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/messages', authMiddleware, async (req, res) => {
  const { recipient, content } = req.body;
  const message = new Message({
    sender: req.user.userId,
    recipient,
    content,
  });
  await message.save();
  res.status(201).send(message);
});

app.get('/messages', authMiddleware, async (req, res) => {
  const messages = await Message.find({
    $or: [{ sender: req.user.userId }, { recipient: req.user.userId }],
  }).sort({ timestamp: -1 });
  res.send(messages);
});

app.listen(port, () => {
  console.log(`Message service listening on port ${port}`);
});
