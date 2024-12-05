import React, { useState } from "react";
import questions from "./Questions";

function QuizPage({onReturnBack, onCompletionOfQuiz, answers, setAnswers}) {
    // Questions index
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Handling clicking on next button
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onCompletionOfQuiz();
        }
    };

    // Handling clicking on back button
    const handleBack = () => {
        if (currentQuestionIndex > 1) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            onReturnBack();
        }
    }



    // Handling answering a question
    function recordAnswer(index, option){
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers]; // Create a copy of the array
            newAnswers[index] = option; // Update the specific index
            console.log(newAnswers);
            return newAnswers; // Return the updated array
          });
        // Moving on the next question using handleNext function
        handleNext();
    }

    return (
        <div className="quiz-page">
            <div className="question-title">
                {questions[currentQuestionIndex].question}
            </div>
            <div className="options-div">
            {questions[currentQuestionIndex].options.map((option, index) => (
            <button className="answer-option-button" onClick={() => recordAnswer(currentQuestionIndex, option)} key={index}>{option} </button>
            ))}
            </div>
            <div className="back-next-div">
                <div className="quiz-buttons">
                    <button className="quiz-page-back-button" onClick={handleBack}>
                        Back
                    </button>
                    <button className='quiz-page-next-button' onClick={handleNext}>
                        {currentQuestionIndex === questions.length - 1 ? "Discover your results" : "Next Question"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizPage;