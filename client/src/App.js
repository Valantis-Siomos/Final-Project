import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Register from "./components/register";
import Login from "./components/login";
import Navbar from "./components/navBar";
import List from "./components/list";
import AddProduct from "./components/product";

function App() {
  const [product, setProduct] = useState([]);

  const getAllProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000");
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/form"
          element={<AddProduct  getAllProducts={getAllProducts} />}
        />
        <Route
          path="/"
          element={<List product={product} getAllProducts={getAllProducts} />}
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
