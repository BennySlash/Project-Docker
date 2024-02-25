const express = require("express");
const { updatePage } = require("../controllers/pageController");

const router = express.Router();

router.route("/api/updatePage").post(updatePage);
module.exports = router;
