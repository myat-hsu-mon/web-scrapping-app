const User = require("../models/userModel");

const keywordController = require("./keywordController");

const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getKeywordsByUserId = async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.id !== id) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  const user = await User.findByPk(id, { include: ["Keyword"] });
  const keywords = user.keywords;
  return res.status(200).json({
    message: "keywords by user id",
    data: keywords,
  });
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getKeywordsByUserId,
};
