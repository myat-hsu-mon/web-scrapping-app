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
  let result = await Result.findOne({ where: { keywordId: id } });
  const parsedKeyword = JSON.parse(JSON.stringify(keyword));
  return res.status(200).json({
    message: "keyword detail with result",
    data: { result, ...parsedKeyword },
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
