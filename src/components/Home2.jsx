import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { useAuth } from "../context/AuthContext";
import { auth, provider, signInWithGoogle } from "../Firebase";
import { signInWithPopup } from "firebase/auth";

const Home2 = () => {
  // const [typed, setTyped] = useState("");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const { login } = useAuth();

  // const onsubmit = async (email, name) => {
  //   // console.log(email);
  //   const res = await axios.post("http://localhost:4000/api/signup", {
  //     email,
  //     name,
  //   });
  // };

  // const handleChange = (event) => {
  //   setTyped(event.target.value);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const res = await axios
  //     .post("http://localhost:4000/api/login", {
  //       typed,
  //     })
  //     .then((res) => {
  //       const fullName = res.data.user;
  //       // console.log(res);

  //       login(res.data.token, res.data.user);
  //       M.toast({
  //         html: `Welcome ${fullName}`,
  //         classes: "toast-valid",
  //         displayLength: "2600",
  //         inDuration: "800",
  //         outDuration: "800",
  //       });
  //       navigate("/instructions", { state: { fullName: fullName } });
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       M.toast({
  //         html: `Please Register First`,
  //         classes: "toast-invalid",
  //         displayLength: "2600",
  //         inDuration: "800",
  //         outDuration: "800",
  //       });
  //     });
  //   // console.log(registerFirst);
  // };

  const getAuthData = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = {
          user: result?.user?.displayName,
          email: result?.user?.email,
        };
        setFullName(result.user.displayName);
        setEmail(result.user.email);

        (async function () {
          await axios
            .post("http://localhost:4000/api/login", {
              email: result.user.email,
            })
            .then((res) => {
              console.log(res);
              if (res.data.activeEmployee.length === 0) {
                M.toast({
                  html: "please Sign In using your Gebeya Email",
                  classes: "toast-invalid",
                  displayLength: "2600",
                  inDuration: "800",
                  outDuration: "800",
                });
              } else {
                const token = result?._tokenResponse?.oauthAccessToken;
                login(token, user);
                M.toast({
                  html: `Welcome ${fullName}`,
                  classes: "toast-valid",
                  displayLength: "2600",
                  inDuration: "800",
                  outDuration: "800",
                });
              }
            })
            .catch((err) => console.log(err));
        })();
      })
      .catch((err) => {
        console.log(err);
      });
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
            <h4 className="mt-10 text-center text-lg font-bold leading-9 tracking-tight text-white">
              use your gebeya email
            </h4>
          </div>
          <div className="m-8">
            <form
              // onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              {/* <input
                name="email"
                type="email"
                value={typed}
                onChange={handleChange}
                placeholder="Enter your Gebeya Email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center flex items-center"
                size="30"
              ></input> */}
            </form>
            <div>
              <button
                onClick={getAuthData}
                type="submit"
                className="text-lg leading-6 mt-4 bg-gradient-to-tr from-purple-700 to-yellow-700  text-white font-bold py-5 px-10 rounded transition-all hover:shadow-lg hover:shadow-orange-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Sign In With Google
              </button>
            </div>
          </div>
          {/* <div>
            <h4 className="text-center text-white mb-10x">
              Register First <br />
              <span className="text-base">using Gebeya Email</span>
            </h4>
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
          </div> */}
        </div>
        <div className="africa w-3/5 flex flex-col gap-y-10 text-white items-center justify-center">
          <div className="">
            <h1 className="h-fit self-start">
              <span>
                Welcome to Gebeya
                <br /> Quiz App
              </span>
            </h1>
          </div>

          <div className="px-5 leading-10 text-lg">
            "Welcome to our Educational Quiz Web App! Expand your knowledge and
            have fun while learning with our engaging quizzes. Whether you're a
            student looking to test your understanding or a curious individual
            seeking to broaden your knowledge, our platform offers a wide range
            of educational quizzes to cater to your interests. Our quizzes cover
            various subjects, including math, science, history, literature, and
            more. Challenge yourself with thought-provoking questions and
            discover fascinating facts along the way. Each quiz is carefully
            crafted to provide an enriching learning experience. To make the
            most of your quiz-taking experience, we recommend ensuring a good
            internet connection. A stable connection will ensure seamless
            navigation through the app and allow you to view questions and
            submit answers without interruptions. So, get ready to embark on an
            exciting journey of knowledge exploration. Start taking quizzes
            today and enhance your understanding in a fun and interactive way.
            Happy quizzing!"
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2;
