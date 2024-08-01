import { IoFilterCircleOutline } from "react-icons/io5";
import PriceSort from "../Component/priceSort"; 
import "../style/productpage.css";
import RatingFilter from "./Rating";
import BrandFilter from "./BrandFilter";

function Filter({ setSearchParams, searchParams }) {
  return (
    <div className="sortFeature">
      <div className="sort_left">
        <p className="filter_bar">All Filters <IoFilterCircleOutline /></p>
      </div>
      <div className="sort_right">
        <div className="first_filter">
          <PriceSort setSearchParams={setSearchParams} searchParams={searchParams} />
        </div>
        <div className="second_filter" >
          <RatingFilter setSearchParams={setSearchParams} searchParams={searchParams}/>
        </div>
        <div className="third">
          <BrandFilter setSearchParams={setSearchParams} searchParams={searchParams}/>
        </div>
      </div>
    </div>
  );
}

export default Filter;
