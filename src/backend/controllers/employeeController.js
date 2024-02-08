const Employee = require("../models/employee");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Get all employees => /api/employees
exports.getEmployees = catchAsyncErrors(async (req, res, next) => {
  // without pagination
  const employees = await Employee.find();

  res.status(200).json({
    success: true,
    data: employees,
    count: employees.length,
  });
});

// Create an employee => /api/employees
exports.createScore = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.create({
    name: req.body.name,
    score: req.body.score,
    date: new Date(),
  });

  res.status(201).json({
    success: true,
    employee,
  });
});
