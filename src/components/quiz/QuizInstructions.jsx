import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar";
import Select from "react-select";

const QuizInstruction = () => {
  const [quizActive, setQuizActive] = useState(true);
  const [examLength, setExamLength] = useState();
  const [examsArray, setExamsArray] = useState([]);
  const [linkOptionsArray, setLinkOptionsArray] = useState([]);
  const [label, setLabel] = useState("");
  const activeUserRef = useRef([]);
  const activeExamRef = useRef([]);
  const labelRef = useRef("");
  const { user } = useAuth();
  const { logout } = useAuth();
  const linksArray = Array.from({ length: examLength }, (_, index) => index);

  useEffect(() => {
    const checkUser = async () => {
      await axios
        .post("http://localhost:4000/api/checkUser", {
          user: user.user,
        })
        .then((res) => {
          const userCheckAray = Array.from(
            { length: res.data.user.length },
            (_, index) => index
          );
          userCheckAray.map((x) => {
            activeUserRef.current = [
              ...activeUserRef.current,
              res.data.user[x].name,
            ];
            activeExamRef.current = [
              ...activeExamRef.current,
              res.data.user[x].exam,
            ];

            if (
              activeUserRef.current.includes(user.user) &&
              activeExamRef.current.includes(labelRef.current)
            ) {
              // console.log(label);
              setQuizActive(false);
            } else {
              setQuizActive(true);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getExam = async () => {
      await axios
        .get("http://localhost:4000/api/get-exams")
        .then((res) => {
          // console.log(res.data.exam)
          setExamLength(res.data.exam.length);
          setExamsArray(res.data.exam);

          const linkOptions = linksArray.map((x) => {
            return {
              label: examsArray[x].title,
              value: examsArray[x].title,
            };
          });
          setLinkOptionsArray(linkOptions);
          // console.log(linkOptions);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    checkUser();
    getExam();
  }, [examLength, label]);

  return (
    <div className="relative flex justify-center">
      <div className="fixed">{<Navbar linksArray={linkOptionsArray} />} </div>
      <div className="px-20 bg-white rounded-lg mt-16 pb-24 leading-7">
        <h1 className="text-center">Quiz Instructions</h1>
        <p className="pb-10">
          The quizzes consists of questions carefully designed to help you
          self-assess your comprehension of the information presented on the
          topics covered in the module. No data will be collected on the website
          regarding your responses or how many times you take the quiz. Each
          question in the quiz is of multiple-choice or "true or false" format.
          Read each question carefully, and click on the button next to your
          response that is based on the information covered on the topic in the
          module. Each correct or incorrect response will result in appropriate
          feedback immediately at the bottom of the screen. After responding to
          a question, click on the "Next Question" button at the bottom to go to
          the next questino. After responding to the 8th question, click on
          "Close" on the top of the window to exit the quiz. If you select an
          incorrect response for a question, you can try again until you get the
          correct response. If you retake the quiz, the questions and their
          respective responses will be randomized. The total score for the quiz
          is based on your responses to all questions. If you respond
          incorrectly to a question or retake a question again and get the
          correct response, your quiz score will reflect it appropriately.
          However, your quiz will not be graded, if you skip a question or exit
          before responding to all the questions. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam ipsam placeat ducimus mollitia
          expedita cum quam perspiciatis aut id iure laborum, ad, optio incidunt
          obcaecati, quia ipsum maxime numquam a? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sint temporibus illum excepturi mollitia
          neque maxime ab, quis vitae odit assumenda praesentium et cumque
          perferendis nesciunt explicabo autem, voluptatem eos id officia
          voluptate. Ipsum quod consectetur ex, id voluptas ipsa. Illo, quaerat!
          Reprehenderit aperiam laboriosam corporis recusandae consectetur,
          iusto voluptas quam harum, accusantium porro, velit nihil. Aliquam
          labore repellat voluptatibus voluptatum, illum, totam modi velit
          numquam earum consectetur consequatur ipsa dignissimos eum nemo, nisi
          quaerat rem quia quisquam. Obcaecati quo provident totam iusto
          doloremque ratione consectetur esse similique aperiam quaerat neque
          laboriosam maiores soluta veniam quibusdam sed, repellendus natus cum
          expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Odio ab quae assumenda similique quasi! Maxime quam obcaecati impedit
          amet deserunt, omnis libero necessitatibus quibusdam minima quisquam
          minus saepe eligendi laudantium, suscipit placeat? Architecto
          blanditiis voluptas iusto ullam quibusdam mollitia aperiam nostrum
          maxime praesentium! Reprehenderit maxime dignissimos ratione hic, fuga
        </p>

        <div className="mt-10 flex justify-center gap-x-80">
          <div className="flex gap-x-10">
            <div className="w-60">
              <Select
                isClearable
                // components={{ Control: ControlComponent }}
                isSearchable
                name="color"
                onChange={(res) => {
                  setLabel(res.label);
                  labelRef.current = res.label;
                  // console.log(labelRef.current);
                }}
                options={linkOptionsArray}
              />
            </div>
            <Link
              className={`${
                !quizActive && "pointer-events-none opacity-50 "
              } text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded`}
              to="/play-quiz"
              state={{ name: user.user, exam: labelRef.current }}
            >
              Take Quiz
            </Link>
          </div>

          <button
            onClick={logout}
            className="w-1/12 text-center p-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstruction;
