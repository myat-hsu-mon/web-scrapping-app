const { Keyword, Result } = require("../../models");

const getKeywordByIdWithResult = async (req, res) => {
  const id = parseInt(req.params.id);
  const keyword = await Keyword.findByPk(id, {
    include: [{ model: Result, as: "result" }],
  });

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
  return res.status(200).json({
    message: "keyword detail with result",
    data: keyword,
  });
};

const createKeyword = async (data) => {
  const newKeyword = await Keyword.create(data);
  return newKeyword;
};

module.exports = {
  getKeywordByIdWithResult,
  createKeyword,
};
