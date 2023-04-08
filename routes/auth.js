const express = require("express");
const router = express.Router();

const signToken = require("../middlewares/signToken");
const loginUser = require("../middlewares/loginUser");
const verifyToken = require("../middlewares/verifyToken");
const updatePassword = require("../controllers/updatePassword");

router.get(
  "/login",
  loginUser,
  async (req, res, next) => {
    console.log("CALL LOGIN GET REQUEST");
    console.log("EMAIL: ", req.header("email"));
    next();
  },
  signToken
);

router.patch("/password", verifyToken, async (req, res, next) => {
  console.log("CALL PASSWORD PATCH REQUEST");
  try {
    await updatePassword(req._id, req.body.oldPassword, req.body.newPassword);
    res.status(200).json({
      success: true,
    });
    console.log("PASSWORD UPDATED");
  } catch (error) {
    next(error);
  }
  next();
});

module.exports = router;
