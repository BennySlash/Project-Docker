import { useState } from "react";
import questionsData from "../../questions.json";

export default function Indicator(props) {
  // console.log(props.skip);
  const paginator = () => {
    return questionsData.map((questions, index) => {
      return (
        <div className="flex flex-col gap-y-4" key={index}>
          <span
            // key={index}
            className={`flex w-3 h-3 me-3 ${
              index === props.led ? "bg-current" : "bg-slate-500"
            } rounded-full`}
          ></span>
          <span
            className={`flex w-3 h-3 me-3 ${
              props.skip.map((x) => x).includes(index)
                ? "bg-yellow-700"
                : "bg-transparent"
            } rounded-full`}
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
