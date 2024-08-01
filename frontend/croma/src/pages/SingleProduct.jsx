import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import '../style/singleProduct.css';
import { FaStar } from "react-icons/fa";
import Accordian from '../Component/Accordian';
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import Footer from '../Component/Footer';

function getRandomInt(min = 1, max = 500) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/fetchData/television/${id}`); 
        if (!response.ok) {
          const errorResult = await response.json();
          setErrorMsg(errorResult.msg);
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={errorMsg} />;

  return (
    <>
    <div className='main_wrapper_container'>
      {product ? (
        <div className='product_container'>
          <div className="single_left_box">
            <div className='image_hero_box'>
            <img src={product.image} alt={product.title} className='hero_image' />
            </div>
            <div className='cart_btn'>
            <button className='btn'>Add To WishList <FaHeart fontSize={"18px"} /></button>
            <button className='btn'>Add To Cart <FaCartPlus fontSize={"18px"}/></button>
            </div>
          </div>
          <div className="single_right_box">
            <h1 className='product_title'>{product.title}</h1>
            <div className='option_for_order'>
              <div>Never Before Price</div>
              <div>No Cost EMI</div>
            </div>
            <div className='rating_section'>
              <p>
                <span className="rating">{product.rating}</span>
                <FaStar style={{ color: "#12DAA8", marginRight: ".2rem",marginLeft:".2rem",fontSize: "14px" }} />
                <span className="review" style={{ borderRadius: "2px" ,fontSize: "14px"}}>
                  ({getRandomInt()} rating and review {getRandomInt()})
                </span>
              </p>
            </div>
            <div className='price_section'>
              <p className='actual_price'><strong> <span>₹</span>{parseInt(product.aprice)}</strong></p>
              
            </div>
            <div className="price_discount">
              <p className='previous_parice'>MRP:₹{product.pprice}</p>
              <p className='discount'>( {product.savemoney} )</p>
            </div>
            <div className='middle_box_features'>
              <div className='box first_box'>
                <div className='radio_btn'></div>
                <div className='radio_content'>With Exchange</div>
              </div>
              <div className='box'>
              <div className='radio_btn'></div>
              <div className='radio_content'>Without Exchange</div>
              </div>
            </div>


            <div className='shipping_details'>
              <div>
                <i className="fa-solid fa-truck-fast"></i>
                <span>    free shipping AnyWhere in india</span>
            
              </div>
            </div>
            <div className='key_features middle_box_features'>
              <h3>Key Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>No product found</div>
      )}
       <div className='Accordian'>
            <Accordian/>
          </div>
    </div>
    <Footer/>
    </>
  );
}

export default SingleProduct;
