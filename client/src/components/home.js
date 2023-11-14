import { useState, useEffect } from "react";
import axios from "axios";
// import react from "react";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <h1>Categories</h1>
      {categories.map((category) => (
        <Link
          to={`/category/${encodeURIComponent(category)}`} 
          key={category}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="categoriesDiv">
            {category}
          </div>
        </Link>
      ))}
    </div>
  );
}


export default Home;
