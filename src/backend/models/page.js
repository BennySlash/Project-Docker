const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new mongoose.Schema(
  {
    currentQuestionIndex: {
      type: String,
      required: true,
    },
    previousQuestion: {
      type: String,
      required: true,
    },

    currentQuestion: {
      type: String,
      required: true,
    },
    nextQuestion: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Page", pageSchema);
