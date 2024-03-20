import { useState, useEffect } from "react";
import questionsData from "../../questions.json";

export default function Indicator(props) {
  const [taken, setTaken] = useState(false);

  const indicatorArray = Array.from(
    { length: props.length },
    (_, index) => index
  );

  const handleClick = (event) => {
    // console.log(event.target.id);
    props.pass(event.target.id);
  };

  const paginator = () => {
    return indicatorArray.map((questions, index) => {
      return (
        <div className="mt-10 flex flex-col gap-y-4" key={index}>
          <span
            className={`flex w-3 h-3 me-3 ${
              index === props.led ? "bg-blue-700" : "bg-slate-500"
            } rounded-full`}
          ></span>
          {/* <span
            className={`flex w-3 h-3 me-3 ${
              props.skip.map((x) => x).includes(index) &&
              !props.taken.includes(index)
                ? "bg-yellow-700"
                : "bg-transparent"
            } rounded-full ${taken && "bg-slate-500"}`}
          ></span>  */}
          <button
            onClick={handleClick}
            id={index}
            className={`flex w-3 h-3 me-3 ${
              props.skip.map((x) => x).includes(index) &&
              !props.taken.includes(index)
                ? "bg-yellow-700"
                : "bg-transparent"
            } rounded-full ${taken && "bg-slate-500"}`}
          ></button>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex gap-x-3 items-baseline">
        <div className="mr-2 flex flex-col">
          <p className="p-1 text-center bg-blue-500 rounded-t">#questions</p>
          <p className="p-1 text-center bg-yellow-500 rounded-b">#skipped</p>
        </div>
        {paginator()}
      </div>
    </>
  );
}
