const express = require("express");
const router = express.Router();
const multer = require("multer");

const verifyToken = require("../middlewares/verifyToken");
const updateUser = require("../controllers/updateUser");
const { NotFoundError } = require("../errors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatars/");
  },
  filename: function (req, file, cb) {
    const filename = `${req._id}.png`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/", verifyToken, upload.single("avatar"), (req, res) => {
  console.log("CALL AVATAR POST REQUEST");
  updateUser(req.email, {
    avatar:
      req.protocol +
      "://" +
      req.get("host") +
      req.originalUrl +
      req.file.filename,
  });
  res.status(200).json({
    success: true,
  });
});

router.get("/:userid", verifyToken, (req, res, next) => {
  console.log("CALL AVATAR GET REQUEST");
  const userid = req.params.userid;
  res.sendFile(process.cwd() + "/avatars/" + userid + ".png");
  console.log(res);
  if (res.statusCode === 404) {
    const err = new NotFoundError("Image Not Found");
    next(err);
  }
  next();
});

module.exports = router;
