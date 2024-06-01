const { getChannel } = require('./rabbit-mq');

async function consumeFromQueue(queue, callback) {
  const channel = await getChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (message) => {
    if (message !== null) {
      callback(message.content.toString());
      channel.ack(message);
    }
  });
  console.log(`Consuming from queue ${queue}`);
}

module.exports = { consumeFromQueue };
