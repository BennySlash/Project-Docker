import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sendDataToServer } from "../../utils/api";
import { sendDataToBackend } from "../admin/utils/api";

function QuizSummary() {
  const location = useLocation();
  const [displayCheck, setDisplayCheck] = useState(false);
  const [displayComparison, setDisplayComparison] = useState(false);
  const [comparison, setComparison] = useState("");

  const [score, setScore] = useState(
    (location.state.stats.score / location.state.stats.numberOfQuestions) * 100
  );
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    location.state.stats.numberOfQuestions
  );

  const [correctAnswers, setCorrectAnswers] = useState(
    location.state.stats.correctAnswers
  );

  const [wrongAnswers, setWrongAnswers] = useState(
    location.state.stats.wrongAnswers
  );
  const [name, setName] = useState(location.state.stats.name);
  let stats;
  let remark;
  let reaction;

  const send = async (body) => {
    const res = await sendDataToServer(body);
    setDisplayCheck(true);
  };
  const post = async (body) => {
    const res = await sendDataToBackend(body);
    const check = res.checkEmployeeScoreName;
    const lastScore = check[check.length - 2].score;
    setDisplayComparison(true);

    if (score > lastScore) {
      setComparison(
        <div className="mt-5 text-lg">
          <p>
            Your last score was {lastScore}. You have made an improvement. Keep
            it up!
          </p>
        </div>
      );
    } else if (score <= lastScore) {
      setComparison(
        <div className="mt-5 text-lg">
          <p>
            Your last score was {lastScore}. You did not improve your score.
            Keep it up!
          </p>
        </div>
      );
    }
  };
  if (score <= 30) {
    remark = "You need more practice.";
    reaction = (
      <>
        <div className="rounded-full bg-green-200 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-evenly items-center w-96 lg:w-1/3 p-3 m-3 border border-gray-300 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-red-300 w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
          <div className="text-center">
            <h2 className="text-4xl font-bold pb-2">{score.toFixed(0)}%</h2>
            <h4 className="inline text-gray-500 text-md">Very Unsatisfied</h4>
          </div>
        </div>
      </>
    );
  } else if (score > 30 && score <= 50) {
    remark = "Better luck next time.";
    reaction = (
      <>
        <div className="rounded-full bg-green-200 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-evenly items-center w-96 lg:w-1/3 p-3 m-3 border border-gray-300 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-red-300 w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
          <div className="text-center">
            <h2 className="text-4xl font-bold pb-2">{score.toFixed(0)}%</h2>
            <h4 className="inline text-gray-500 text-md">Very Unsatisfied</h4>
          </div>
        </div>
      </>
    );
  } else if (score <= 70 && score > 50) {
    remark = "You can do better.";
    reaction = (
      <div className="flex justify-evenly items-center w-96 lg:w-1/3 p-3 m-3 border border-gray-300 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-gray-400 w-20 h-20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a25.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-4xl font-bold pb-2">{score.toFixed(0)}%</h2>
          <h4 className="inline text-gray-500 text-md">Neutral</h4>
        </div>
      </div>
    );
  } else if (score >= 71 && score <= 84) {
    remark = "You did great!";
    reaction = (
      <div className="flex justify-evenly items-center w-96 lg:w-1/3 p-3 m-3 border border-gray-300 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-green-400 w-20 h-20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-4xl font-bold pb-2">{score.toFixed(0)}%</h2>
          <h4 className="inline text-gray-500 text-md">Very Satisfied</h4>
        </div>
      </div>
    );
  } else {
    remark = "That was Genius!";
    reaction = (
      <div className="flex justify-evenly items-center w-96 lg:w-1/3 p-3 m-3 border border-gray-300 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-green-400 w-20 h-20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <div className="text-center">
          <h2 className="text-4xl font-bold pb-2">{score.toFixed(0)}%</h2>
          <h4 className="inline text-gray-500 text-md">Very Satisfied</h4>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col items-center bg-slate-800 text-white sm:py-16 summary ">
        <>
          <h1>Quiz has ended</h1>

          {reaction}

          <div className="summary-container my-10 flex flex-col">
            <h4>{remark}</h4>
            <h2>Your Score: {score.toFixed(0)}%</h2>
            <span className="stat left">Total number of question: </span>
            <span className=" mx-5  stat left">{numberOfQuestions} </span>
            <br />
            <span className="stat left">Your score: </span>
            <span className=" mx-5  stat left">{score.toFixed(0)} \ 100</span>
            <br />
            <span className="stat left">Correct Answers: </span>
            <span className=" mx-5  stat left">{correctAnswers}</span>
            <br />
            <span className="stat left">Wrong Answers: </span>
            <span className=" mx-5  stat left">{wrongAnswers}</span>
          </div>
        </>
        {!displayCheck && (
          <button
            onClick={() =>
              send({ fullName: name, scorePercentage: score.toFixed(0) })
            }
            className="rounded-lg bg-blue-700 p-3 text-lg text-white font-sans text-xs font-bold uppercase text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Save Score
          </button>
        )}

        {displayCheck && (
          <button
            onClick={() => post({ fullName: name })}
            className="rounded-lg bg-blue-700 p-3 mt-5 text-lg text-white font-sans text-xs font-bold uppercase text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Check Your Progress
          </button>
        )}
        <section>
          {displayComparison && comparison}
          <ul className="m-10 flex">
            <li className="m-10">
              <Link
                to="/"
                className="rounded-lg bg-blue-700 p-3 text-lg text-white font-sans text-xs font-bold uppercase text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Back to Home
              </Link>
            </li>

            <li className="m-10">
              <Link
                to="/play-quiz"
                state={{ name: name }}
                className="rounded-lg bg-blue-700 p-3 text-lg text-white font-sans text-xs font-bold uppercase text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Take Quiz Again
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

export default QuizSummary;
