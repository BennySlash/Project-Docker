import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home2 = () => {
  const onsubmit = async (email, name) => {
    await axios.post("http://localhost:4000/api/signup", { email, name });
  };

  return (
    <div className="flex bg-gray-900">
      <div className="min-w-max flex flex-col items-center min-h-full flex-col justify-center  px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src="./assets/img/gebeya_inc_logo.png"
            alt="gebeya logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to QuizGebeya
          </h2>
        </div>
        <div className="m-8">
          <form className="flex flex-col items-center">
            <input
              type="email"
              value=""
              onChange=""
              placeholder="Enter your Gebeya Email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center flex items-center"
              size="30"
            ></input>
            <button class="w-6/12 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
              // console.log(email, name);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
      <div className="flex items-center text-white">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          explicabo alias repellendus corporis consequuntur, tenetur inventore
          numquam expedita praesentium molestiae non? Qui pariatur tenetur in
          fugit eligendi dolorum dolores temporibus.
        </p>
      </div>
    </div>
  );
};

export default Home2;
