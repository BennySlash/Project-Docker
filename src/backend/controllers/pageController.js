const Page = require("../models/page");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { query } = require("express");

exports.updatePage = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  console.log(data);

  const existingSession = await Page.find({ user: data.user });

  // console.log(existingSession.length);

  const query = { user: data.user };
  const update = {
    $set: {
      user: data.user,
      currentQuestionIndex: data.currentQuestionIndex,
      nextQuestion: data.nextQuestion,
      previousQuestion: data.previousQuestion,
      currentQuestion: data.currentQuestion,
      answer: data.answer,
      finished: data.finished,
    },
  };
  const options = { returnOriginal: false };
  console.log(existingSession.length);

  if (existingSession.length > 0) {
    console.log("update");

    const updateSession = await Page.findOneAndUpdate(query, update, options);

    res.status(201).json({
      message: "updated",
    });
  } else {
    console.log("created");
    const page = await Page.create({
      user: data.user,
      currentQuestionIndex: data.currentQuestionIndex,
      nextQuestion: data.nextQuestion,
      previousQuestion: data.previousQuestion,
      currentQuestion: data.currentQuestion,
      answer: data.answer,
      finished: data.finished,
    });
    res.status(201).json({
      message: "created",
    });
  }
});
