const express = require('express');
const bodyParser = require('body-parser');
const messageController = require('./controllers/messageController');
const consumer = require('./utils/consumer');
const fetch = require('cross-fetch');

global.fetch = global.fetch || fetch;

const app = express();
const port = 3003;

app.use(bodyParser.json());

app.post('/messages', messageController.createMessage);
app.get('/messages/:id', messageController.getMessage);
app.get('/messages/chat/:chatId', messageController.getMessagesByChatId);
app.get('/healthz', messageController.getHealthz);
app.get('/readiness', messageController.getReadiness);

app.listen(port, () => {
  console.log(`Message service running on port ${port}`);
  consumer.consumeMessages();
});
