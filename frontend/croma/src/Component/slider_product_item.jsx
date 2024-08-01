import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Accessories from '../assets/products_icon/Accessories.webp';
import AirConditioner from '../assets/products_icon/Air_Conditioner.webp';
import Cameras from '../assets/products_icon/Cameras.webp';
import Coolers from '../assets/products_icon/Coolers.webp';
import Fans from '../assets/products_icon/Fans.webp';
import Grooming from '../assets/products_icon/Grooming.webp';
import HeadSet from '../assets/products_icon/Head_set.webp';
import HomeTheatres from '../assets/products_icon/Home_theatres.webp';
import KitchenAppliances from '../assets/products_icon/Kitchen_Appliances.webp';
import Laptops from '../assets/products_icon/Laptops.webp';
import Microwaves from '../assets/products_icon/Microwaves.webp';
import Mobile from '../assets/products_icon/Mobile.webp';
import RefBiysg from '../assets/products_icon/Ref_biysg.webp';
import Speaker from '../assets/products_icon/Speaker.webp';
import Tablets from '../assets/products_icon/Tablets.webp';
import TV from '../assets/products_icon/TV.webp';
import WashingMachines from '../assets/products_icon/Washing_machines.webp';
import Wearables from '../assets/products_icon/Wearables.webp';
import img1 from '../assets/bank_account/HP_2Split_MFYMP_ICICI.webp';
import img2 from '../assets/bank_account/HP_TataNeuCards.webp'
function SliderProductItem() {
  const [data] = useState([
    Accessories, AirConditioner, Cameras, Coolers, Fans, Grooming, HeadSet, HomeTheatres,
    KitchenAppliances, Laptops, Microwaves, Mobile, RefBiysg, Speaker, Tablets, TV, WashingMachines, Wearables
  ]);
  const boxRef = useRef(null);

  const btnPressPrev = () => {
    if (boxRef.current) {
      const width = boxRef.current.clientWidth;
      boxRef.current.scrollLeft -= width;
    }
  };

  const btnPressNext = () => {
    if (boxRef.current) {
      const width = boxRef.current.clientWidth;
      boxRef.current.scrollLeft += width;
    }
  };

  return (
    <div className="image-gallery">
      <div className="product-carousel">
        <button className="pre-btn" onClick={btnPressPrev}>
          <p><i className="fa-solid fa-angle-left"></i></p>
        </button>
        <button className="next-btn" onClick={btnPressNext}>
          <p><i className="fa-solid fa-angle-right"></i></p>
        </button>
        <div className="productImage" ref={boxRef}>
          {data.map((product, index) => (
            <div className='card' key={index}>
              <Link to="">
                <img src={product} id='card_img' alt={`Product ${index + 1}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='bankOffer'>
        <div>
            <img src={img1} alt="" />
        </div>
        <div>
            <img src={img2} alt=""/>
        </div>
      </div>
    </div>
  );
}

export default SliderProductItem;
