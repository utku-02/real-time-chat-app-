const express = require('express');
const mongoose = require('mongoose');
const Message = require('./models/Message');
const authMiddleware = require('../shared-utils/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/chatdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/message', authMiddleware, async (req, res) => {
  const { text, user } = req.body;
  const message = new Message({ text, user });
  await message.save();
  res.status(201).send('Message sent');
});

app.get('/messages', authMiddleware, async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
});

app.listen(port, () => {
  console.log(`Chat service listening on port ${port}`);
});
