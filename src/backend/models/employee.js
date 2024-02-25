const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    currentQuestionIndex: {
      type: Number,
      require: true,
    },
    score: {
      type: Number,
      require: true,
    },
    currentQuestion: {
      type: String,
      require: true,
    },
    previousQuestion: {
      type: String,
      require: true,
    },
    prev: {
      type: Number,
      require: true,
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
module.exports = mongoose.model("Employee", employeeSchema);
