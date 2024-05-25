const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authMiddleware = require('./utils/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || '';
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/authdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post(`${baseUrl}/register`, async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
});

app.post(`${baseUrl}/login`, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send('Invalid email or password');

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
  res.send({ token });
});

app.get(`${baseUrl}/protected`, authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
