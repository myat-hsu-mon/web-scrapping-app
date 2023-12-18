const { connect } = require("./connection");
const { scrapeWebData } = require("../web-scrape/scrape");
const { saveResult } = require("../controllers/resultController");

async function consumeQueue() {
  const { channel } = await connect();
  const queueName = "keywordsQueue";

  await channel.assertQueue(queueName, { durable: false });

  console.log(`Waiting for messages from queue '${queueName}'...`);

  channel.consume(queueName, async (message) => {
    if (message !== null) {
      const { name, id } = JSON.parse(message.content.toString());
      const data = await scrapeWebData(name);
      console.log(`Received message: ${message.content.toString()}`);
      saveResult({ keywordId: id, ...data });
      channel.ack(message);
    }
  });
}

consumeQueue();
