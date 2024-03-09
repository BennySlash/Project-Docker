import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

const History = () => {
  const [displayExam, setDisplayExam] = useState([]);
  const [examLength, setExamLength] = useState();
  const [examPage, setExamPage] = useState();
  const [completedLength, setCompletedLength] = useState();
  const [display, setDisplay] = useState(false);
  const [title, setTitle] = useState("");
  const [linkOptionsArray, setLinkOptionsArray] = useState([]);
  const location = useLocation();
  const user = location.state.name;

  const historyArray = Array.from({ length: examLength }, (_, index) => index);
  const handleClick = () => {
    setDisplay(true);
    // console.log(displayExam);

    setExamPage(
      <div className="flex flex-col items-center justify-center border">
        {historyArray.map((x) => {
          return (
            <div key={x}>
              <div>
                <h2 className="flex gap-x-10 py-2.5 px-5 me-2 mb-2 text-xl font-medium text-gray-900 bg-slate-700 rounded-lg border border-gray-200">
                  <span>{`#${x + 1}`}</span>
                  {displayExam[0].questionsArray[x].question}
                </h2>
              </div>
              <div className="flex flex-col">
                <div className="border px-1">
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      A
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {displayExam[0].questionsArray[x].optionA}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      B
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {displayExam[0].questionsArray[x].optionB}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      C
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {displayExam[0].questionsArray[x].optionC}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      D
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {displayExam[0].questionsArray[x].optionD}
                    </h4>
                  </div>
                </div>
                <div className="flex gap-x-5 justify-start items-center">
                  <h6>Answer</h6>

                  <h4 className="rounded-sm bg-green-700 p-3 text-sm text-white text-center">
                    {displayExam[0].questionsArray[x].answer}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getExamTitle = async () => {
    await axios
      .post("http://localhost:4000/api/checkUser", { user: user })
      .then((res) => {
        // console.log(completedLength);
        setCompletedLength(res.data.user.length);
        const linksArray = Array.from(
          { length: completedLength },
          (_, index) => index
        );

        const linksOption = linksArray.map((x) => {
          return {
            label: res.data.user[x].exam,
            value: res.data.user[x].exam,
          };
        });
        setLinkOptionsArray(linksOption);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getExam = async () => {
      await axios
        .get("http://localhost:4000/api/get-exams")
        .then((res) => {
          const exams = res.data.exam;
          const exam = exams.find((obj) => obj.title === title);
          // console.log(exams);
          setDisplayExam([exam]);
          setExamLength(exam.questionsArray.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getExam();
    getExamTitle();
  }, [title, linkOptionsArray]);
  return (
    <div className="flex p-10 h-full gap-x-20">
      <div className="flex  flex-col gap-y-10 w-max h-min">
        <button
          onClick={handleClick}
          type="button"
          className="py-2.5 px-5 me-2 h-auto mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          getExams
        </button>
        <Select
          isClearable
          // components={{ Control: ControlComponent }}
          isSearchable
          name="color"
          onChange={(res) => {
            setTitle(res.label);
          }}
          options={linkOptionsArray}
        />
      </div>
      <div className="w-70">{display && examPage}</div>
    </div>
  );
};

export default History;
