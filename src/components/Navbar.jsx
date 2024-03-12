import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ linksArray }) => {
  const { user } = useAuth();

  const [displayAdminConsole, setDisplayAdminConsole] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin-console");
  };

  (async function () {
    await axios
      .post("http://localhost:4000/api/login", {
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

  return (
    <div className="flex flex-row-reverse gap-x-20">
      {displayAdminConsole && (
        <button
          onClick={handleClick}
          className="h-auto text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-5"
        >
          AdminConsole
        </button>
      )}
      <nav className="nav flex rounded-lg mt-5 px-3 ">
        <div className="max-w-screen-xl flex flex-wrap justify-start content-center items-center justify-between mx-auto p-4">
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
    </div>
  );
};

export default Navbar;
