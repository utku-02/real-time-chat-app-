const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const consumer = require('./utils/consumer');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.get('/users/:id', userController.getUser);

app.listen(port, () => {
  console.log(`User service running on port ${port}`);
  consumer.consumeMessages();
});
