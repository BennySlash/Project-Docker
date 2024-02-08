const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      require: true,
      min: [0, "Score cannot be less than 0"],
      max: [100, "Score cannot be more than 100"],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Score", scoreSchema);
