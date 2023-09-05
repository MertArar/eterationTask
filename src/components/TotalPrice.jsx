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
    <div className="flex flex-col mt-10 bg-white p-4 rounded shadow w-[273px]">
      <h2 className="text-lg">
        Total Price:{" "}
        <span className="text-[#2A59FE] font-bold">
          ${calculateTotalPrice()}
        </span>
      </h2>
      <button className="bg-[#2A59FE] text-white rounded-[2px] p-2 mt-6">
        Checkout
      </button>
    </div>
  );
};

export default TotalPrices;
