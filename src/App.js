import './App.css';
import MainPage from './MainPage.js';
import React, { useState } from "react";
import QuizPage from "./QuizPage";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  /*  Lambda functio for controlling page visualization. */
  const startQuiz = () => {
    setShowQuiz(true); // Switch to quiz page
  };
  return (
    <div className="App">
           {!showQuiz && <MainPage onStartQuiz={startQuiz} />}
           {showQuiz && <QuizPage />}
    </div>
  );
}

export default App;
