const fs = require("fs");

const { createKeyword } = require("./keywordController");

const { publishToQueue } = require("../queues/publisher");

const uploadFile = async (req, res) => {
  console.log("uploadFile");
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

  console.log({ messageKeywords });
  return res.status(201).json({
    data: keywords,
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
  for (const keyword of keywords) {
    const newKeyword = await createKeyword({ userId: user.id, name: keyword });
    messageKeywords.push({
      keywordId: newKeyword.id,
      name: newKeyword.name,
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
  return fileResult.trim().split(/,|\n/);
};

module.exports = {
  uploadFile,
};
