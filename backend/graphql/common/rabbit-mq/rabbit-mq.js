const amqp = require('amqplib');

let channel = null;

async function connect() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
}

async function getChannel() {
  if (!channel) {
    await connect();
  }
  return channel;
}

module.exports = { getChannel };
