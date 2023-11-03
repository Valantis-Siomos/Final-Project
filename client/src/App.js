import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import AddProduct from "./components/adminProduct";



function App() {
  const [product, setProduct] = useState([]);

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
      <h1>La Casa</h1>
      <AddProduct getAllProducts={getAllProducts} />

    </div>
  );
}

export default App;
