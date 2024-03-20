const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    required: false,
  },
});
module.exports = mongoose.model("Employee", employeeSchema);
