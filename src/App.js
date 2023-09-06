import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetails
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
