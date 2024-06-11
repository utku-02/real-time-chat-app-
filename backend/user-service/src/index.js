const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const consumer = require('./utils/consumer');
const fetch = require('cross-fetch');

global.fetch = global.fetch || fetch;

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.get('/users', userController.getUsers);
app.put('/users/:id', userController.updateUser);
app.get('/users/:id', userController.getUser);
app.get('/healthz', userController.getHealthz);
app.get('/readiness', userController.getReadiness);

app.listen(port, () => {
    console.log(`User service running on port ${port}`);
    consumer.consumeMessages();
});
