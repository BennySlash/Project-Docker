import { useState, useEffect } from "react";
import questionsData from "../../questions.json";

export default function Indicator(props) {
  const [taken, setTaken] = useState(false);

  const paginator = () => {
    return questionsData.map((questions, index) => {
      return (
        <div className="flex flex-col gap-y-4" key={index}>
          <span
            className={`flex w-3 h-3 me-3 ${
              index === props.led ? "bg-current" : "bg-slate-500"
            } rounded-full`}
          ></span>
          <span
            className={`flex w-3 h-3 me-3 ${
              props.skip.map((x) => x).includes(index) &&
              !props.taken.includes(index)
                ? "bg-yellow-700"
                : "bg-transparent"
            } rounded-full ${taken && "bg-slate-500"}`}
          ></span>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex gap-x-3">{paginator()}</div>
    </>
  );
}
