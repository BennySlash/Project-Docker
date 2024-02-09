import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import questionsData from "../../questions.json";
import M from "materialize-css";

function Play() {
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [previousQuestion, setPreviousQuestion] = useState({});
  const [nextQuestion, setNextQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(15);
  const [numberOfAnsweredQuestion, setNumberOfAnsweredQuestion] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [time, setTime] = useState({});
  const [displayNext, setDisplayNext] = useState(false);
  const [tries, setTries] = useState(0);

  let interval = null;

  const location = useLocation();
  const name = location.state.name;
  const navigate = useNavigate();

  const displayQuestions = () => {
    setQuestions(questionsData);
    // console.log(score);
    setCurrentQuestion(questionsData[currentQuestionIndex]);
    setNextQuestion(questionsData[currentQuestionIndex + 1]);
    setPreviousQuestion(questionsData[currentQuestionIndex - 1]);
    setAnswer(questionsData[currentQuestionIndex].answer);
    setDisplayNext(false);
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

    if (nextQuestion === undefined) {
      endQuiz();
    } else {
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

    if (nextQuestion === undefined) {
      endQuiz();
    } else {
      displayQuestions();
    }
  };

  const secondChance = (body) => {
    console.log(body);
    M.toast({
      html: "Wrong Answer, Second chance!",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    setTries((prevState) => prevState + 1);
  };

  const skipedQuestion = () => {
    M.toast({
      html: "You skipped this question",
      classes: "toast-valid",
      displayLength: 1500,
    });

    setScore((prevState) => prevState);

    setCorrectAnswers((prevState) => prevState);
    setCurrentQuestionIndex((prevState) => prevState + 1);
    setNumberOfAnsweredQuestion((prevState) => prevState);

    if (nextQuestion === undefined) {
      endQuiz();
    } else {
      displayQuestions();
    }
  };
  const handleNextButton = () => {
    if (nextQuestion !== undefined) {
      setCurrentQuestionIndex((prevState) => prevState + 1);
      displayQuestions();
    }
  };
  // const handlePreviousButton = () => {
  //   if (previousQuestion !== undefined) {
  //     setCurrentQuestionIndex((prevState) => prevState - 1);
  //     displayQuestions();
  //   }
  // };
  const handleSkipButton = () => {
    skipedQuestion();
  };

  const handleQuitButton = () => {
    if (window.confirm("Are you sure you want to Quit?")) {
      navigate("/");
    }
  };

  const handleOptionClick = (body) => {
    // console.log({ answer, e: body.event.target.innerHTML });

    // console.log(body.state.tries);

    const e = body.event.target.innerHTML;
    // console.log(e);
    if (e.toLowerCase() === answer.toLocaleLowerCase()) {
      correctAnswer();
    } else if (e.toLowerCase() !== answer.toLocaleLowerCase() && tries === 0) {
      setTries(1);
      secondChance(body.event.target);
    } else if (e.toLowerCase() !== answer.toLocaleLowerCase() && tries === 2) {
      wrongAnswer();
    }
  };

  const handleButtonClick = (e) => {
    switch (e.target.id) {
      case "skip-button":
        handleSkipButton();
        break;
      case "next-button":
        handleNextButton();
        break;
      case "previous-button":
        handlePreviousButton();
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
  const endQuiz = () => {
    alert("Quiz has Ended.");

    const playerStats = {
      score,
      numberOfQuestions,
      correctAnswers,
      wrongAnswers,
      name,
    };
    setTimeout(() => {
      navigate("/quiz-summary", { state: { stats: playerStats } });
      // browserHistory.push("/quiz-summary", playerStats);
      // window.location.reload(false);
    }, 1000);
  };

  useEffect(() => {
    setAnswer(questionsData[currentQuestionIndex].answer);
    setScore((prevState) => prevState + 1);
    setCorrectAnswers((prevState) => prevState + 1);
    setCurrentQuestionIndex((prevState) => prevState + 1);
    setNumberOfAnsweredQuestion((prevState) => prevState + 1);
    setWrongAnswers((prevState) => prevState + 1);

    displayQuestions();
    startTimer();
  }, []);

  return (
    <div>
      <div className="questions">
        <div className="lifeline-container">
          <div className="lifeline">
            <p className="text-yellow-700 text-lg p-2">
              {/* <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span> */}
              Questions
            </p>
            {/* <p>
                <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>
              </p> */}
          </div>
          <div className="clock">
            <p>
              <span className="text-blue-800 px-3 text-lg">
                {currentQuestionIndex} 0f 15
              </span>
            </p>

            <div className="px-2 flex items-center g-2">
              <span className="text-green-800 text-xl">
                {time.minutes}:{time.seconds}
              </span>
              <span className="mdi mdi-clock-outline mdi-24px  text-orange-700"></span>
            </div>
          </div>
        </div>
        <h5 className="text-3xl my-8">{currentQuestion.question}</h5>
        <div className="option">
          <div className="options-container">
            <p
              id="a"
              onClick={() =>
                handleOptionClick({
                  event: event,
                  state: {
                    index: currentQuestionIndex,
                    score: score,
                    correctAnswer: correctAnswer,
                    wrongAnswer: wrongAnswer,
                    tries: tries,
                  },
                })
              }
              className="option rounded-md bg-blue-700 p-3 text-lg text-white"
            >
              {currentQuestion.optionA}
            </p>
            <p
              id="b"
              onClick={() =>
                handleOptionClick({
                  event: event,
                  state: {
                    index: currentQuestionIndex,
                    score: score,
                    correctAnswer: correctAnswer,
                    wrongAnswer: wrongAnswer,
                    tries: tries,
                  },
                })
              }
              className="option rounded-md bg-blue-700 p-3 text-lg text-white"
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
                  state: {
                    index: currentQuestionIndex,
                    score: score,
                    correctAnswer: correctAnswer,
                    wrongAnswer: wrongAnswer,
                    tries: tries,
                  },
                })
              }
              className="option rounded-md bg-blue-700 p-3 text-lg text-white"
            >
              {currentQuestion.optionC}
            </p>
            <p
              id="d"
              onClick={() =>
                handleOptionClick({
                  event: event,
                  state: {
                    index: currentQuestionIndex,
                    score: score,
                    correctAnswer: correctAnswer,
                    wrongAnswer: wrongAnswer,
                    tries: tries,
                  },
                })
              }
              className="option rounded-md bg-blue-700 p-3 text-lg text-white"
            >
              {currentQuestion.optionD}
            </p>
          </div>
        </div>
        <div className="quiz-direction">
          {/* <button
            id="previous-button"
            onClick={handleButtonClick}
            className="direction-key rounded-sm bg-blue-700 p-2 text-sm text-white"
          >
            Previous
          </button> */}
          {displayNext && (
            <button
              id="next-button"
              onClick={handleButtonClick}
              className="direction-key rounded-sm bg-green-700 p-2 text-sm text-white"
            >
              Next
            </button>
          )}
          <button
            id="quit-button"
            onClick={handleButtonClick}
            className="direction-key rounded-sm bg-red-700 p-2 text-sm text-white"
          >
            Quit
          </button>
          <button
            id="skip-button"
            onClick={handleButtonClick}
            className="direction-key rounded-sm bg-red-700 p-2 text-sm text-white"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

export default Play;