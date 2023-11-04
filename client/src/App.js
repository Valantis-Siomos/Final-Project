import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./components/adminProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";





function App() {
  const [products, setProduct] = useState([]);

  const getAllProducts = useCallback(async () => {
    try {
      const responce = await axios.get("http://localhost:8000");
      setProduct(responce.data);
    } catch (error) {
      console.log(error)
    }
  },[]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
      {/* <Route path="/" element = {<Home /> }/> */}
      <Route path="/login" element={<Login login={Login}/>} />
      <Route path="/register" element={<Register register={Register} />}/>
      <Route path="/home" element={<Home home={Home}/>}/>
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;


// <h1>La Casa</h1>
//       <AddProduct getAllProducts={getAllProducts} 