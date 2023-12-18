const Keyword = require("../models/keywordModel");
const Result = require("../models/resultModel");

const getKeywordByIdWithResult = async (req, res) => {
  const id = parseInt(req.params.id);
  const keyword = await Keyword.findByPk(id);
  if (!keyword) {
    return res.status(400).json({
      message: "No keyword found",
    });
  }
  if (keyword.userId !== req.user.id) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  const result = await Result.findOne({ keywordId: id });
  keyword.result = result;
  return res.status(200).json({
    message: "keyword detail with result",
    data: keyword,
  });
};

const getKeywordByUserId = async (userId) => {};

const createKeyword = async (data) => {
  const newKeyword = await Keyword.create(data);
  return newKeyword;
};

module.exports = {
  getKeywordByUserId,
  getKeywordByIdWithResult,
  createKeyword,
};
