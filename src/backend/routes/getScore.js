const express = require("express");
const router = express.Router();
const users = require("../utils/users");
const {
  getEmployeeScores,
  getEmployeeScoresPerUser,
  checkEmployeeScoresPerUser,
} = require("../controllers/scoreController");

router.route("/employee-Score").get(getEmployeeScores);
router.route("/employee-score-name").post(getEmployeeScoresPerUser);
router.route("/employee-score-check").post(checkEmployeeScoresPerUser);

module.exports = router;
