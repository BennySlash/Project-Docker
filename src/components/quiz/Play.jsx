import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import questionsData from "../../questions.json";
import Modal from "./Modal";
import Indicator from "./indicator";
import M from "materialize-css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function Play() {
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [previousQuestion, setPreviousQuestion] = useState({});
  const [nextQuestion, setNextQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(15);
  const [numberOfAnsweredQuestion, setNumberOfAnsweredQuestion] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState();
  const [score, setScore] = useState();
  const [correctAnswers, setCorrectAnswers] = useState(1);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [time, setTime] = useState({});
  const [tries, setTries] = useState(0);
  const [modal, setModal] = useState(false);
  const [prevClicked, setPrevClicked] = useState(false);
  const [attempt, setAttempt] = useState(2);
  const skippedRef = useRef();
  const takenRef = useRef();
  const [inactive, setInactive] = useState(false);
  const [inactiveNext, setInactiveNext] = useState(false);
  const [inactiveSkip, setInactiveSkip] = useState(false);
  const [inactivePrev, setInactivePrev] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [session, setSession] = useState("");
  const sessionRef = useRef([]);
  const pageRef = useRef();
  const inactiveA = useRef(inactive);
  const inactiveB = useRef(inactive);
  const inactiveC = useRef(inactive);
  const inactiveD = useRef(inactive);
  let interval = null;

  const navigate = useNavigate();
  const location = useLocation();
  // const user = location.state.name;
  const { token, user } = useAuth();

  // const headers = {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  //   Authorization: `Bearer ${token}`,
  // };

  const page = (index) => {
    pageRef.current = index;
    setCurrentQuestionIndex(Number(pageRef.current));
    setCurrentQuestion(questionsData[Number(pageRef.current)]);
    setNextQuestion(questionsData[Number(pageRef.current) + 1]);
    setPreviousQuestion(questionsData[Number(pageRef.current) - 1]);
    setAnswer(questionsData[Number(pageRef.current)].answer);
    displayQuestions();
  };
  const defaultSession = async () => {
    setCurrentQuestionIndex(0);

    navigate(0);

    displayQuestions();
  };

  const displayQuestions = async () => {
    const res = await axios.post("http://localhost:4000/api/updatePage", {
      currentQuestionIndex,
      // currentQuestion,
      // nextQuestion,
      // previousQuestion,
      // answer,
      user,
      finished,
      score,
      takenRef: takenRef.current,
      skippedRef: skippedRef.current,
    });

    // console.log(sessionRef.current);
    // console.log(`currentQuestionIndex: ${currentQuestionIndex}`);
    // console.log(`currentQuestion: ${currentQuestion}`);
    // console.log(`nextQuestoin: ${nextQuestion}`);
    // console.log(`previousQuestion: ${previousQuestion}`);
    // console.log(`answer: ${answer}`);
    // console.log(`user: ${user}`);
    // console.log(`score: ${score}`);
    // console.log(`finished: ${finished}`);

    // setCurrentQuestionIndex((prevState) => prevState);
    // console.log(currentQuestionIndex);
    // setScore((prevState) => prevState);

    setCurrentQuestion(questionsData[currentQuestionIndex]);
    setNextQuestion(questionsData[currentQuestionIndex + 1]);
    setPreviousQuestion(questionsData[currentQuestionIndex - 1]);
    // console.log({ questionsData, currentQuestionIndex });
    setAnswer(questionsData[currentQuestionIndex].answer);

    // console.log(takenRef.current);
    // console.log(skippedRef);

    setAttempt(2);

    if (takenRef.current.length === 15) {
      endQuiz();
    }

    if (
      takenRef.current.includes(currentQuestionIndex) ||
      skippedRef.current.includes(currentQuestionIndex)
    ) {
      setInactiveNext(false);
    } else {
      setInactiveNext(true);
    }

    if (currentQuestionIndex === 14) {
      setInactiveSkip(true);
    }

    if (currentQuestionIndex === 0) {
      setInactivePrev(true);
    } else {
      setInactivePrev(false);
    }

    // console.log(takenRef.current.length);
    inactiveA.current = inactive;
    inactiveB.current = inactive;
    inactiveC.current = inactive;
    inactiveD.current = inactive;
    setIsLoading(false);
  };

  const correctAnswer = () => {
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 1500,
    });

    setScore((prevState) => prevState + 1);

    setCorrectAnswers((prevState) => prevState + 1);
    setCurrentQuestionIndex((prevState) => prevState + 1);
    setNumberOfAnsweredQuestion((prevState) => prevState + 1);
    setTries(0);
    setAttempt(2);
    inactiveA.current = inactive;
    inactiveB.current = inactive;
    inactiveC.current = inactive;
    inactiveD.current = inactive;

    if (nextQuestion === undefined) {
      if (takenRef.current.length === 15) {
        displayQuestions();
      } else {
        alert(
          `there are ${skippedRef.current.length} skipped questions, please go back`
        );
        takenRef.current = [...takenRef.current, currentQuestionIndex];

        setCurrentQuestionIndex((prevState) => prevState - 1);
        setCorrectAnswers((prevState) => prevState);
        setWrongAnswers((prevState) => prevState);

        displayQuestions();
      }
    } else {
      takenRef.current = [...takenRef.current, currentQuestionIndex];
      displayQuestions();
    }
  };

  const wrongAnswer = () => {
    M.toast({
      html: "Wrong Answer!",
      classes: "toast-invalid",
      displayLength: 1500,
    });

    setWrongAnswers((prevState) => prevState + 1);
    setCurrentQuestionIndex((prevState) => prevState + 1);
    setNumberOfAnsweredQuestion((prevState) => prevState);
    setTries(0);
    setAttempt(0);
    takenRef.current = [...takenRef.current, currentQuestionIndex];

    displayAnswer();
  };

  const displayAnswer = () => {
    setModal(true);

    if (nextQuestion === undefined) {
      if (takenRef.current.length === 15) {
        endQuiz();
      } else {
        alert(
          `there are ${skippedRef.current.length}skipped questions, please go back`
        );
        takenRef.current = [...takenRef.current, currentQuestionIndex];

        setCurrentQuestionIndex((prevState) => prevState - 1);
        setCorrectAnswers((prevState) => prevState);
        setWrongAnswers((prevState) => prevState);
        displayQuestions();
      }
    } else {
      displayQuestions();
    }
  };
  const secondChance = (body) => {
    setAttempt(1);
    M.toast({
      html: "Wrong Answer, Second chance!",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    setTries((prevState) => prevState + 1);
  };

  const handlePreviousButton = () => {
    setPrevClicked(true);
    setCurrentQuestionIndex((prevState) => prevState - 1);
    if (previousQuestion !== undefined) {
      displayQuestions();
    }
  };

  const handleNextButton = () => {
    setCurrentQuestionIndex((prevState) => prevState + 1);
    if (nextQuestion !== undefined) {
      displayQuestions();
    }
  };
  const handleSkipButton = () => {
    M.toast({
      html: "You skipped this question",
      classes: "toast-valid",
      displayLength: 1500,
    });

    setCurrentQuestionIndex((prevState) => prevState + 1);
    setPreviousQuestion;

    skippedRef.current = [...skippedRef.current, currentQuestionIndex];

    if (currentQuestionIndex === 14) {
      alert("You are at the last question, Can't Skip!");
    } else {
      displayQuestions();
    }
  };

  const handleQuitButton = () => {
    if (window.confirm("Are you sure you want to Quit?")) {
      navigate("/");
    }
  };

  const handleOptionClick = (body) => {
    const btn = body.event.target.id;

    switch (btn) {
      case "a":
        inactiveA.current = !inactiveA.current;
        break;
      case "b":
        inactiveB.current = !inactiveB.current;
        break;
      case "c":
        inactiveC.current = !inactiveC.current;
        break;
      case "d":
        inactiveD.current = !inactiveD.current;
        break;
      default:
        break;
    }
    const e = body.event.target.innerHTML;
    if (e.toLowerCase() === answer.toLocaleLowerCase()) {
      correctAnswer();
    } else if (e.toLowerCase() !== answer.toLocaleLowerCase() && tries === 0) {
      setTries(1);
      secondChance();
    } else if (e.toLowerCase() !== answer.toLocaleLowerCase() && tries === 2) {
      wrongAnswer();
    }
  };

  const handleButtonClick = (body) => {
    switch (body.event.target.id) {
      case "skip-button":
        handleSkipButton();
        break;
      case "previous-button":
        handlePreviousButton();
        break;
      case "next-button":
        handleNextButton();
        break;
      case "quit-button":
        handleQuitButton();
        break;
      default:
        break;
    }
  };

  const startTimer = () => {
    const countDownTime = Date.now() + 1000000;
    interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setTime({
          minutes: 0,
          seconds: 0,
        });
        endQuiz();
      } else {
        setTime({
          minutes,
          seconds,
        });
      }
    }, 1000);
  };
  const endQuiz = async () => {
    alert("Quiz has Ended.");
    setFinished(true);
    const res = await axios.post("http://localhost:4000/api/updatePage", {
      currentQuestionIndex,
      currentQuestion,
      nextQuestion,
      previousQuestion,
      answer,
      user,
      finished,
      score,
    });

    const playerStats = {
      score,
      numberOfQuestions,
      correctAnswers,
      wrongAnswers,
      finished,
      // name,
    };
    navigate("/quiz-summary", { state: { stats: playerStats } });

    // setTimeout(() => {
    //   navigate("/quiz-summary", { state: { stats: playerStats } });
    // }, 1000);
  };
  // console.log({ token });
  // const session = useQuery(
  //   [
  //     "session",
  //     currentQuestionIndex,
  //     previousQuestion,
  //     currentQuestion,
  //     nextQuestion,
  //     answer,
  //     pageRef,
  //   ],
  //   async () =>
  //     await axios.get(`${import.meta.env.VITE_BACKEND_URL}checkSession`, {
  //       headers,
  //     }),
  //   {
  //     retry: 3,
  //     enabled: !!token,
  //     onSuccess: (res) => {
  //       // console.log(res.data.liveSession[0]);
  //       const live = res.data.liveSession[0];
  //       console.log(res.data.liveSession);
  //       if (res.data.liveSession === 0) {
  //         // setAnswer(questionsData[currentQuestionIndex].answer);
  //         // setCurrentQuestionIndex((prevState) => prevState);
  //         // setCurrentQuestion(questionsData[currentQuestionIndex]);
  //         // setNextQuestion(questionsData[currentQuestionIndex + 1]);
  //         // setPreviousQuestion(questionsData[currentQuestionIndex - 1]);
  //       } else {
  //         setAnswer(questionsData[live.currentQuestionIndex].answer);
  //         setCurrentQuestionIndex(live.currentQuestionIndex);
  //         setCurrentQuestion(questionsData[live.currentQuestionIndex]);

  //         setNextQuestion(questionsData[live.currentQuestionIndex + 1]);
  //         setPreviousQuestion(questionsData[live.currentQuestionIndex - 1]);
  //       }
  //       displayQuestions();
  //       startTimer();
  //     },
  //   }
  // );

  // if (session.isFetching) {
  //   return <>Loading...</>;
  // }
  const getSesison = async () => {
    const fetchSession = await axios.post(
      "http://localhost:4000/api/checkSession",
      {
        user: user,
      }
    );
    const fetchedSession = fetchSession.data.liveSession;
    // console.log(fetchedSession);
    sessionRef.current = [...sessionRef.current, fetchedSession];
    // console.log(sessionRef.current[0]);

    if (sessionRef.current[0].length === 0) {
      // console.log(true);

      defaultSession();
    } else {
      // console.log(false);

      const res = await axios.post("http://localhost:4000/api/updatePage", {
        user,
        currentQuestionIndex,
        finished,
        score,
        takenRef: takenRef.current,
        skippedRef: skippedRef.current,
      });
      // console.log(res.data.updateSession.takenRef);

      // console.log(res.data.updateSession.takenRef.current[0]);
      if (takenRef.length)
        takenRef.current = [
          ...takenRef.current,
          ...res.data.updateSession.takenRef,
        ];
      else takenRef.current = [...res.data.updateSession.takenRef];

      if (skippedRef.length) {
        skippedRef.current = [
          ...skippedRef.current,
          ...res.data.updateSession.skippedRef,
        ];
      } else {
        skippedRef.current = [...res.data.updateSession.skippedRef];
      }
      setScore(res.data.updateSession.score);
      setCurrentQuestionIndex(res.data.updateSession.currentQuestionIndex);

      displayQuestions();
    }
  };
  useEffect(() => {
    setIsLoading(true);

    getSesison();

    // startTimer();
  }, [
    currentQuestionIndex,
    // answer,
    // previousQuestion,
    // currentQuestion,
    // nextQuestion,
    // pageRef,
    // sessionRef,
  ]);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col items-center">
          <Indicator
            pass={page}
            led={currentQuestionIndex}
            skip={skippedRef.current}
            taken={takenRef.current}
          />
          <div className="questions">
            {takenRef.current.includes(currentQuestionIndex) && (
              <div>
                <div className="rounded-full bg-green-200 p-2 w-max mx-auto">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-8 w-8 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xl mt-2 text-green-700">
                  Question Completed!
                </p>
              </div>
            )}

            <div className="lifeline-container">
              <div className="lifeline">
                <p className="text-yellow-700 text-lg p-2">Questions</p>
              </div>
              <div className="clock">
                <p>
                  <span className="text-blue-800 px-3 text-lg">
                    {currentQuestionIndex + 1} 0f 15
                  </span>
                </p>

                {!takenRef.current.includes(currentQuestionIndex) && (
                  <div className="text-green-700 px-3 flex flex-col justify-center items-center font-bold">
                    {<p>tries left: {attempt}</p>}
                    <div>
                      <span className="mdi mdi-lightbulb-on-outline mdi-24px"></span>
                    </div>
                  </div>
                )}

                <div className="px-2 flex items-center g-2">
                  <span className="text-green-800 text-xl font-bold">
                    {time.minutes}:{time.seconds}
                  </span>
                  <span className="mdi mdi-clock-outline mdi-24px text-orange-700"></span>
                </div>
              </div>
            </div>
            <h5 className="text-3xl my-8">
              {/* {!prevClicked ? currentQuestion.question : previousQuestion.question} */}
              {currentQuestion.question}
            </h5>
            {/* <h5 className="text-3xl my-8">{currentQuestion.question}</h5> */}
            <div
              className={`option ${
                takenRef.current.includes(currentQuestionIndex) &&
                "pointer-events-none opacity-25"
              }`}
            >
              {modal && (
                <Modal
                  explanation={currentQuestion.answer}
                  toggle={() => {
                    setModal(false);
                  }}
                />
              )}
              <div className="options-container">
                <p
                  id="a"
                  onClick={() =>
                    handleOptionClick({
                      event: event,
                    })
                  }
                  className={`${
                    inactiveA.current === true &&
                    "pointer-events-none bg-rose-400 line-through"
                  } option rounded-md bg-blue-700 p-3 text-lg text-white`}
                >
                  {currentQuestion.optionA}
                </p>
                <p
                  id="b"
                  onClick={() =>
                    handleOptionClick({
                      event: event,
                    })
                  }
                  className={`${
                    inactiveB.current === true &&
                    "pointer-events-none bg-rose-400 line-through"
                  } option rounded-md bg-blue-700 p-3 text-lg text-white`}
                >
                  {currentQuestion.optionB}
                </p>
              </div>
              <div className="options-container">
                <p
                  id="c"
                  onClick={() =>
                    handleOptionClick({
                      event: event,
                    })
                  }
                  className={`${
                    inactiveC.current === true &&
                    "pointer-events-none bg-rose-400 line-through"
                  } option rounded-md bg-blue-700 p-3 text-lg text-white`}
                >
                  {currentQuestion.optionC}
                </p>
                <p
                  id="d"
                  onClick={() =>
                    handleOptionClick({
                      event: event,
                    })
                  }
                  className={`${
                    inactiveD.current === true &&
                    "pointer-events-none bg-rose-400 line-through"
                  } option rounded-md bg-blue-700 p-3 text-lg text-white`}
                >
                  {currentQuestion.optionD}
                </p>
              </div>
            </div>
            <div className="quiz-direction flex justify-around">
              <div className="flex gap-x-4">
                {skippedRef.current.length > 0 && (
                  <button
                    id="previous-button"
                    onClick={() =>
                      handleButtonClick({
                        event: event,
                        state: {
                          currentQuestionIndex: currentQuestionIndex,
                        },
                      })
                    }
                    className={`${
                      inactivePrev && "pointer-events-none opacity-25"
                    } direction-key rounded-sm bg-orange-400 p-3 text-sm text-white`}
                  >
                    Previous
                  </button>
                )}

                {prevClicked && (
                  <button
                    id="next-button"
                    onClick={() =>
                      handleButtonClick({
                        event,
                        state: {
                          currentQuestionIndex: currentQuestionIndex,
                        },
                      })
                    }
                    className={`${
                      inactiveNext && "pointer-events-none opacity-25"
                    } direction-key rounded-sm bg-purple-700 p-3 text-sm text-white`}
                  >
                    Next
                  </button>
                )}

                <button
                  id="skip-button"
                  onClick={() =>
                    handleButtonClick({
                      event: event,
                      state: {
                        currentQuestionIndex: currentQuestionIndex,
                      },
                    })
                  }
                  className={`${
                    inactiveSkip && "pointer-events-none opacity-25"
                  } direction-key rounded-sm bg-orange-400 p-3 text-sm text-white`}
                >
                  Skip
                </button>
              </div>
              <button
                id="quit-button"
                onClick={() =>
                  handleButtonClick({
                    event: event,
                    state: {
                      currentQuestionIndex: currentQuestionIndex,
                    },
                  })
                }
                className="direction-key rounded-sm bg-red-700 p-3 text-sm text-white"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center p-5 space-y-8 pt-64 px-48">
          <div className="w-full h-16 animate-pulse bg-gray-400 " />
          <div className="grid grid-cols-12 gap-x-10 gap-y-5">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                className="col-span-6 h-14 animate-pulse bg-gray-400"
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Play;
