import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const QuestionGenerator = () => {
  const location = useLocation();
  //   console.log(location.state);
  const numberOfQuestions = location.state.examQuestions;
  //   const fullQuestion = {
  //     question: "",
  //     optionA: "",
  //     optionB: "",
  //     optionC: "",
  //     optionD: "",
  //     answer: "",
  //   };
  const formsArray = Array.from(
    { length: numberOfQuestions },
    (_, index) => index + 1
  );
  //   console.log(formsArray);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const activeRef = useRef([]);

  const finishExam = async () => {
    await axios
      .post("api/submit-exam", {
        questionsArray: questionsArray,
        title: location.state.examName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    activeRef.current = [...activeRef.current, Number(event.target.id)];
    // console.log(activeRef.current);

    setQuestionsArray((prevState) => [
      ...prevState,
      {
        question: question,
        optionA: optionA,
        optionB: optionB,
        optionC: optionC,
        optionD: optionD,
        answer: answer,
      },
    ]);
  };
  //   console.log(questionsArray);

  const handleChange = (e) => {
    const firstPart = e.target.id.split("-")[0];
    // console.log(firstPart);x
    switch (firstPart) {
      case "input":
        setQuestion(e.target.value);
        // console.log(question);
        break;
      case "optionA":
        setOptionA(e.target.value);
        // console.log(optionA);
        break;
      case "optionB":
        setOptionB(e.target.value);
        // console.log(optionB);

        break;
      case "optionC":
        setOptionC(e.target.value);
        // console.log(optionC);

        break;
      case "optionD":
        setOptionD(e.target.value);
        // console.log(optionD);
        break;
      case "answer":
        setAnswer(e.target.value);
        // console.log(answer);
        break;
      default:
        break;
    }
  };
  const displayQuestions = (
    <div>
      {formsArray.map((item) => {
        return (
          <div className={`mx-auto max-w-xl mt-20 border p-5`} key={item}>
            {activeRef.current.includes(item) && (
              <div className="mx-auto flex flex-col text-white gap-y-5 items-center h-12 w-12 rounded-full bg-green-500 p-4">
                <svg
                  xmlns="g"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="5"
                  stroke="currentColor"
                  className="h-8 w-8 text-white font-bold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            )}
            {activeRef.current.includes(item) && (
              <h5 className="mb-10 text-green-400 font-bold text-center">
                Submitted
              </h5>
            )}
            <form
              className={`${
                activeRef.current.includes(item) &&
                "opacity-50 pointer-events-none"
              }`}
              onSubmit={handleSubmit}
              id={`${item}`}
            >
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor={`input-${item}`}
              >
                {`Question#${item}`}
              </label>
              <input
                onChange={handleChange}
                // value={question}
                id={`input-${item}`}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor={`optionA-${item}`}
              >
                optionA:
              </label>
              <input
                onChange={handleChange}
                // value={optionA}
                id={`optionA-${item}`}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor={`optionB-${item}`}
              >
                optionB:
              </label>
              <input
                onChange={handleChange}
                // value={optionB}
                id={`optionB-${item}`}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor={`optionC-${item}`}
              >
                optionC:
              </label>
              <input
                onChange={handleChange}
                // value={optionC}
                id={`optionC-${item}`}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor={`optionD-${item}`}
              >
                optionD:
              </label>
              <input
                onChange={handleChange}
                // value={optionD}
                id={`optionD-${item}`}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor={`answer-${item}`}
              >
                answer:
              </label>
              <input
                onChange={handleChange}
                // value={answer}
                id={`answer-{item}`}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-5 font-extrabold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  submit
                </button>
                {activeRef.current.includes(item) && (
                  <button
                    type="submit"
                    className="mt-5 font-extrabold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
            <div className="flex justify-center font-bold ">{`-${item}-`}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="py-10 mb-20">
      {displayQuestions}
      <button
        onClick={finishExam}
        className="flex text-xl mx-auto mt-10 font-extrabold focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-4 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
      >
        Finish Exam
      </button>
    </div>
  );
};

export default QuestionGenerator;
