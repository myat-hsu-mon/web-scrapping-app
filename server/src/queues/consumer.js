const axios = require("axios");
const cheerio = require("cheerio");
const { connect } = require("./connection");
const { scrapeWebData } = require("../web-scrape/scrape");
// const { createResult } = require("../controller/resultController");

async function consumeQueue() {
  const { channel } = await connect();
  const queueName = "keywordsQueue";

  await channel.assertQueue(queueName, { durable: false });

  console.log(`Waiting for messages from queue '${queueName}'...`);

  channel.consume(queueName, async (message) => {
    if (message !== null) {
      console.log(
        "message content:",
        JSON.parse(message.content.toString()).name
      );
      const { name, keywordId } = JSON.parse(message.content.toString());
      const data = await scrapeWebData(name);
      console.log({ keywordId });
      console.log("scrap data:", data);
      //createResult() call {keywordId, ...data}
      //
      //   console.log(`Received message: ${message.content.toString()}`);
      channel.ack(message);
    }
  });
}

consumeQueue();
