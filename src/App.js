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
  const [showMainPage, setMainPage] = useState(() => JSON.parse(localStorage.getItem('mainPage')) ?? true);
  // Handling showing quiz page
  const [showQuiz, setShowQuiz] = useState(() => JSON.parse(localStorage.getItem('quiz')) ?? false);
  // Handling discovering results
  const [showDiscoverResults, setDiscoverResults] = useState(() => JSON.parse(localStorage.getItem('discoverResults')) ?? false);
  // Fetching data from endpoint
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) ?? []);
 // Storing wishlist
 const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) ?? {});
 // Create recommendations
 const [recommendations, setRecommendations] = useState(() => JSON.parse(localStorage.getItem('recommendations')) ?? {});
 const [recommendationBody, setRecommendationBody] = useState(() => localStorage.getItem('recommendationBody') ?? "");
 // Use state for answering questions. Creating an empty array to fill inset
 const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem('answers')) ?? Array(5).fill(null));

 // Save state to localStorage when it changes
 useEffect(() => {
  localStorage.setItem('quiz', JSON.stringify(showQuiz));
  localStorage.setItem('discoverResults', JSON.stringify(showDiscoverResults));
  localStorage.setItem('mainPage', JSON.stringify(showMainPage));
  localStorage.setItem('answers', JSON.stringify(answers));
  localStorage.setItem('recommendations', JSON.stringify(recommendations));
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  localStorage.setItem('recommendationBody', recommendationBody);
  localStorage.setItem('products', JSON.stringify(products));
}, [showQuiz, showMainPage, showDiscoverResults, answers, recommendations, wishlist, recommendationBody, products]);

// Load state from localStorage on initial render
useEffect(() => {
  const quiz = localStorage.getItem('quiz');
  console.log(quiz);
  const discoverResults = localStorage.getItem('discoverResults');
  console.log(discoverResults);
  const mainPage = localStorage.getItem('mainPage');
  console.log(mainPage);
  const savedAnswers = localStorage.getItem('answers');
  console.log(savedAnswers);
  const savedRecommendations = localStorage.getItem('recommendations');
  console.log(savedRecommendations);
  const savedWishlist = localStorage.getItem('wishlist');
  console.log(savedWishlist);
  const savedBody = localStorage.getItem('recommendationBody');
  console.log(savedBody);
  const products = localStorage.getItem('products');
  console.log(products);

  if (discoverResults) setDiscoverResults(JSON.parse(discoverResults));
  if (mainPage) setMainPage(JSON.parse(mainPage));
  if (quiz) setShowQuiz(JSON.parse(quiz));
  if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
  if (savedRecommendations) setRecommendations(JSON.parse(savedRecommendations));
  if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  if (savedBody) setRecommendationBody(savedBody);
  if(products) setProducts(JSON.parse(products));
}, []); // Empty dependency in order to ensure running only on initial rendering of the app

  const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        );
        const data = await response.json();
        setProducts(data.products);
        populateWishlist(data.products);
        createRecommendations(answers);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

 
  const populateWishlist = (items) => {
    const allProductIds = {};
    items.forEach(element => {
      allProductIds[element.id] = false;
    });
    setWishlist(allProductIds);
  }
  
  const createRecommendations = (usersAnswers) => {
    // Storing type of hair into a lower case string, only the first 4 characters for better search
    let typeOfHair = String(usersAnswers[0]).toLocaleLowerCase().substring(0,4);
    
    // Storing what is troubling the user
    let userTrouble = String(usersAnswers[3].toLocaleLowerCase());

    // Storing all recommendations to later update state
    var recommendationsArray = [];

    // Storing body text to later update state
    var text = "";

    // Traversing through all products, attempting to make recommendations
    for (let index = 0; index < products.length; index++) {
      const parser = new DOMParser();
      const body = parser.parseFromString(products[index].body_html, "text/html");
      const bodyText = body.body.textContent;

      if (!recommendationsArray.includes(products[index])){
      // Checking if type of hair or problem that is troubling the user is iincluded in body / title 
      if(bodyText.includes(typeOfHair) || bodyText.includes(userTrouble) ||
        products[index].title.includes(typeOfHair) || products[index].title.includes(userTrouble) ||
        products[index].tags.includes(typeOfHair) || products[index].tags.includes(userTrouble))
          recommendationsArray.push(products[index]);

          // Setting the recommendation text for the first product in recommendations
          if (recommendationsArray.length === 1){
            text = bodyText;
          }
      }

      // Checking if type of hair or problem that is troubling the user is iincluded in tags
      for (let index = 0; index < products[index].tags.length; index++) {
        const element = products[index].tags[index];
        if(element.includes(typeOfHair) || element.includes(userTrouble)){
          recommendationsArray.push(products[index]);

          // Setting the recommendation text for the first product in recommendations
          if (recommendationsArray.length === 1){
            text = bodyText;
          }
        }
      }
    }

    // Recommendation text if there are no recommendations
    const freeText = "Feel free to browse and choose from a variety of items! There are plethora of skin/hair care products covering wide range of hari/skin types!";
    text=== "" ? setRecommendationBody(freeText) : setRecommendationBody(text);
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
    setRecommendationBody("");
  }

  // Function passed to Quiz Page for handling completion of test
  const completeTest = () => {
    fetchProducts();
    setShowQuiz(false);
    setMainPage(false);
  }

  useEffect(() => {
    if (recommendations.length > 0) {
    setDiscoverResults(true);
    }
  }, [recommendations]);

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
          <DiscoverResults results={answers} 
          productsList={recommendations.length > 1 ? recommendations : products} 
          retakeQuiz={returnBack} 
          wishlist= {wishlist} 
          setWishlist={setWishlist} 
          text={recommendationBody}/>
        </div>
      );
   
}

export default App;
