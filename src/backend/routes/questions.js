const express = require("express");
const {
  createExams,
  getExam,
  fileExam,
} = require("../controllers/questionsController");

const router = express.Router();

router.route("/api/submit-exam").post(createExams);
router.route("/api/question-file").post(fileExam);
router.route("/api/get-exams").get(getExam);

module.exports = router;
