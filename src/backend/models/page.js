const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new mongoose.Schema(
  {
    currentQuestionIndex: {
      type: Number,
      required: true,
    },
    previousQuestion: {
      type: Object,
      required: false,
    },

    currentQuestion: {
      type: Object,
      required: true,
    },
    nextQuestion: {
      type: Object,
      required: false,
    },
    answer: {
      type: String,
      required: false,
    },
    user: {
      type: String,
      required: false,
    },
    finished: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Page", pageSchema);
