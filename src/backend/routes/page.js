const express = require("express");
const {
  updatePage,
  finishSessison,
  checkSession,
} = require("../controllers/pageController");
const { isAuthenticatedEmployee } = require("../middlewares/employee");

const router = express.Router();

router.route("/api/updatePage").post(updatePage);
// router.route("/api/finishSession").post(finishSessison);
router.route("/api/checkSession").post(checkSession);
// router.route("/api/checkSession").get(checkSession);
module.exports = router;
