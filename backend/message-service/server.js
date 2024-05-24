const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define a message schema
const messageSchema = new mongoose.Schema({
    content: String,
    sender: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.post('/messages', async (req, res) => {
    const { content, sender } = req.body;
    const message = new Message({ content, sender });
    await message.save();
    res.status(201).send(message);
});

app.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.send(messages);
});

app.listen(port, () => {
    console.log(`Message service listening on port ${port}`);
});
