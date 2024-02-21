const express = require("express");
const {
  getEmployeeList,
  createEmployee,
} = require("../controllers/employeeController");
const { isValidDate } = require("../util/validation");
// const { createJSONToken, isValidPassword } = require("../util/auth");
const { isValidEmail, isValidText } = require("../util/validation");

const router = express.Router();

// router.post("/login", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   let user;
//   try {
//     user = await get(email);
//   } catch (error) {
//     return res.status(401).json({ message: "Authentication failed." });
//   }

//   const pwIsValid = await isValidPassword(password, user.password);
//   if (!pwIsValid) {
//     return res.status(422).json({
//       message: "Invalid credentials.",
//       errors: { credentials: "Invalid email or password entered." },
//     });
//   }

//   const token = createJSONToken(email);
//   res.json({ token });
// });

router
  .route("/api/signup", async (req, res, next) => {
    // const data = req.body;
    // console.log(data);
    // if (!isValidEmail(data.email)) {
    //   console.log("invalid Email");
    // }
    // else {
    //   try {
    //     const existingUser = getEmployeeList;
    //     if (existingUser) {
    //       errors.email = "Email exists already.";
    //     }
    //   } catch (error) {}
    // }
    // try {
    //   const createdUser = await add(data);
    //   const authToken = createJSONToken(createdUser.email);
    //   res
    //     .status(201)
    //     .json({ message: "User created.", user: createdUser, token: authToken });
    // } catch (error) {
    //   next(error);
    // }
  })
  .post(createEmployee);
module.exports = router;
