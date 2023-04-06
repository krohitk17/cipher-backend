const User = require("../models/user");
const { NotFoundError } = require("../errors");

module.exports = async (_id) => {
  const user = User.findById(_id);
  if (user == null) {
    throw new NotFoundError("User not found");
  }
  return user;
};
