const { Completed } = require("../models/completed");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.completedUser = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  //   console.log(req.body);
  const user = await Completed.create({
    user: data.user,
  });
});
