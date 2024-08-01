import { useEffect, useState } from "react";
import img1 from "../assets/slider_img1.webp";
import img2 from "../assets/slider_img2.webp";
import img3 from "../assets/slider_img3.webp";
import img4 from "../assets/slider_img4.webp";
import img5 from "../assets/slider_img5.webp";
import img6 from "../assets/slider_img6.webp";
import img7 from "../assets/slider_img7.webp";
import img8 from "../assets/slider_img8.webp";

function SliderHome() {
  const [array] = useState([img1, img2, img3, img4, img5, img6, img7, img8]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === array.length - 1 ? 0 : prevIndex + 1
        ),
      3500
    );

    return () => clearTimeout(timer);
  }, [index, array.length]);

  return (
    <>
      <div className="main_wrapper_slider">
        <div className="slider">
          <div className="slideshow">
            <div
              className="slideshowSlider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {array.map((backgroundImage, idx) => (
                <div className="slide" key={idx}>
                  <img src={backgroundImage} alt={`Slide ${idx + 1}`} />
                </div>
              ))}
            </div>

            <div className="slideshowDots">
              {array.map((_, idx) => (
                <div
                  key={idx}
                  className={`slideshowDot${index === idx ? " active" : ""}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderHome;
