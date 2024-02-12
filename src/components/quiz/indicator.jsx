import { useEffect, useRef, useState } from "react";
import questionsData from "../../questions.json";

export default function Indicator(props) {
  const paginator = () => {
    return questionsData.map((questions, index) => {
      return (
        <span
          key={index}
          className={`flex w-3 h-3 me-3 ${
            index === props.led - 1 ? "bg-current" : "bg-slate-500"
          } rounded-full`}
        ></span>
      );
    });
  };

  return (
    <>
      <div className="flex gap-x-3">{paginator()}</div>
    </>
  );
}
