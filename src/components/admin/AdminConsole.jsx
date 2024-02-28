import { useEffect, useState } from "react";
import Table from "./Table";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";
// import { Navbar } from "../Navbar";

const AdminConsole = () => {
  const [users, setUsers] = useState("");
  const [employeeScore, setEmployeeScore] = useState("");
  const [displayEmployeeList, setDisplayEmployeeList] = useState(false);
  const [dislayScores, setDisplayScores] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState("");
  const [displayResults, setDisplayResults] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {}, [retrieveEmailList()]);
  const getEmployeeList = () => {
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
    <>
      <div className="flex justify-around items-center">
        <div className="flex items-center justify-around">
          <button
            onClick={getEmployeeList}
            className="m-10 p-6 flex self-end middle none center mr-3 rounded-lg bg-gradient-to-tr from-orange-600 to-orange-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Get Employee List
          </button>
          <button
            onClick={getQuizScores}
            className="m-10 p-6 flex self-end middle none center mr-3 rounded-lg bg-gradient-to-tr from-orange-600 to-orange-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Get All Employee Quiz Scores
          </button>
        </div>

        <div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              onClick={handleInputClick}
              onChange={handleChange}
              type="search"
              id="default-search"
              className="block w-full font-serif p-4 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          </div>
        </div>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to Quit?")) {
              navigate("/");
            }
          }}
          className="direction-key rounded-sm bg-red-700 p-3 text-sm text-white"
        >
          Quit
        </button>
      </div>

      {displayEmployeeList && <Table data={users} column={0} />}
      {dislayScores && <Table data={employeeScore.data} column={1} />}
      {displayResults && <SearchResult list={results.data} />}
    </>
  );
};

export default AdminConsole;
