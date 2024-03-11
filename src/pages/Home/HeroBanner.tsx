import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import auctionbanner1 from "../../assets/images/auctionbanner1.jpg";
import auctionbanner2 from "../../assets/images/auctionbanner2.jpg";
import auctionbanner3 from "../../assets/images/auctionbanner3.webp";
import logo from "../../assets/images/logo.png";
import styles from "./home.module.css";

export default function HeroBanner() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={logo} alt="SwiftBid Logo" className={styles.sliderImage} />
        </div>
        <div>
          <img
            src={auctionbanner1}
            alt="SwiftBid Promotion Banner"
            className={styles.sliderImage}
          />
        </div>
        <div>
          <img
            src={auctionbanner2}
            alt="SwiftBid Promotion Banner"
            className={styles.sliderImage}
          />
        </div>
        <div>
          <img
            src={auctionbanner3}
            alt="SwiftBid Promotion Banner"
            className={styles.sliderImage}
          />
        </div>
      </Slider>
    </div>
  );
}
