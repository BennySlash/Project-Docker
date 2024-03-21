const express = require("express");
const {
  updatePage,
  checkSession,
  endSession,
} = require("../controllers/pageController");
const { isAuthenticatedEmployee } = require("../middlewares/employee");

const router = express.Router();

router.route("/updatePage").post(updatePage);
// router.route("/api/finishSession").post(finishSessison);
router.route("/checkSession").post(checkSession);
// router.route("/api/checkSession").post(isAuthenticatedEmployee, checkSession);
// router.route("/api/checkSession").get(checkSession);
router.route("/endSession").post(endSession);

module.exports = router;
