const express = require('express');
const bodyParser = require('body-parser');
const messageController = require('./controllers/messageController');
const consumer = require('./utils/consumer');

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());

app.post('/messages', messageController.createMessage);
app.get('/messages/:id', messageController.getMessage);

app.listen(port, () => {
  console.log(`Message service running on port ${port}`);
  consumer.consumeMessages();
});
