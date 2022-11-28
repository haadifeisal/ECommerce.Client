import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from '../models/product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:44374/api/Product')
    .then(response => response.json())
    .then(data => setProducts(data));
  }, []);
  
  function addProduct(){
    setProducts([...products, {
      name: "The Wire DVD",
       price: 399,
       brand: "dvds",
       description: "test",
       id: "guid",
       pictureUrl: "www.google.se"
    }]);
  }

  return (
    <>
      <Typography variant='h1'>Shoppify</Typography>
      <Catalog products={products} addProduct={addProduct}></Catalog>
    </>
  );
}

export default App;
