const User = require("./userModel");
const Keyword = require("./keywordModel");
const Result = require("./resultModel");

User.hasMany(Keyword);
Keyword.belongsTo(User);

Keyword.hasOne(Result);
Result.belongsTo(Keyword);

// Export models
module.exports = {
  User,
  Keyword,
  Result,
};
