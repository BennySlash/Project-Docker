const Employee = require("../models/employee");
const { isValidEmail, isValidText } = require("../util/validation");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../util/errorhandler");
const { createJSONToken, isValidPassword } = require("../util/auth");

// Create an employee with Email and Name => /api/signup
exports.createEmployee = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const existingEmail = await Employee.find({ email: req.body.email });

  if (!isValidEmail(data.email)) {
    console.log("invalid Email");
    return next(new ErrorHandler("Invalid Email.", 401));
    // res.status(401).json({
    //   sucess: false,
    //   message: "Invalid Email",
    // });
  } else if (existingEmail.length !== 0) {
    console.log("Email aleady exists");
    return next(new ErrorHandler("Email already exists.", 401));
    // res.status(401).json({
    //   sucess: false,
    //   text: "Email/User aleady exists",
    // });
  } else {
    const employee = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      date: new Date(),
    });

    res.status(201).json({
      success: true,
      employee,
    });
  }
});

exports.loginEmployee = catchAsyncErrors(async (req, res, next) => {
  const employeeisRegistered = await Employee.find({ email: req.body.typed });
  // console.log({ employeeisRegistered });
  if (employeeisRegistered.length !== 0) {
    const authToken = createJSONToken(req.body.typed);
    res.status(201).json({
      message: "User Logedin.",
      user: employeeisRegistered[0].name,
      token: authToken,
      // currentQuestion: employeeisRegistered[0].currentQuestion,
      // previousQuestion: employeeisRegistered[0].previousQuestion,
      // nextQuestion: employeeisRegistered[0].nextQuestion,
      // currentQuestionIndex: employeeisRegistered[0].currentQuestionIndex,
    });
  } else {
    res.status(401).json({
      message: "please register first",
    });
  }
});
