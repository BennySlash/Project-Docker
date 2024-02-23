import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { useAuth } from "../context/AuthContext";

const Home2 = () => {
  const [typed, setTyped] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onsubmit = async (email, name) => {
    const res = await axios.post("http://localhost:4000/api/signup", {
      email,
      name,
    });
  };

  const handleChange = (event) => {
    setTyped(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:4000/api/login", {
      typed,
    });
    console.log(res);
    const fullName = res.data.user;
    login(res.data.token, res.data.user);
    M.toast({
      html: `Welcome ${fullName}`,
      classes: "toast-valid",
      displayLength: "2600",
      inDuration: "800",
      outDuration: "800",
    });
    navigate("/instructions", { state: { fullName: fullName } });
  };

  return (
    <div className="landing h-full w-full">
      <div className="landing h-full w-full flex justify-around">
        <div className="min-w-max flex flex-col items-center min-h-full flex-col justify-center px-0 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-40 w-auto"
              src="./assets/img/gebeya_inc_logo.png"
              alt="gebeya logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Login to QuizGebeya
            </h2>
          </div>
          <div className="m-8">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="email"
                value={typed}
                onChange={handleChange}
                placeholder="Enter your Gebeya Email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center flex items-center"
                size="30"
              ></input>
              <button
                type="submit"
                className="w-6/12 mt-4 bg-gradient-to-tr from-purple-700 to-yellow-700  text-white font-bold py-2 px-4 rounded transition-all hover:shadow-lg hover:shadow-orange-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Login
              </button>
            </form>
          </div>
          <div>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decode = jwtDecode(credentialResponse.credential);
                const { email, name } = decode;
                onsubmit(email, name);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
        <div className="africa w-3/5 flex text-white items-center justify-center">
          <h1 className="h-fit self-start">
            <span>
              Welcome to Gebeya
              <br /> Quiz App
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home2;
