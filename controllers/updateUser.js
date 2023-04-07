const User = require("../models/user");
const getUser = require("./getUser");

module.exports = async (_id, updatedUser) => {
  const user = await getUser(_id);

  if (updatedUser.name) {
    user.name = updatedUser.name;
  }
  if (updatedUser.description) {
    user.description = updatedUser.description;
  }
  if (updatedUser.followers) {
    user.followers = updatedUser.followers;
  }
  if (updatedUser.following) {
    user.following = updatedUser.following;
  }
  if (updatedUser.avatar) {
    user.avatar = updatedUser.avatar;
  }
  if (updatedUser.socials) {
    if (updatedUser.socials.facebook) {
      user.socials.facebook = updatedUser.socials.facebook;
    }
    if (updatedUser.socials.github) {
      user.socials.github = updatedUser.socials.github;
    }
    if (updatedUser.socials.instagram) {
      user.socials.instagram = updatedUser.socials.instagram;
    }
    if (updatedUser.socials.linkedin) {
      user.socials.linkedin = updatedUser.socials.linkedin;
    }
    if (updatedUser.socials.twitter) {
      user.socials.twitter = updatedUser.socials.twitter;
    }
    if (updatedUser.socials.website) {
      user.socials.website = updatedUser.socials.website;
    }
  }
  await user.save();
  return user;
};
