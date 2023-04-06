const User = require("../models/user");
const { NotFoundError } = require("../errors");

module.exports = async (name, page) => {
  const users = await User.find({ name: { $regex: name, $options: "i" } })
    .skip(page)
    .limit(10)
    .toArray();
  if (users == null) {
    throw new NotFoundError("User not found");
  }
  return users;
};
