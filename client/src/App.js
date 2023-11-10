
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import Navbar from "./components/navBar";
import Footer from "./components/footer";
import ProductListByCategory from "./components/ProductListByCategory";
import AddProduct from "./components/product";



function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<AddProduct />} />
        <Route path="/category/:category" element={<ProductListByCategory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);
}

export default App;










// import axios from "axios";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState, useEffect, useCallback } from "react";
// import Register from "./components/register";
// import Login from "./components/login";
// import Navbar from "./components/navBar";
// import List from "./components/list";
// import AddProduct from "./components/product";
// import Footer from "./components/footer";

// function App() {
//   const [product, setProduct] = useState([]);

//   const getAllProducts = useCallback(async () => {
//     try {
//       const response = await axios.get("http://localhost:8000");
//       setProduct(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);
//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/form"
//           element={<AddProduct  getAllProducts={getAllProducts} />}
//         />
//         <Route
//           path="/"
//           element={<List product={product} getAllProducts={getAllProducts} />}
//         />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/register" element={<Register/>} />
//       </Routes>
//       <Footer/>
//     </BrowserRouter>
//   );
// }

// export default App;
