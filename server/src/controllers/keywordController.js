const Keyword = require("../models/keywordModel");

const getKeywords = async (req, res) => {
  const keywords = await Keyword.findAll();
  return res.status(200).json({
    status: "success",
    message: "All keywords are retrieved!",
    data: keywords,
  });
};

const getKeywordById = async (req, res) => {
  
};

const getKeywordByUserId = async (userId) => {};

const getKeywordByPk = async (id) => {};

module.exports = {
  getKeywords,
  getKeywordByUserId,
  getKeywordById,
};
