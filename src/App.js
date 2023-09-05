import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // React Router v6'da Routes kullanılır
import ProductList from "./pages/ProductList.jsx";
import ProductDetails from "./pages/ProductDetails.jsx"; // Yeni component'inizi eklediğinizden emin olun

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {" "}
          {/* Switch yerine Routes kullanılır */}
          <Route path="/" element={<ProductList />} />{" "}
          {/* element prop kullanılır */}
          <Route
            path="/products/:productId"
            element={<ProductDetails />}
          />{" "}
          {/* element prop kullanılır */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
