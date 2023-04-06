const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { NotFoundError } = require("../errors");

module.exports = async (email, password) => {
  const user = await User.findOne({ email: email }).select("+password");
  console.log("USER: ", user);
  if (user == null) {
    const error = new NotFoundError("User not found");
    error.status = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return false;
  }
  return user._id;
};
