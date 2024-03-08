const Question = require("../models/questions");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createExams = catchAsyncErrors(async (req, res, next) => {
  //   console.log(req.body);
  const data = req.body;

  const exam = await Question.create({
    title: data.title,
    questionsArray: data.questionsArray,
  });
  res.status(201).json({
    message: "exam Created",
    exam,
  });
});

exports.getExam = catchAsyncErrors(async (req, res, next) => {
  //   console.log(req.body);

  const exam = await Question.find({});
  res.status(201).json({
    message: "question title retrieved",
    exam,
  });
});

exports.fileExam = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body.blob);
});
