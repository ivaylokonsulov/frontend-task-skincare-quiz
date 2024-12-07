import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fullHeart from './fullHeart.png';
import emptyHeart from './emptyHeart.png';

function ProductsSlider({ products, wishlist, setWishlist }) {
  // Handling clicking on heart icon
  const addOrRemoveItemToWishlist = (id) => {
    // Creating a copy of the wish list in order to insert new value
    setWishlist((prevWishlist => {
      const updatedWishList = {...prevWishlist};
      console.log(updatedWishList);
      updatedWishList[id] = updatedWishList[id] === false ? true : false;
      return updatedWishList;
    }))
    }
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
      <Slider {...settings}>
      {products.map((product) => (
        <div className="product-div" key={product.id}>
          <img className="product-image" src={product.images[0]?.src} alt={product.title}>
           </img>
          <img className="product-favourite" 
                src={`${wishlist[product.id] === true ? fullHeart : emptyHeart }`} 
                alt="favorite-icon" 
                onClick={() => addOrRemoveItemToWishlist(product.id)}/>
          <div className="product-title">{product.title}</div>
          <div className="product-price">${product.variants[0]?.price}</div>
        </div>
      ))}
    </Slider>
  );
}

export default ProductsSlider;