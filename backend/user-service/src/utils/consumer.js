const amqp = require('amqplib');
const userService = require('../services/userService');

const consumeMessages = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('user.updated');

    channel.consume('user.updated', async (msg) => {
        const user = JSON.parse(msg.content.toString());
        await userService.handleUserUpdate(user);
        channel.ack(msg);
    });
};

module.exports = {
    consumeMessages
};
