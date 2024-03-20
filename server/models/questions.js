const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 0,
    },

    questionsArray: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Question", questionsSchema);
