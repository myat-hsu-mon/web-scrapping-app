const Keyword = require("../models/keywordModel");

const getKeywordById = async (req, res) => {};

const getKeywordByUserId = async (userId) => {};

const getKeywordByPk = async (id) => {};

const createKeyword = async (data) => {
  const newKeyword = await Keyword.create(data);
  return newKeyword;
};

module.exports = {
  getKeywordByUserId,
  getKeywordById,
  createKeyword,
};
