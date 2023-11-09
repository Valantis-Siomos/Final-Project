import { useState, useEffect } from "react";
import axios from "axios";
// import react from "react";

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

  return (
    <div>
    <h1>Categories</h1>
    {categories.map((category) => (
      <div className="categoriesDiv" key={category}>{category}</div>
    ))}
  </div>
);
}

export default Home;
