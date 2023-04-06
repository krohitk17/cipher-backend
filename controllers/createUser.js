const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { ConflictError } = require("../errors");

module.exports = async (userData) => {
  try {
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: await bcrypt.hash(userData.password, 12),
    });
    await user.save();
    return user;
  } catch (err) {
    throw new ConflictError(err.message);
  }
};
