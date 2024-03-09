import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
const Table = (props) => {
  const tableRef = useRef(null);
  const data = props.data;
  let tableRows = null;
  if (props.column === 0) {
    tableRows = data.map((userEmail, index) => {
      return (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th>{userEmail}</th>
          {props.column === 1 && <td className="px-6 py-4"> </td>}
          {props.column === 1 && <td className="px-6 py-4"> </td>}
        </tr>
      );
    });
  } else if (props.column === 1) {
    tableRows = data.map((detail, index) => {
      return (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th>{detail.name}</th>
          {props.column === 1 && <td className="px-6 py-4">{detail.score} </td>}
          {props.column === 1 && <td className="px-6 py-4">{detail.date} </td>}
        </tr>
      );
    });
  } else if (props.column === 2) {
    tableRows = data.map((detail) => {
      return (
        <tr
          key={detail._id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th>{detail.name}</th>
          {props.column === 2 && <td className="px-6 py-4">{detail.score} </td>}
          {props.column === 2 && <td className="px-6 py-4">{detail.date} </td>}
        </tr>
      );
    });
  }

  const exportToExcel = () => {};
  return (
    <div className="mt-10">
      <DownloadTableExcel
        filename="table data"
        sheet="sheet1"
        currentTableRef={tableRef.current}
        buttonText="Download as XLS"
      >
        <button
          onClick={exportToExcel}
          className="rounded-xl bg-green-700 p-3 text-lg text-white"
        >
          Export to excel
        </button>
      </DownloadTableExcel>
      <div className="relative overflow-x-auto p-5">
        <table
          ref={tableRef}
          className="w-50 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee Full Name
              </th>
              {props.column === 1 && (
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
              )}
              {props.column === 2 && (
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
              )}
              {props.column === 1 && (
                <th scope="col" className="px-6 py-3">
                  Date of Quiz
                </th>
              )}
              {props.column === 2 && (
                <th scope="col" className="px-6 py-3">
                  Date of Quiz
                </th>
              )}
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
