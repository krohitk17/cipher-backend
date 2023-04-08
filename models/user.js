const mongoose = require("mongoose");
const joi = require("joi");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  description: {
    type: String,
    maxlength: 150,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  socials: {
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
