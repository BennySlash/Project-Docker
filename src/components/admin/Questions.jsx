import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [examName, setExamName] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/question-generator", {
      state: { examName: examName, examQuestions: questionNumber },
    });
  };
  const handleChange = (e) => {
    switch (e.target.id) {
      case "exam":
        // console.log(e.target.value);
        setExamName(e.target.value);
        break;
      case "number":
        // console.log("number");
        setQuestionNumber(e.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="mx-auto max-w-sm mt-20">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="exam"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Exam Name
          </label>
          <input
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="exam"
            value={examName}
            required
          />
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Number of Questions
          </label>
          <input
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            id="number"
            value={questionNumber}
            required
          />

          <button
            type="submit"
            className="font-extrabold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
};

export default Questions;
