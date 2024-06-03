const express = require('express');
const bodyParser = require('body-parser');
const chatController = require('./controllers/chatController');
const consumer = require('./utils/consumer');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());

app.post('/chats', chatController.createChatRoom);
app.get('/chats/:id', chatController.getChatRoom);
app.put('/chats/:id', chatController.updateChatRoom);
app.delete('/chats/:id', chatController.deleteChatRoom);
app.post('/chats/:id/invite', chatController.inviteUsers);

app.listen(port, () => {
  console.log(`Chat service running on port ${port}`);
  consumer.consumeMessages();
});
