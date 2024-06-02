const amqp = require('amqplib');

const sendMessage = async (queue, message) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    setTimeout(() => {
        connection.close();
    }, 500);
};

module.exports = {
    sendMessage
};
