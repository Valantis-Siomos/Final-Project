import { useCallback, useEffect, useState } from "react";
import axios from "axios";



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
      <h1>hello</h1>
    </div>
  );
}

export default App;
