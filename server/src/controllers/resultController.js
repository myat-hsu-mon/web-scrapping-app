const Result = require("../models/resultModel");

const saveResult = async (result) => {
  const newResult = await Result.create(result);
  return newResult;
};

module.exports = {
  saveResult,
};
