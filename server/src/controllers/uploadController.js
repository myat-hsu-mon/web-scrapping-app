const fs = require("fs");

const { createKeyword } = require("./keywordController");

const { publishToQueue } = require("../queues/publisher");

const uploadFile = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file found" });
  }
  if (!validateFile(file)) {
    return res.status(400).json({ message: "Invalid file type" });
  }
  const { path: filePath } = file;
  const fileResult = readCSV(filePath);
  const keywords = parseAndFilterKeywords(fileResult);

  if (keywords.length > 100) {
    return res.status(400).json({
      message: "keywords is more than 100",
    });
  }
  const newKeywords = await saveKeyword(req.user, keywords);
  const messageKeywords = newKeywords.map((keyword) => ({
    id: keyword.id,
    name: keyword.name,
  }));
  pushMessageToQueue(messageKeywords);

  return res.status(201).json({
    data: messageKeywords,
    message: "file upload successfully",
  });
};

//checks if the file type is csv or not
const validateFile = (file) => {
  const { mimetype } = file;
  const allowedFileType = "text/csv";
  if (mimetype !== allowedFileType) {
    return false;
  }
  return true;
};

/* push the messages to queue with the specified message content
and set a delay between each message */
const pushMessageToQueue = (messages) => {
  let delayInMilliseconds = 0;
  for (const message of messages) {
    delayInMilliseconds += 500;
    publishToQueue(JSON.stringify(message), delayInMilliseconds);
  }
};

const saveKeyword = async (user, keywords) => {
  const newKeywords = await createKeywords(user, keywords);
  return newKeywords;
};

// create all keywords in the file into the database
const createKeywords = async (user, keywords) => {
  const newKeywords = await Promise.all(
    keywords.map((keyword) => {
      return createKeyword({ userId: user.id, name: keyword });
    })
  );
  return newKeywords;
};

// Reads and returns the content of a CSV file synchronously
const readCSV = (filePath) => {
  const result = fs.readFileSync(filePath, "utf-8", (error) => {
    if (error) {
      console.log("file read error");
    }
  });
  return result;
};

// filter comma separated keywords
const parseAndFilterKeywords = (fileResult) => {
  return fileResult
    .trim()
    .split(/,|\n/)
    .filter((str) => str);
};

module.exports = {
  uploadFile,
};
