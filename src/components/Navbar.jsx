import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ linksArray }) => {
  const { user } = useAuth();
  const [expandNav, setExpandNav] = useState(false);

  const [displayAdminConsole, setDisplayAdminConsole] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin-console");
  };

  (async function () {
    await axios
      .post("https://192.168.5.61:4000/api/login", {
        email: user.email,
      })
      .then((res) => {
        if (res.data.activeEmployee[0].admin === true) {
          setDisplayAdminConsole(true);
        } else {
          setDisplayAdminConsole(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  })();

  const expandedNavbar = (
    <div className="w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col gap-y-2 justify-center md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Pricing
          </a>
        </li>
        <li>
          <Link
            to="/history"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            state={{ name: user, linkOptionsArray: linksArray }}
          >
            History
          </Link>
        </li>
      </ul>
    </div>
  );
  const navbar = (
    <nav className="hamburger mt-5 border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-xl dark:border-gray-700">
      <div
        onClick={() => {
          setExpandNav((prevState) => !prevState);
        }}
        className="max-w-max flex flex-wrap items-center justify-between mx-auto p-3 px-0"
      >
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="w-auto inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="https://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );

  return (
    <div className="flex flex-row-reverse gap-x-20 ">
      {displayAdminConsole && (
        <div className="h-auto">
          <button
            onClick={handleClick}
            className="grow-0 text-center bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-5 rounded-md mt-5"
          >
            Admin Console
          </button>
        </div>
      )}

      <nav className="big-nav nav flex rounded-lg mt-5 px-3 text-white">
        <div className=" max-w-screen-xl flex flex-wrap justify-start content-center items-center justify-between mx-auto p-4">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="links font-medium flex flex-col gap-x-10 p-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Instruction
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link
                  to="/history"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  state={{ name: user, linkOptionsArray: linksArray }}
                >
                  History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {navbar}
      {expandNav && expandedNavbar}
    </div>
  );
};

export default Navbar;
