const { getChannel } = require('./rabbit-mq');

async function publishToQueue(queue, message) {
  const channel = await getChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message));
  console.log(`Message sent to queue ${queue}: ${message}`);
}

module.exports = { publishToQueue };
