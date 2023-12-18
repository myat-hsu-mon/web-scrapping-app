const { connect } = require("./connection");

async function publishToQueue(message) {
  const { connection, channel } = await connect();
  const queueName = "keywordsQueue";

  await channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(message));

  console.log(`Message '${message}' sent to queue '${queueName}'`);

  setTimeout(() => {
    connection.close();
  }, 1000);
}

module.exports = { publishToQueue };
