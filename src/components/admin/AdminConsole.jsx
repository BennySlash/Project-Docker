import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";

import SearchResult from "./SearchResult";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Table from "./Table";

const AdminConsole = () => {
  const [users, setUsers] = useState("");
  const [employeeScore, setEmployeeScore] = useState("");
  const [examArray, setExamArray] = useState();
  const [linkOptionsArray, setLinkOptionsArray] = useState([]);
  const [title, setTitle] = useState("");
  const [examLength, setExamLength] = useState();
  const [questionLength, setQuestionLength] = useState();
  const [examPage, setExamPage] = useState();
  const [examDisplay, setDisplayExam] = useState(false);
  const [displayEmployeeList, setDisplayEmployeeList] = useState(false);
  const [dislayScores, setDisplayScores] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState("");
  const [displayResults, setDisplayResults] = useState(false);
  const [displayExamsTable, setDisplayExamsTable] = useState(false);
  const { logout } = useAuth();

  const retrieveEmailList = async () => {
    await axios
      .get("http://localhost:4000/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getExams = async () => {
    setDisplayExamsTable(true);

    await axios
      .get("http://localhost:4000/api/get-exams")
      .then((res) => {
        // console.log(res.data.exam.length);
        setExamLength(res.data.exam.length);
        console.log(res.data.exam);
        const linksArray = Array.from(
          { length: res.data.exam.length },
          (_, index) => index
        );
        const linkOptions = linksArray.map((x) => {
          return {
            label: res.data.exam[x].title,
            value: res.data.exam[x].title,
          };
        });
        setLinkOptionsArray(linkOptions);
        const exams = res.data.exam;
        const exam = exams.find((obj) => obj.title === title);
        setExamArray([exam]);
        setQuestionLength(exam.questionsArray.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = () => {
    setDisplayEmployeeList(false);
    setDisplayExam(true);
    const examsArray = Array.from(
      { length: questionLength },
      (_, index) => index
    );

    setExamPage(
      <div className="flex flex-col items-center justify-center border">
        {examsArray.map((x) => {
          return (
            <div key={x}>
              <div>
                <h2 className="flex gap-x-10 py-2.5 px-5 me-2 mb-2 text-xl font-medium text-gray-900 bg-slate-700 rounded-lg border border-gray-200">
                  <span>{`#${x + 1}`}</span>
                  {examArray[0].questionsArray[x].question}
                </h2>
              </div>
              <div className="flex flex-col">
                <div className="border px-1">
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      A
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {examArray[0].questionsArray[x].optionA}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      B
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {examArray[0].questionsArray[x].optionB}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      C
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {examArray[0].questionsArray[x].optionC}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      D
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {examArray[0].questionsArray[x].optionD}
                    </h4>
                  </div>
                </div>
                <div className="flex gap-x-5 justify-start items-center">
                  <h6>Answer</h6>

                  <h4 className="rounded-sm bg-green-700 p-3 text-sm text-white text-center">
                    {examArray[0].questionsArray[x].answer}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    retrieveEmailList();
    getExams();
  }, [title]);
  const getEmployeeList = () => {
    setDisplayExam(false);
    setDisplayEmployeeList(true);
  };

  const getQuizScores = async () => {
    await axios
      .get("http://localhost:4000/employee-score")
      .then((res) => {
        setEmployeeScore(res.data);

        // console.log(employeeScore.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDisplayScores(true);
  };

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000/employee-score")
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    // fetchData();

    setInput(event.target.value);
    setDisplayResults(true);
  };
  const handleInputClick = () => {
    fetchData();
  };
  return (
    // <>
    //   <div className="flex justify-around items-center">
    //     <div className="flex items-center justify-around">
    //       <button
    //         onClick={getEmployeeList}
    //         className="m-10 p-6 flex self-end middle none center mr-3 rounded-lg bg-gradient-to-tr from-orange-600 to-orange-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    //       >
    //         Get Employee List
    //       </button>
    //       <button
    //         onClick={getQuizScores}
    //         className="m-10 p-6 flex self-end middle none center mr-3 rounded-lg bg-gradient-to-tr from-orange-600 to-orange-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    //       >
    //         Get All Employee Quiz Scores
    //       </button>
    //     </div>

    //     <button
    //       onClick={() => {
    //         if (window.confirm("Are you sure you want to Quit?")) {
    //           navigate("/");
    //         }
    //       }}
    //       className="direction-key rounded-sm bg-red-700 p-3 text-sm text-white"
    //     >
    //       Quit
    //     </button>
    //   </div>

    //   {displayEmployeeList && <Table data={users} column={0} />}
    //   {dislayScores && <Table data={employeeScore.data} column={1} />}
    //   {displayResults && <SearchResult list={results.data} />}
    // </>

    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className={`${displayExamsTable && "pointer-events-none"}`}>
              <button
                onClick={getExams}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <span className="ms-3">Get Exams</span>
              </button>
            </li>
            <li>
              <button
                onClick={getEmployeeList}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </button>
            </li>
            <li>
              <Link
                to="/questions"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Make Exams
                </span>
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
            <li>
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                  <input
                    onClick={handleInputClick}
                    onChange={handleChange}
                    type="search"
                    id="default-search"
                    className="block w-full font-serif p-4 ps-10 text-sm text-white-400 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="search here..."
                    required
                  />
                  <button
                    onClick={getQuizScores}
                    className="flex items-center gap-x-2  text-white absolute end-2.5 bottom-2.5 bg-gradient-to-tr from-orange-600 to-orange-400 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                  >
                    <FaSearch className="text-xs" />
                    Search
                  </button>
                  {displayResults && <SearchResult list={results.data} />}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div> */}
        {displayExamsTable && (
          <div className="flex flex-col">
            <div className="w-60 flex">
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
              <button
                onClick={handleClick}
                type="button"
                className="py-2.5 px-5 me-2 h-auto mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                getExams
              </button>
            </div>
            {examDisplay && examPage}
          </div>
        )}
        {displayEmployeeList && <Table data={users} column={0} />}
        {dislayScores && <Table data={employeeScore.data} column={1} />}
      </div>
    </>
  );
};

export default AdminConsole;
