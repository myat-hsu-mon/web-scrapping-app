const fs = require("fs");

const { createKeyword } = require("./keywordController");

const { publishToQueue } = require("../queues/publisher");

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file found" });
  }
  const filePath = req.file.path;
  const fileResult = readCSV(filePath);
  const keywords = filterKeywords(fileResult);
  if (keywords.length > 100) {
    return res.status(400).json({
      message: "keywords is more than 100",
    });
  }
  const messageKeywords = await saveKeyword(req.user, keywords);
  pushMessageToQueue(messageKeywords);

  return res.status(201).json({
    data: messageKeywords,
    message: "file upload successfully",
  });
};

const pushMessageToQueue = (messages) => {
  for (const msg of messages) {
    publishToQueue(JSON.stringify(msg));
  }
};

const saveKeyword = async (user, keywords) => {
  const messageKeywords = [];
  const newKeywords = await Promise.all(
    keywords.map((keyword) => {
      return createKeyword({ userId: user.id, name: keyword });
    })
  );
  for (const keyword of newKeywords) {
    messageKeywords.push({
      id: keyword.id,
      name: keyword.name,
    });
  }
  return messageKeywords;
};

const readCSV = (filePath) => {
  const result = fs.readFileSync(filePath, "utf-8", (error) => {
    if (error) {
      console.log("file read error");
    }
  });
  return result;
};

const filterKeywords = (fileResult) => {
  return fileResult
    .trim()
    .split(/,|\n/)
    .filter((str) => str);
};

module.exports = {
  uploadFile,
};
