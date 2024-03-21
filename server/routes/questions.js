const express = require("express");
const {
  createExams,
  getExam,
  fileExam,
} = require("../controllers/questionsController");

const router = express.Router();

router.route("/submit-exam").post(createExams);
// router.route("/api/question-file").post(fileExam);
router.route("/get-exams").get(getExam);

module.exports = router;
