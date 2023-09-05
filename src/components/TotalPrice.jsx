import React from "react";

const TotalPrices = ({ selectedProducts }) => {
  const calculateTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  return (
    <div>
      <h2>Total Price: ${calculateTotalPrice()}</h2>
    </div>
  );
};

export default TotalPrices;
