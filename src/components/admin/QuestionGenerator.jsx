import { useState } from "react";
import { useLocation } from "react-router-dom";

const QuestionGenerator = () => {
  const location = useLocation();
  //   console.log(location.state);
  const numberOfQuestions = location.state.examQuestions;
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
  const hadleSubmit = (event) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    switch (e.target.id) {
      case "question":
        setQuestion(e.target.value);
        // console.log(question);
        break;
      case "a":
        setOptionA(e.target.value);
        // console.log(optionA);
        break;
      case "b":
        setOptionB(e.target.value);
        // console.log(optionB);

        break;
      case "c":
        setOptionC(e.target.value);
        // console.log(optionC);

        break;
      case "d":
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
          <div className="mx-auto max-w-xl mt-20 border p-5" key={item}>
            <form onSubmit={hadleSubmit}>
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor="question"
              >
                {`Question#${item}`}
              </label>
              <input
                onChange={handleChange}
                value={question}
                id="question"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor="a"
              >
                optionA:
              </label>
              <input
                onChange={handleChange}
                value={optionA}
                id="a"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor="b"
              >
                optionB:
              </label>
              <input
                onChange={handleChange}
                value={optionB}
                id="b"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor="c"
              >
                optionC:
              </label>
              <input
                onChange={handleChange}
                value={optionC}
                id="c"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor="d"
              >
                optionD:
              </label>
              <input
                onChange={handleChange}
                value={optionD}
                id="d"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-black"
                htmlFor="answer"
              >
                answer:
              </label>
              <input
                onChange={handleChange}
                value={answer}
                id="answer"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              <button
                type="submit"
                className="mt-5  font-extrabold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                submit
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );

  return <div>{displayQuestions}</div>;
};

export default QuestionGenerator;
