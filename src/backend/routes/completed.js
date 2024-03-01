const express = require("express");
const { completedUser } = require("../controllers/completed");
const router = express.Router();

router.route("/api/completed").post(completedUser);

module.exports = router;
