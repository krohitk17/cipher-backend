const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const profileRoute = require("./routes/profile");
const avatarRoute = require("./routes/avatar");
const loginRoute = require("./routes/login");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/profile", profileRoute);
app.use("/login", loginRoute);
app.use("/avatar", avatarRoute);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

app.get("/", (req, res) => {
  res.status(200).json("API is working");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
