const amqp = require('amqplib');
const messageService = require('../services/messageService');

const consumeMessages = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('chat.room.joined');

    channel.consume('chat.room.joined', async (msg) => {
        const chatRoom = JSON.parse(msg.content.toString());
        await messageService.handleChatRoomJoined(chatRoom);
        channel.ack(msg);
    });
};

module.exports = {
    consumeMessages
};
