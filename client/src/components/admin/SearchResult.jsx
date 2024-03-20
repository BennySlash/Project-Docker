import { useState } from "react";
import { sendDataToServer } from "./utils/api";
import Table from "./Table";
const SearchResult = (props) => {
  const [employee, setEmployee] = useState([]);
  const data = props.list;
  const uniqueList = [];
  data.forEach((element) => {
    if (!uniqueList.includes(element.name)) {
      uniqueList.push(element.name);
    }
  });

  const [displayTable, setDisplayTable] = useState(false);
  const [result, setResult] = useState("");

  const send = async (name) => {
    const res = await sendDataToServer({ name: name });
    setResult(res.employeeScoreName);

    setDisplayTable(true);
  };
  // console.log(uniqueList);
  const body = uniqueList.map((item) => {
    return (
      <div
        key={item}
        onClick={() => send(item)}
        className="key={index} bg-slate-500  rounded-lg shadow dark:border dark:bg-white-800 dark:border-white-700 mb-2 px-3 py-1 cursor-pointer transition-all hover:shadow-xl hover:shadow-orange-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        {item}
      </div>
    );
  });
  return (
    <div className="flex flex-col items-end">
      <div className="px-10 py-5 results-list h-auto w-auto flex items-center border-transparent bg-transparent">
        {body}
      </div>
      <div className="w-auto m-auto">
        {displayTable && <Table data={result} column={2} />}
      </div>
    </div>
  );
};
export default SearchResult;
