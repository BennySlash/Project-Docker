const Employee = require("../models/employee");
const { isValidEmail, isValidText } = require("../util/validation");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create an employee with Email and Name => /api/signup
exports.createEmployee = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const existingEmail = await Employee.find({ email: req.body.email });
  console.log(existingEmail.length);

  if (!isValidEmail(data.email)) {
    console.log("invalid Email");
  } else if (existingEmail.length !== 0) {
    console.log("Email aleady exists");
  } else {
    const employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      date: new Date(),
    });

    res.status(201).json({
      success: true,
      employee,
    });
  }
});

exports.getEmployeeList = catchAsyncErrors(async (req, res, next) => {
  const employeeList = await Employee.find({ email: req.body.email });

  res.status(200).json({
    success: true,
    data: employeeList,
  });
});
