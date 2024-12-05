import './mainPage.css';
import './quizPage.css';
import MainPage from './MainPage.js';
import React, { useState } from "react";
import QuizPage from "./QuizPage";
import DiscoverResults from "./DiscoverResults"

function App() {
  // Main page flag
  const [showMainPage, setMainPage] = useState(true);

  // Handling showing quiz page
  const [showQuiz, setShowQuiz] = useState(false);

  // Handling discovering results
  const [showDiscoverResults, setDiscoverResults] = useState(false);

  //  Function passed to Main Page to control whether Quiz Page is to be shown
  const startQuiz = () => {
    setMainPage(false);
    setShowQuiz(true); // Switch to quiz page
  };
  // Function passed to Quiz Page for handling Returning back to Main page
  const returnBack = () => {
    setShowQuiz(false);
    setMainPage(true);
  }
 
  // Function passed to Quiz Page for handling completion of test
  const completeTest = () => {
    setDiscoverResults(true);
    setShowQuiz(false);
    setMainPage(false);
  }

  // Use state for answering questions. Creating an empty array to fill inset
  const [answers, setAnswers] = useState(Array(5).fill(null));

  // Main page
  if (showMainPage && !showQuiz && !showDiscoverResults){
    return(
      <div className="App">
           { <MainPage onStartQuiz={startQuiz} />}
      </div>
    );
  }
  // Quiz page
  else if(!showMainPage && showQuiz && !showDiscoverResults){
    return(
      <div className="App">
        <QuizPage 
            onReturnBack = {returnBack} 
            onCompletionOfQuiz =  {completeTest}
            answers={answers}
            setAnswers={setAnswers}/>
      </div>
    );
  }
  // Discover results page
  else
    return(
    <div className="App">
        <DiscoverResults />
      </div>
    );
}

export default App;
