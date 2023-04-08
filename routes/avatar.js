const express = require("express");
const router = express.Router();
const multer = require("multer");

const verifyToken = require("../middlewares/verifyToken");
const updateUser = require("../controllers/updateUser");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatars/");
  },
  filename: (req, file, cb) => {
    const filename = `${req._id}.png`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  verifyToken,
  upload.single("avatar"),
  async (req, res, next) => {
    console.log(req.body);
    console.log("CALL AVATAR POST REQUEST");
    try {
      await updateUser(req._id, {
        avatar:
          req.protocol +
          "://" +
          req.get("host") +
          req.originalUrl +
          "/" +
          req._id,
      });
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:userid", (req, res) => {
  console.log("CALL AVATAR GET REQUEST");
  const userid = req.params.userid;
  res.sendFile(process.cwd() + "/avatars/" + userid + ".png");
});

module.exports = router;
