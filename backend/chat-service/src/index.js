const express = require('express');
const bodyParser = require('body-parser');
const chatController = require('./controllers/chatController');
const consumer = require('./utils/consumer');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());

app.post('/chats', chatController.createChatRoom);
app.get('/chats/:id', chatController.getChatRoom);

app.listen(port, () => {
  console.log(`Chat service running on port ${port}`);
  consumer.consumeMessages();
});
