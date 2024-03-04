import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import QuizInstruction from "./components/quiz/QuizInstructions";
import Play from "./components/quiz/Play";
import QuizSummary from "./components/quiz/QuizSummary";
import AdminLogin from "./components/admin/AdminLogin";
import AdminConsole from "./components/admin/AdminConsole";
import { useAuth } from "./context/AuthContext";
import Questions from "./components/admin/Questions";
import QuestionGenerator from "./components/admin/QuestionGenerator";

function App() {
  const { token, checked } = useAuth();

  return (
    <>
      {checked && (
        <>
          {token ? (
            <Routes>
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-console" element={<AdminConsole />} />
              <Route path="/questions" element={<Questions />} />
              <Route
                path="/question-generator"
                element={<QuestionGenerator />}
              />
              <Route path="/instructions" element={<QuizInstruction />} />
              <Route path="/play-quiz" element={<Play />} />
              <Route path="/quiz-summary" element={<QuizSummary />} />
              <Route path="*" element={<Navigate to="/instructions" />} />
            </Routes>
          ) : (
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Home2 />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
