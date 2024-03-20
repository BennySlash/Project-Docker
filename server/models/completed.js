const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const completedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    exam: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Completed", completedSchema);
