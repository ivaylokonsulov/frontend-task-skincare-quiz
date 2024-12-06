import './mainPage.css';
import './quizPage.css';
import './discoverResults.css';
import MainPage from './MainPage.js';
import React, { useState } from "react";
import QuizPage from "./QuizPage";
import DiscoverResults from "./DiscoverResults"
import { useEffect } from 'react';

function App() {
  // Main page flag
  const [showMainPage, setMainPage] = useState(true);

  // Handling showing quiz page
  const [showQuiz, setShowQuiz] = useState(false);

  // Handling discovering results
  const [showDiscoverResults, setDiscoverResults] = useState(false);

  // Fetching data from endpoint
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        );
        const data = await response.json();
        setProducts(data.products);
        populateWishlist(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

  // Storing wishlist
  const [wishlist, setWishlist] = useState({});
  const populateWishlist = (items) => {
    const allProductIds = {};
    items.forEach(element => {
      allProductIds[element.id] = false;
    });
    setWishlist(allProductIds);
  }

  // Create recommendations
  const[recommendations, setRecommendations] = useState({});
  const[recommendationBody, setRecommendationBody] = useState("");
  const createRecommendations = (usersAnswers) => {
    // Storing type of hair into a lower case string, only the first 4 characters for better search
    let typeOfHair = String(usersAnswers[0]).toLocaleLowerCase().substring(0,4);
    
    // Storing all recommendations
    const recommendationsArray = [];
    // Filtering by hair type
    for (let index = 0; index < products.length; index++) {
      const parser = new DOMParser();
      const body = parser.parseFromString(products[index].body_html, "text/html");
      const bodyText = body.body.textContent;

      // Checking if body includes type of hair
      if(bodyText.includes(typeOfHair)){
        recommendationsArray.push(products[index]);
        setRecommendationBody(bodyText);
      }
    }
    setRecommendations(recommendationsArray);
  }

  //  Function passed to Main Page to control whether Quiz Page is to be shown
  const startQuiz = () => {
    setMainPage(false);
    setShowQuiz(true);
    setDiscoverResults(false);
  };
  // Function passed to Quiz Page for handling Returning back to Main page
  const returnBack = () => {
    setShowQuiz(false);
    setDiscoverResults(false);
    setMainPage(true);
  }

  // Function passed to Quiz Page for handling completion of test
  const completeTest = () => {
    fetchProducts();
    createRecommendations(answers);
    setShowQuiz(false);
    setMainPage(false);
  }

  useEffect(() => {
    if (recommendations.length > 0) {
    setDiscoverResults(true);
    }
  }, [recommendations]);

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
          <DiscoverResults results={answers} productsList={recommendations} retakeQuiz={returnBack} wishlist= {wishlist} setWishlist={setWishlist} text={recommendationBody}/>
        </div>
      );
   
}

export default App;
