const express = require("express");
const { completedUser, checkUser } = require("../controllers/completed");
const router = express.Router();

router.route("/api/completed").post(completedUser);
router.route("/api/checkUser").post(checkUser);

module.exports = router;
