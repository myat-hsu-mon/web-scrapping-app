const { connect } = require("./connection");

async function publishToQueue(message, delay) {
  try {
    const { connection, channel } = await connect();
    const exchangeName = "keywordsExchange";

    // Publish the message with the delay header
    await channel.publish(exchangeName, "", Buffer.from(message), {
      headers: { "x-delay": delay },
    });
    console.log(`Sent: ${message} with a delay of ${delay} ms`);

    setTimeout(() => {
      connection.close();
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  publishToQueue,
};
