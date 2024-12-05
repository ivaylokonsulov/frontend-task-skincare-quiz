/* Main page component*/
function MainPage({onStartQuiz}) {
    return (
        <>
        <div className="main-page">
            <div className="main-page-img-div">
                <div className='main-page-content-div'>
                    <div className='main-page-title-div'>
                            Build a self care routine suitable for you
                    </div>
                    <div className='main-page-subtitle-div'>
                        Take out test to get a personalised self care routine based on your needs.
                    </div>
                    <div className="main-page-button-div">
                        <button className='start-the-quiz-button' onClick={onStartQuiz}>
                            Start the quiz
                        </button>    
                    </div>
                </div>
            </div>
        <p>
        </p>
      </div>
      </>
    );
  }

  export default MainPage;