const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');

const app = express();
const port = process.env.PORT || 3004;

app.use(bodyParser.json());

app.post('/auth/register', authController.registerUser);
app.post('/auth/login', authController.loginUser);

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
