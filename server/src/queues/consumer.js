const { connect } = require("./connection");
const { scrapeWebData } = require("../web-scrape/scrape");
const { createResult } = require("../controllers/resultController");

async function consumeQueue() {
  try {
    const { channel } = await connect();
    const exchangeName = "keywordsExchange";
    const queueName = "keywordsQueue";
    // Create the delayed exchange
    await channel.assertExchange(exchangeName, "x-delayed-message", {
      autoDelete: false,
      durable: true,
      passive: true,
      arguments: { "x-delayed-type": "direct" },
    });

    // Create the queue
    await channel.assertQueue(queueName, { durable: true });

    // Bind the queue to the exchange
    await channel.bindQueue(queueName, exchangeName, "");

    console.log(`Waiting for messages from queue '${queueName}'...`);

    // Consume messages
    channel.consume(queueName, async (message) => {
      if (message !== null) {
        const { name, id } = JSON.parse(message.content.toString());
        const data = await scrapeWebData(name);
        console.log(`Received message: ${message.content.toString()}`);
        createResult({ keywordId: id, ...data });
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

consumeQueue();
