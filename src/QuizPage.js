import React, { useState } from "react";
import questions from "./Questions";
import ProgressCircle from "./ProgressCircle";

function QuizPage({onReturnBack, onCompletionOfQuiz, answers, setAnswers}) {
    // Questions index
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Handling clicking on next button
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1 && answers[currentQuestionIndex] != null) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentQuestionIndex === questions.length-1 && answers[currentQuestionIndex] != null){
            onCompletionOfQuiz();
        }else{
            alert("Please choose an answer!");
        }
    };

    // Handling clicking on back button
    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            onReturnBack();
        }
    }

    // Handling answering a question
    function recordAnswer(index, option){
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers]; 
            newAnswers[index] = option; 
            return newAnswers; // Return the updated array
          });
        // Moving on the next question using handleNext function
    }

    return (
        <div className="quiz-page">
            <div className="question-title">
                {questions[currentQuestionIndex].question}
            </div>
            <div className="options-div">
            {questions[currentQuestionIndex].options.map((option, index) => (
            <button className={`answer-option-button ${option === answers[currentQuestionIndex] ? 'selected' : ''}`}
            id={option} 
            onClick={() => recordAnswer(currentQuestionIndex, option)} key={index}>{option} </button>
            ))}
            </div>
            <div className="back-next-div">
                <div className="quiz-buttons">
                    <button className="quiz-page-back-button" onClick={handleBack}>
                        Back
                    </button>
                    <button className='quiz-page-next-button' onClick={handleNext}>
                        {currentQuestionIndex === questions.length - 1 ? "Discover your results" : "Next Question →" }
                    </button>
                </div>
            </div>
            <div className="progress-container">
                    <ProgressCircle currentQuestion={currentQuestionIndex + 1} totalQuestions={questions.length}/>
            </div>
        </div>
    );
}

export default QuizPage;