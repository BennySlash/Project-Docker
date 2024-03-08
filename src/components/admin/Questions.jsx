import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Questions = () => {
  const [examName, setExamName] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [fileContent, setFileContent] = useState("");

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

  const handleFileChange = (event) => {
    // console.log(e.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    console.log(reader.result);
    reader.onLoad = (e) => {
      setFile(e.target.result);
      console.log(e.target.result);
    };
    reader.onerror = (e) => {
      console.log("file error", reader.error);
    };
    // reader.readAsText(file);
  };
  // Read file content to ArrayBuffer
  /------------------------hanna-----------------------------/;

  // const readFileToArrayBuffer = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     // Register callback function when file reading is complete
  //     reader.onload = function (event) {
  //       const arrayBuffer = event.target.result;
  //       resolve(arrayBuffer);
  //     };
  //     // Read file content to ArrayBuffer
  //     reader.readAsArrayBuffer(file);
  //   });
  // };
  // // Convert ArrayBuffer to hexadecimal string
  // const arrayBufferToHexString = (arrayBuffer) => {
  //   const uint8Array = new Uint8Array(arrayBuffer);
  //   let hexString = "";
  //   for (let i = 0; i < uint8Array.length; i++) {
  //     const hex = uint8Array[i].toString(16).padStart(2, "0");
  //     hexString += hex;
  //   }
  //   return hexString;
  // };
  // // Handle file select event
  // function handleFileChange(event) {
  //   const file = event.target.files[0]; // Get selected file
  //   if (file) {
  //     readFileToArrayBuffer(file)
  //       .then((arrayBuffer) => {
  //         const hexString = arrayBufferToHexString(arrayBuffer);
  //         setFileContent(hexString);
  //       })
  //       .catch((error) => {
  //         console.error("File read failed:", error);
  //       });
  //   } else {
  //     setFileContent("Please select a file");
  //   }
  // }
  /------------------------hanna-----------------------------/;

  const handleTextArea = () => {};
  const handleFileSubmit = async () => {
    await axios
      .post("http://localhost:4000/api/question-file", { blob: fileContent })

      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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

        {/* <form onSubmit={handleFileSubmit} className="mt-20">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-black text-xl"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              onChange={handleFileChange}
              className="py-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>

          <button
            type="submit"
            className="mt-10 font-extrabold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Upload
          </button>
        </form> */}

        <form onSubmit={handleTextArea} className="mt-20">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="paste text here...."
          ></textarea>
        </form>
        {/* 
        <div>
          <h4>File content:</h4>
          <pre>{file}</pre>
        </div> */}
      </div>
    </>
  );
};

export default Questions;
