const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { NotFoundError, UnauthorizedError } = require("../errors");

module.exports = async (_id, password, newPassword) => {
  const user = await User.findById(_id).select("+password");
  if (user == null) {
    throw new NotFoundError("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Incorrect password");
  }
  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();

  return user;
};
