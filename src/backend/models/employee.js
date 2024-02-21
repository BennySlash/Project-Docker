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
