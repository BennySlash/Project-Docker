import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import QuizInstruction from "./components/quiz/QuizInstructions";
import Play from "./components/quiz/Play";
import QuizSummary from "./components/quiz/QuizSummary";
import AdminLogin from "./components/admin/AdminLogin";
import AdminConsole from "./components/admin/AdminConsole";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-console" element={<AdminConsole />} />
        <Route path="/instructions" element={<QuizInstruction />} />
        <Route path="/play-quiz" element={<Play />} />
        <Route path="/quiz-summary" element={<QuizSummary />} />
        {/* <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/auth" element={<AuthForm />} /> */}
      </Routes>
    </>
  );
}

export default App;
