const User = require("../models/user");
const { NotFoundError } = require("../errors");

module.exports = async (email) => {
  const user = await User.findOne({ email });
  if (user == null) {
    throw new NotFoundError("User not found");
  }
  return user;
};
