import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import category1 from "../assets/category1.jpeg";
import category2 from "../assets/category2.jpg";
import category3 from "../assets/category3.jpg";
import category4 from "../assets/category4.jpg";
import "./carousel.css"

const Carousel = (categories) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySapeed: 3000,
  };

  

  return (
    <Slider {...settings}>
      <div className='carousel-image'>
        <img className='imgcar' src={category1} alt="Category 1" style={{
                  width: "1903px", 
                  height: "630px", 
                  objectFit: "cover",
                //   marginLeft: "651px",
                  marginTop: "50px",
                }} />
                <p style={{ marginTop: "-100px", color: "black", fontSize: "40px", fontWeight: 'bold' }}>BEDROOM</p>
      </div>
      <div className='carousel-image'>
        <img src={category2} alt="Category 2" style={{
                   width: "1903px",
                   height: "600px",
                  objectFit: "cover",
                //   marginLeft: "-10px",
                marginTop: "50px",
                }}/>
                <p style={{ marginTop: "-100px", color: "black", fontSize: "40px", fontWeight: 'bold' }}>DECORATION</p>
      </div>
      <div className='carousel-image'>
      <img src={category3} alt="Category 3" style={{
                   width: "1903px",
                   height: "600px",
                  objectFit: "cover",
                //   marginLeft: "-10px",
                marginTop: "50px",
                }}/>
                <p style={{ marginTop: "-100px", color: "black", fontSize: "40px", fontWeight: 'bold' }}>OFFICE</p>
      </div>
      <div className='carousel-image'>
      <img src={category4} alt="Category 4" style={{
                   width: "1903px",
                   height: "600px",
                  objectFit: "cover",
                //   marginLeft: "-10px",
                marginTop: "50px",
                }}/>
                <p style={{ marginTop: "-100px", color: "black", fontSize: "40px", fontWeight: 'bold' }}>LIVING</p>
      </div>
    </Slider>
  );
};

export default Carousel;