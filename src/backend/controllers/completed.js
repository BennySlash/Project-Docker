const Completed = require("../models/completed");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.completedUser = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  console.log(req.body);

  const user = await Completed.create({
    name: data.user,
    exam: data.exam,
  });
  res.status(201).json({
    message: "created",
    user,
  });
});
exports.checkUser = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  // console.log(req.body);

  const user = await Completed.find({
    name: data.user,
  });
  res.status(201).json({
    message: "checked user",
    user,
  });
});
