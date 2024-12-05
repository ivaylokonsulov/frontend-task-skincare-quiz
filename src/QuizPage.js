import React, { useState } from "react";
import questions from "./Questions";

function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Quiz Completed!");
    }
  };

  return (
    <div className="quiz-page">
      <h1>{questions[currentQuestionIndex].question}</h1>
      <ul>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <button onClick={handleNext}>
        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}

export default QuizPage;