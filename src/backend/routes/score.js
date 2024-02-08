const express = require("express");
const router = express.Router();
const { createScore } = require("../controllers/scoreController");
const users = require("../utils/users");
router.get("/api/users", (req, res) => {
  const employeeEmails = users.map(
    ({ "Email Address [Required]": email }) => email
  );

  res.send(employeeEmails);
});

router.route("/api/score").post(createScore);

module.exports = router;
