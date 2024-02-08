import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import adminEmails from "../../utils/admin";
import M from "materialize-css";

const AdminConsole = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const adminPass = "quiz@Admin";
  const [password, setPassword] = useState("");

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleEmail = (event) => {
    setAdminEmail(event.target.value);
  };
  const validate = (event) => {
    event.preventDefault();
    const isAdminUser = adminEmails.includes(adminEmail);
    if (adminPass === password && isAdminUser) {
      M.toast({
        html: "Welcome",
        classes: "toast-valid",
        displayLength: "2600",
        inDuration: "800",
        outDuration: "800",
      });
      navigate("/admin-console");
    } else {
      M.toast({
        html: "Invalid Username or Password",
        classes: "toast-invalid",
        displayLength: "2600",
        inDuration: "800",
        outDuration: "800",
      });

      setTimeout(() => {
        navigate(0);
      }, 650);
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-700 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome Admin
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={validate}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    onChange={handleEmail}
                    value={adminEmail}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required=""
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={handlePassword}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-50 self-center text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminConsole;
