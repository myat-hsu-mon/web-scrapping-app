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

const getKeywordsByUserId = (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "UnAuthorized" });
  }
  const keywords = keywordController.getKeywordByUserId(req.params.id);
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getKeywordsByUserId,
};
