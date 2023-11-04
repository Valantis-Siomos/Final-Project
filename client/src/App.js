import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import ProductList from "./components/productList";




function App() {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      await axios.get("http://localhost:8000")
      .then((res) => setProducts(res.data));
      // console.log(products);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="/" element = {<Home /> }/>
      <Route path="/login" element={<Login login={Login}/>} />
      <Route path="/register" element={<Register register={Register} />}/>
      <Route path="/form" element={<Home getAllProducts={getAllProducts} />}/>
      {/* <Route path="/home" element={<Home home={Home}/>}/> */}
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;


// <h1>La Casa</h1>
//       <AddProduct getAllProducts={getAllProducts} 