import ProductsSlider from "./ProductSlider";

function DiscoverResuilts({ answers, productsList, retakeQuiz, wishlist, setWishlist, recommendationText }){

    
    return(
        <div className="main-div">
            <div className="image-div">
                <div className="title-text-div">
                    <div className="title-div">
                        Build your everyday self care routine.
                    </div>
                    <div className="subtitle-div">
                        {recommendationText}
                    </div>
                    <div className="button-div">
                        <button className="retake-quiz-button" onClick={retakeQuiz}>
                            Retake the quiz
                        </button>
                    </div>
                </div>
            </div>
            <div className="recommended-products-div">
                    {<ProductsSlider products={productsList} wishlist={wishlist} setWishlist={setWishlist}/>}
                </div>
        </div>
    )
}

export default DiscoverResuilts;