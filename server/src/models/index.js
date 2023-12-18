const User = require("./userModel");
const Keyword = require("./keywordModel");

User.hasMany(Keyword);
Keyword.belongsTo(User);

// Export models
module.exports = {
  User,
  Keyword,
};
