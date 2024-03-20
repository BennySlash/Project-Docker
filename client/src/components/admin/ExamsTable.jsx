import { useState, useRef } from "react";
const ExamsTable = ({ exams }) => {
  const [title, setTitle] = useState("");
  const [longestArray, setLongestArray] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const examsArray = Array.from({ length: exams.length }, (_, index) => index);
  const longest = [];
  let largest = 0;
  const handleClick = (e) => {
    setDisplayTable(true);
    setTitle(e.target.innerHTML);
    examsArray.map((y) => {
      longest.push(Number(exams[y].questionsArray.length));
    });
    for (let i = 0; i < longest.length; i++) {
      if (longest[i] > largest) {
        largest = longest[i];
      }
    }
    const longestArray = Array.from({ length: largest }, (_, index) => index);
    setLongestArray((prevState) => {
      return [...prevState, longestArray];
    });
    // console.log(longestArray);
  };
  const display = (
    <>
      <div className="flex gap-x-10">
        {examsArray.map((x) => {
          return (
            <div key={x}>
              {
                <button
                  onClick={handleClick}
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  {exams[x].title}
                </button>
              }
            </div>
          );
        })}
      </div>
    </>
  );
  return (
    <div className="flex flex-col">
      <div>{display}</div>
      {
        displayTable &&
          examsArray.map((x) => {
            return (
              <div key={x}>
                <div className="relative overflow-x-auto">
                  <table className="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xl text-center font-extrabold"
                        >
                          {exams[x].title}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th>#</th>
                        <th scope="col" className="px-6 py-3">
                          Question
                        </th>
                        <th scope="col" className="px-6 py-3">
                          OptionA
                        </th>
                        <th scope="col" className="px-6 py-3">
                          OptionB
                        </th>
                        <th scope="col" className="px-6 py-3">
                          OptionC
                        </th>
                        <th scope="col" className="px-6 py-3">
                          OptionD
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Answer
                        </th>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="col" className="px-6 py-3">
                          {x}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {exams[x].questionsArray[x].question}
                        </th>
                        <td className="px-6 py-4">
                          {exams[x].questionsArray[x].optionA}
                        </td>
                        <td className="px-6 py-4">
                          {exams[x].questionsArray[x].optionB}
                        </td>
                        <td className="px-6 py-4">
                          {exams[x].questionsArray[x].optionC}
                        </td>
                        <td className="px-6 py-4">
                          {exams[x].questionsArray[x].optionC}
                        </td>
                        <td className="px-6 py-4">
                          {exams[x].questionsArray[x].answer}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        // <div>
        //   {/* <div className="relative overflow-x-auto">
        //     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        //       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        //         <tr>
        //           <th
        //             scope="col"
        //             className="px-6 py-3 text-xl text-center font-extrabold"
        //           >
        //             {title}
        //           </th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        //           <th
        //             scope="row"
        //             className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        //           >
        //             {}
        //           </th>
        //           <td className="px-6 py-4">Silver</td>
        //           <td className="px-6 py-4">Laptop</td>
        //           <td className="px-6 py-4">$2999</td>
        //         </tr>
        //         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        //           <th
        //             scope="row"
        //             className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        //           >
        //             Microsoft Surface Pro
        //           </th>
        //           <td className="px-6 py-4">White</td>
        //           <td className="px-6 py-4">Laptop PC</td>
        //           <td className="px-6 py-4">$1999</td>
        //         </tr>
        //         <tr className="bg-white dark:bg-gray-800">
        //           <th
        //             scope="row"
        //             className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        //           >
        //             Magic Mouse 2
        //           </th>
        //           <td className="px-6 py-4">Black</td>
        //           <td className="px-6 py-4">Accessories</td>
        //           <td className="px-6 py-4">$99</td>
        //         </tr>
        //       </tbody>
        //     </table>
        //   </div> */}
        // </div>
      }
    </div>
  );
};

export default ExamsTable;
