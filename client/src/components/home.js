import { useState, useEffect } from "react";
import axios from "axios";
// import react from "react";
import { Link } from "react-router-dom";
import category1 from "../assets/category1.jpeg";
import category2 from "../assets/category2.jpg";
import category3 from "../assets/category3.jpg";
import category4 from "../assets/category4.jpg";
import Carousel from "./carousel";
import "./home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("error from Home categories", error);
      });
  }, []);

  // const handleCategoryClick = (category) => {
  //   console.log(`Clicked category: ${category}`);
  // };
  const categoryPhotos = {
    // Add entries for each category and its corresponding photo URL
    Bedroom: category1,
    Decoration: category2,
    Office: category3,
    Living: category4,
    
  };


  

  

  return (
    <div className="categoriesContainer">
      <Carousel />
      <h1> maybe carousel here... </h1>
      <div className="categoriesGrid">
        {categories.map((category) => (
          <Link
            to={`/category/${encodeURIComponent(category)}`}
            key={category}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="categoriesContainerItem">
              <img
                src={categoryPhotos[category]}
                alt={`${category} thumbnail`}
                style={{
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                }}
              />
              <p className="categoryText">{category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}




export default Home;
