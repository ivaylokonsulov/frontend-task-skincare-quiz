import ProductsSlider from "./ProductSlider";

function DiscoverResuilts({ answers, productsList, retakeQuiz, wishlist, setWishlist }){

    
    return(
        <div className="main-div">
            <div className="image-div">
                <div className="title-text-div">
                    <div className="title-div">
                        Build your everyday self care routine.
                    </div>
                    <div className="subtitle-div">
                        Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day.
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