import { useState } from "react";
import { sendDataToServer } from "./utils/api";
import Table from "./Table";
const SearchResult = (props) => {
  const data = props.list;
  const uniqueList = [];
  data.forEach((element) => {
    if (!uniqueList.includes(element)) {
      uniqueList.push(element);
    }
  });
  const [displayTable, setDisplayTable] = useState(false);
  const [result, setResult] = useState("");

  const send = async (name) => {
    const res = await sendDataToServer({ name: name });
    setResult(res.employeeScoreName);

    setDisplayTable(true);
  };
  const body = uniqueList.map((item) => {
    return (
      <div
        key={item._id}
        onClick={() => send(item.name)}
        className="key={index} bg-slate-500  rounded-lg shadow dark:border dark:bg-white-800 dark:border-white-700 mb-2 px-3 py-1 cursor-pointer transition-all hover:shadow-xl hover:shadow-orange-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        {item.name}
      </div>
    );
  });
  return (
    <div className="flex justify-end mr-20">
      <div className="results-list flex items-center border-transparent bg-transparent">
        {body}
      </div>

      {displayTable && <Table data={result} column={2} />}
    </div>
  );
};
export default SearchResult;
