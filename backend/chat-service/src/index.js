const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatController = require('./controllers/chatController');
const consumer = require('./utils/consumer');
const fetch = require('cross-fetch');

global.fetch = global.fetch || fetch;

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/chats', chatController.createChatRoom);
app.get('/chats/:id', chatController.getChatRoom);
app.put('/chats/:id', chatController.updateChatRoom);
app.delete('/chats/:id', chatController.deleteChatRoom);
app.post('/chats/:id/invite', chatController.inviteUsers);
app.get('/healthz', chatController.getHealthz);
app.get('/readiness', chatController.getReadiness);

app.listen(port, () => {
  console.log(`Chat service running on port ${port}`);
  consumer.consumeMessages();
});
