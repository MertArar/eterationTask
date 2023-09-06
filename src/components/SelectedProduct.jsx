import React from "react";

const SelectedProduct = ({ selectedProducts, handleQuantityChange }) => {
  return (
    <>
      <div className="flex flex-col mt-10 bg-white p-4 rounded shadow w-[273px]">
        <div>
          {selectedProducts.map((product) => (
            <div key={product.id} className="mb-2">
              <div className="flex items-center">
                <div className="flex-grow">
                  <p>{product.name}</p>
                  <p className="text-[#2A59FE] font-bold">${product.price}</p>
                </div>
                <div className="flex-none">
                  <button
                    className="px-4 py-1 bg-[#f3f3f6] text-[#616b8a] font-bold rounded"
                    onClick={() =>
                      handleQuantityChange(
                        product,
                        product.quantity > 0 ? product.quantity - 1 : 0
                      )
                    }
                  >
                    -
                  </button>
                  <span className="px-2 py-1 bg-[#2a59fe] text-white">
                    {product.quantity}
                  </span>
                  <button
                    className="px-4 py-1 bg-[#f3f3f6] text-[#616b8a] font-bold rounded"
                    onClick={() =>
                      handleQuantityChange(product, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectedProduct;
