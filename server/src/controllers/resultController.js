const { Result } = require("../../models");

const createResult = async (result) => {
  const newResult = await Result.create(result);
  return newResult;
};

module.exports = {
  createResult,
};
