const express = require("express");
const {
  loginEmployee,
  createEmployee,
} = require("../controllers/employeeController");
const { isValidDate } = require("../util/validation");
// const { createJSONToken, isValidPassword } = require("../util/auth");
const { isValidEmail, isValidText } = require("../util/validation");

const router = express.Router();

router.route("/api/signup").post(createEmployee);
router.route("/api/login").post(loginEmployee);
module.exports = router;
