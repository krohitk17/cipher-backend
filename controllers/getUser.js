const User = require("../models/user");
const { NotFoundError } = require("../errors");

module.exports = async (_id) => {
  const user = await User.findById(_id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};
