const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }
    res.send(user);
});

app.listen(3000, () => {
    console.log('User service listening on port 3000');
});
// hvad