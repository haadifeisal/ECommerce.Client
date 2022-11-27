import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([
      {
        name: "Fifa 23",
        price: 799
      },
      {
        name: "Xbox 360",
        price: 2999
      }
  ]);

  useEffect(() => {
    fetch('https://localhost:44374/api/Product')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  function addProductHandler(){
    setProducts([...products, {name: "GTA VI", price: 599}]);
  }

  return (
    <div className="app">
      {products.map((product, index) => (
        <h1>{product.name} {index}</h1>
      ))}
      <button onClick={addProductHandler}>Add Product</button>
    </div>
  );
}

export default App;
