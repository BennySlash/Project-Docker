const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const scoreRouter = require("./routes/score");
const getScoreRouter = require("./routes/getScore");
const pageRouter = require("./routes/page");
const auth = require("./routes/auth");
const completedRouter = require("./routes/completed");
const questionsRoute = require("./routes/questions");
const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://biniyamayele:Testing1234@cluster0.xl8ulig.mongodb.net/";

// const dotenv = require("dotenv");
const app = express();

// dotenv.config({ path: "config/config.env" });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSucessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/", scoreRouter);
app.use("/", getScoreRouter);
app.use("/", auth);
app.use("/", pageRouter);
app.use("/", completedRouter);
app.use("/", questionsRoute);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
