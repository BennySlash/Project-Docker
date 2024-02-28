const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new mongoose.Schema(
  {
    currentQuestionIndex: {
      type: Number,
      required: true,
      default: 0,
    },
    // previousQuestion: {
    //   type: Object,
    //   required: true,
    //   default: "",
    // },

    // currentQuestion: {
    //   type: Object,
    //   required: true,
    //   default: "",
    // },
    // nextQuestion: {
    //   type: Object,
    //   required: true,
    //   default: "",
    // },
    // answer: {
    //   type: String,
    //   required: true,
    //   default: "",
    // },
    takenRef: {
      type: Array,
      required: true,
      default: [],
    },
    skippedRef: {
      type: Object,
      required: true,
      default: [],
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: String,
      required: true,
      default: "",
    },
    finished: {
      type: Boolean,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Page", pageSchema);
