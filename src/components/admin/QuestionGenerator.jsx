import { useState } from "react";
import { useLocation } from "react-router-dom";

const QuestionGenerator = () => {
  const location = useLocation();
  //   console.log(location.state);
  const numberOfQuestions = location.state.examQuestions;
  const fullQuestion = {
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  };
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
  //   console.log({ question, optionA, optionB, optionC, optionD });

  const hadleSubmit = (event) => {
    event.preventDefault();

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
  console.log(questionsArray);

  const handleChange = (e) => {
    const firstPart = e.target.id.split("-")[0];
    console.log(firstPart);
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
          <div className="mx-auto max-w-xl mt-20 border p-5" key={item}>
            <form onSubmit={hadleSubmit}>
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

              <button
                type="submit"
                className="mt-5 font-extrabold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                submit
              </button>
            </form>
            <div className="flex justify-center">{`-${item}-`}</div>
          </div>
        );
      })}
    </div>
  );

  return <div>{displayQuestions}</div>;
};

export default QuestionGenerator;
