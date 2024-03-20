import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import axios from "axios";

import ParticlesBg from "./particles";

const Home = () => {
  const [email, setEmail] = useState("");
  const [employeeEmails, setEmployeeEmails] = useState("");
  const navigate = useNavigate();

  const onLoad = async (event) => {
    await axios
      .get("http://localhost:4000/api/users")
      .then((res) => {
        // console.log(res.data);
        setEmployeeEmails(res.data);
        //   console.log(employeeEmails);
        //   console.log(email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setPath();
  }
  function handleChange(event) {
    setEmail(event.target.value);
    // console.log(event.target.value);
  }
  function setPath() {
    const isPresent = employeeEmails.includes(email);
    // console.log(isPresent);
    // console.log(typeof email);
    const firstNameSmall = email.split(".")[0];
    // console.log(firstNameSmall);
    const lastNameSmall = email
      .split(".")[1]
      .substring(0, email.split(".")[1].indexOf("@"));
    // console.log(lastNameSmall);
    const firstNameCapital =
      firstNameSmall.charAt(0).toUpperCase() + firstNameSmall.slice(1);
    const lastNameCapital =
      lastNameSmall.charAt(0).toUpperCase() + lastNameSmall.slice(1);
    if (isPresent) {
      const fullName = `${firstNameCapital} ${lastNameCapital}`;
      M.toast({
        html: `Welcome ${fullName}`,
        classes: "toast-valid",
        displayLength: "2600",
        inDuration: "800",
        outDuration: "800",
      });
      navigate("/instructions", { state: { fullName: fullName } });
    } else {
      M.toast({
        html: "The Email you Entered in Invalid",
        classes: "toast-invalid",
        displayLength: 1500,
      });
    }
  }

  // const adminConsole = () => {
  //   const adminPassword = prompt("Enter Admin Password");
  //   if (adminPassword === "quiz@Admin") {
  //     M.toast({
  //       html: "Welcome Admin",
  //       classes: "toast-valid",
  //       displayLength: "2600",
  //       inDuration: "800",
  //       outDuration: "800",
  //     });
  //     navigate("/admin-console");
  //   } else if (adminPassword === null) {
  //     return redirect("/");
  //   } else if (adminPassword !== "quiz@Admin") {
  //     M.toast({
  //       html: "Incorrect Password",
  //       classes: "toast-invalid",
  //       displayLength: "2600",
  //       inDuration: "800",
  //       outDuration: "800",
  //     });
  //     return redirect("/");
  //   }
  // };
  const adminConsole = (event) => {
    event.preventDefault();
    navigate("/admin-login");
  };
  return (
    <>
      <ParticlesBg />

      <div
        id="home"
        onLoad={onLoad}
        className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700"
      >
        <section>
          <button
            onClick={adminConsole}
            data-ripple-light="true"
            data-popover-target="menu"
            className="flex self-end middle none center mr-3 rounded-lg bg-gradient-to-tr from-orange-600 to-orange-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Admin
          </button>
          {/* <ul
            role="menu"
            data-popover="menu"
            data-popover-placement="bottom"
            class="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
          >
            <li
              role="menuitem"
              class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              Menu Item 1
            </li>
            <li
              role="menuitem"
              class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              Menu Item 2
            </li>
            <li
              role="menuitem"
              class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              Menu Item 3
            </li>
          </ul>
          <div class="w-full pt-5 px-4 mb-8 mx-auto ">
            <div class="text-sm text-gray-700 py-1">
              Made with{" "}
              <a
                class="text-gray-700 font-semibold"
                href="https://www.material-tailwind.com/docs/html/menu?ref=tailwindcomponents"
                target="_blank"
              >
                Material Tailwind
              </a>{" "}
              by{" "}
              <a
                href="https://www.creative-tim.com?ref=tailwindcomponents"
                class="text-gray-700 font-semibold"
                target="_blank"
              >
                {" "}
                Creative Tim
              </a>
              .
            </div>
          </div> */}
          <div>
            <img src="./assets/img/gebeya-logo.png" alt="gebeya logo" />
          </div>
          <h1 className="text-green">Quiz App</h1>

          <div className="play-button-container">
            {/* <ul>
              <li>
                <Link className="play-button" to="/play/quiz">
                  Play
                </Link>
              </li>
            </ul> */}
          </div>
          <div className="auth-container">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your Gebeya Email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center flex items-center"
                size="30"
              ></input>

              <button
                className="bg-gradient-to-tr from-purple-600 to-purple-400 shadow-lg shadow-purple-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                id="login-button"
              >
                Login
                {/* < to={instructions}>Login</Link> */}
              </button>
              {/* <button
                  type="submit"
                  className="auth-buttons text-white"
                  id="login-button"
                >
                  Login
                </button> */}
            </form>
            {/* <Link to="/register" className="auth-buttons" id="signup-button">
              Register
            </Link> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
