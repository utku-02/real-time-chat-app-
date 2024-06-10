const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const fetch = require('cross-fetch');
const cors = require('cors');

global.fetch = global.fetch || fetch;

const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(cors());

app.post('/auth/register', authController.registerUser);
app.post('/auth/login', authController.loginUser);
app.post('/auth/forgot-password', authController.forgotPassword);
app.post('/auth/reset-password/:token', authController.resetPassword);
app.get('/healthz', authController.getHealthz);
app.get('/readiness', authController.getReadiness);

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
