import { useEffect, useState } from "react";
import Loading from "../Component/Loading";
import Error from "../Component/Error";
import { NavLink, useSearchParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Filter from "../Component/Filter";
import { FaRegHeart } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useWishlistCart } from "../context/wishList";

function Televisions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { addToWishlist } = useWishlistCart();

  function getRandomInt(min = 1, max = 500) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(price);
  }

  async function fetchData(url) {
    try {
      setLoading(true);
      const priceSort = searchParams.get('priceSort');
      const ratingSort = searchParams.get('ratingSort');
      const brandSort = searchParams.get('brandSort');
      const res = await fetch(`${url}?limit=${limit}&skip=${skip}${priceSort ? `&priceSort=${priceSort}` : ''}${ratingSort ? `&ratingSort=${ratingSort}` : ''}${brandSort ? `&brandSort=${brandSort}` : ''}`);
      if (res.ok) {
        const result = await res.json();
        setLoading(false);
        if (skip === 0) {
          setData(result.data); 
        } else {
          setData((prevData) => [...prevData, ...result.data]); 
        }
        setTotalItems(result.totalItems);
      } else {
        const errorResult = await res.json();
        setErrorMsg(errorResult.msg);
        throw new Error(errorResult.msg || 'Failed to fetch data');
      }
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData('https://croma-backend-1.onrender.com/fetchData/television');
  }, [skip, searchParams]);

  const handleViewMore = () => {
    const newSkip = skip + limit;
    setSkip(newSkip);
  };

  const handleFilterChange = (newSearchParams) => {
    setSkip(0);
    setData([]); 
    setSearchParams(newSearchParams);
  };

  function truncateTitle(title, wordLimit) {
    const words = title.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return title;
  }

  if (loading) return <Loading />;
  if (error) return <Error message={errorMsg} />;
  
  return (
    <>
      <div className="product_heading">
        <h2>Televisions & Accessories <span style={{ fontSize: "16px" }}>({totalItems})</span></h2>
      </div>
      <Filter setSearchParams={handleFilterChange} searchParams={searchParams} />
      <div className="main_items_container">
        {data && data.length > 0 ? (
          <>
            {data.map((item) => (
              <div key={item._id} className="product">
                <div className="item">
                  <img src={item.image} alt={item.title} className="product_image" />
                  <div className="wishList_icon" onClick={() => { addToWishlist(item) }}>
                    <FaRegHeart fontSize={"1.2rem"} />
                  </div>
                  <NavLink to={`/television/${item._id}`}>
                    <div className="view_icon">
                      <FaEye fontSize={"1.2rem"} />
                    </div>
                  </NavLink>
                  <h3>{truncateTitle(item.title, 15)}</h3>
                  <p className="rating_container">
                    <span className="rating">{item.rating}</span>
                    <FaStar style={{ color: "#12DAA8", marginRight: ".2rem" }} />
                    <span className="review" style={{ borderRadius: "2px", fontWeight: "300", color: "white" }}>
                      ({getRandomInt()})
                    </span>
                  </p>
                  <div className="price_container" style={{ display: "flex", gap: ".5rem", alignItems: "center", marginLeft: ".5rem" }}>
                    <p style={{ color: "white", fontSize: "1.2rem", fontWeight: 700 }}>
                      {formatPrice(item.aprice)}
                    </p>
                    <p style={{ textDecoration: 'line-through', color: "rgb(244, 244, 244)" }}>
                      {formatPrice(item.pprice)}
                    </p>
                    <p style={{ fontSize: "12px", color: "rgb(151, 151, 151)" }}>
                      ({item.savemoney})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No televisions available</div>
        )}
      </div>
      {data.length < totalItems && (
        <div className="view_box">
          <button onClick={handleViewMore} className="view_btn">View More</button>
        </div>
      )}
    </>
  );
}

export default Televisions;
