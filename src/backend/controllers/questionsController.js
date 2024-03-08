const Question = require("../models/questions");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createExams = catchAsyncErrors(async (req, res, next) => {
  //   console.log(req.body);
  const data = req.body;

  const exam = await Question.create({
    title: data.title,
    questionsArray: data.questionsArray,
  });
});

exports.getExam = catchAsyncErrors(async (req, res, next) => {
  //   console.log(req.body);

  const exam = await Question.find({});
  res.status(201).json({
    message: "questio title retrieved",
    exam,
  });
});

exports.fileExam = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body.blob);
});
