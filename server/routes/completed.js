const express = require("express");
const { completedUser, checkUser } = require("../controllers/completed");
const router = express.Router();

router.route("/completed").post(completedUser);
router.route("/checkUser").post(checkUser);

module.exports = router;
