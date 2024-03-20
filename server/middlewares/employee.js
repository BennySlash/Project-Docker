const Employee = require("../models/employee");
const { verify } = require("jsonwebtoken");

const ErrorHandler = require("../util/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if employee is authenticated or not
exports.isAuthenticatedEmployee = catchAsyncErrors(async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  // const { token } = req.cookies;
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    // console.log({ token });
    if (!token) {
      return next(
        new ErrorHandler("Login first to access this resource.", 401)
      );
    } else {
      const decoded = verify(token, "supersecret");
      req.employee = await Employee.findOne({ email: decoded.email });
      // console.log({ employee: req.employee });
      if (!req.employee) {
        return next(new ErrorHandler("Employee not found with this ID.", 403));
      }
      next();
    }
  } catch (err) {
    const error = new ErrorHandler("Login first to access this resource", 403);
    return next(error);
  }
});

// Handling employees roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employee.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.employee.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
