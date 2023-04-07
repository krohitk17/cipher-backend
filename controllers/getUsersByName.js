const User = require("../models/user");
const { NotFoundError } = require("../errors");

module.exports = async (name, page) => {
  const users = await User.find({ name: { $regex: name, $options: "i" } })
    .skip((page - 1) * 10)
    .limit(10);
  if (users === []) {
    throw new NotFoundError("User not found");
  }
  return users;
};
