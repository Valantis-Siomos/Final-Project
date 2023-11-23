import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import category1 from "../assets/category1.jpeg";
import category2 from "../assets/category2.jpg";
import category3 from "../assets/category3.jpg";
import category4 from "../assets/category4.jpg";
import "./carousel.css";

const Carousel = (categories) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySapeed: 2000,
  };

  const handleImageClick = (category) => {
    window.location.href = `/category/${encodeURIComponent(category)}`;
  };

  return (
    <Slider {...settings}>
      <div className="carousel-image">
        <img
          className="imgcar"
          src={category1}
          alt="Category 1"
          style={{
            width: "1200px",
            height: "630px",
            objectFit: "cover",
            marginTop: "50px",
            marginLeft: "351.5px",
          }}
          onClick={() => handleImageClick("Bedroom")}
        />
        <p
          style={{
            marginTop: "-100px",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          BEDROOM
        </p>
      </div>
      <div className="carousel-image">
        <img
          src={category2}
          alt="Category 2"
          style={{
            width: "1200px",
            height: "630px",
            objectFit: "cover",
            marginTop: "50px",
            marginLeft: "351.5px",
          }}
          onClick={() => handleImageClick("Decoration")}
        />
        <p
          style={{
            marginTop: "-100px",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          DECORATION
        </p>
      </div>
      <div className="carousel-image">
        <img
          src={category3}
          alt="Category 3"
          style={{
            width: "1200px",
            height: "600px",
            objectFit: "cover",
            marginTop: "50px",
            marginLeft: "351.5px",
          }}
          onClick={() => handleImageClick("Office")}
        />
        <p
          style={{
            marginTop: "-100px",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          OFFICE
        </p>
      </div>
      <div className="carousel-image">
        <img
          src={category4}
          alt="Category 4"
          style={{
            width: "1200px",
            height: "600px",
            objectFit: "cover",
            marginTop: "50px",
            marginLeft: "351.5px",
          }}
          onClick={() => handleImageClick("Living")}
        />
        <p
          style={{
            marginTop: "-100px",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          LIVING
        </p>
      </div>
    </Slider>
  );
};

export default Carousel;
