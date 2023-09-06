import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import SelectedProduct from "../components/SelectedProduct";
import TotalPrices from "../components/TotalPrice";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const [sortOptions, setSortOptions] = useState({
    priceLowToHigh: false,
    priceHighToLow: false,
    dateNewToOld: false,
    dateOldToNew: false,
  });

  const [filterCriteria, setFilterCriteria] = useState({
    startDate: null,
    endDate: null,
    minPrice: null,
    maxPrice: null,
    selectedNames: [], // Değişen isimler için yeni bir state ekledik.
  });

  const [selectedModel, setSelectedModel] = useState("");

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const sortProducts = () => {
      let sorted = [...filteredProducts];
      if (sortOptions.priceLowToHigh) {
        sorted = sorted.sort((a, b) => a.price - b.price);
      }
      if (sortOptions.priceHighToLow) {
        sorted = sorted.sort((a, b) => b.price - a.price);
      }
      if (sortOptions.dateNewToOld) {
        sorted = sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      if (sortOptions.dateOldToNew) {
        sorted = sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }
      setFilteredProducts(sorted);
    };

    sortProducts();
  }, [sortOptions, filteredProducts]);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      // Diğer filtreleme kriterleri burada...

      // Modeli filtrele
      if (selectedModel) {
        filtered = filtered.filter(
          (product) => product.model === selectedModel
        );
      }

      // Seçilen isimlere göre filtrele
      if (filterCriteria.selectedNames.length > 0) {
        filtered = filtered.filter((product) =>
          filterCriteria.selectedNames.includes(product.name)
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [filterCriteria, products, selectedModel]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleQuantityChange = (product, newQuantity) => {
    const updatedSelectedProducts = selectedProducts.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleNameSelect = (name) => {
    const selectedNames = [...filterCriteria.selectedNames];
    if (selectedNames.includes(name)) {
      selectedNames.splice(selectedNames.indexOf(name), 1);
    } else {
      selectedNames.push(name);
    }
    setFilterCriteria({ ...filterCriteria, selectedNames });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleSortOptionChange = (option) => {
    setSortOptions({ ...sortOptions, [option]: !sortOptions[option] });
  };

  const searchProducts = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    const selectedProductIndex = selectedProducts.findIndex(
      (p) => p.id === product.id
    );

    if (selectedProductIndex === -1) {
      // Ürün seçili değilse, yeni bir öğe olarak ekleyin
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    } else {
      // Ürün zaten seçiliyse, miktarını artırın
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[selectedProductIndex].quantity += 1;
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  return (
    <div>
      <Navbar
        searchProducts={searchProducts}
        walletAmount={1000}
        userName="Kerem"
      />

      <div className="flex flex-col md:justify-center lg:flex-row md:flex-row">
        <div className="w-full md:w-1/4 md:justify-center p-4">
          {/* Sort By Kartı */}
          <div className="bg-white p-4 rounded shadow w-[220px]">
            <h2 className="text-lg font-semibold mb-2">Sort By</h2>
            <div className="mb-2">
              <input
                type="checkbox"
                id="priceLowToHigh"
                checked={sortOptions.priceLowToHigh}
                onChange={() => handleSortOptionChange("priceLowToHigh")}
              />
              <label htmlFor="priceLowToHigh" className="ml-2">
                Price low to high
              </label>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                id="priceHighToLow"
                checked={sortOptions.priceHighToLow}
                onChange={() => handleSortOptionChange("priceHighToLow")}
              />
              <label htmlFor="priceHighToLow" className="ml-2">
                Price high to low
              </label>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                id="dateNewToOld"
                checked={sortOptions.dateNewToOld}
                onChange={() => handleSortOptionChange("dateNewToOld")}
              />
              <label htmlFor="dateNewToOld" className="ml-2">
                New to Old
              </label>
            </div>
            <div className="mb-2">
              <input
                type="checkbox"
                id="dateOldToNew"
                checked={sortOptions.dateOldToNew}
                onChange={() => handleSortOptionChange("dateOldToNew")}
              />
              <label htmlFor="dateOldToNew" className="ml-2">
                Old to New
              </label>
            </div>
          </div>

          {/* Ürün İsimleri Kartı */}
          <div className="bg-white p-4 rounded shadow mt-4 w-[220px]">
            <h2 className="text-lg font-semibold mb-2">Brands</h2>
            <div className="overflow-y-auto max-h-36">
              {products.map((product) => (
                <div key={product.id} className="mb-2">
                  <input
                    type="checkbox"
                    id={product.name}
                    name={product.name}
                    value={product.name}
                    checked={filterCriteria.selectedNames.includes(
                      product.name
                    )}
                    onChange={() => handleNameSelect(product.name)}
                  />
                  <label htmlFor={product.name} className="ml-2">
                    {product.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Modeller Kartı */}
          <div className="bg-white p-4 rounded shadow mt-4 w-[220px]">
            <h2 className="text-lg font-semibold mb-2">Model</h2>
            <div className="overflow-y-auto max-h-36">
              {Array.from(
                new Set(products.map((product) => product.model))
              ).map((model) => (
                <div key={model} className="mb-2">
                  <input
                    type="radio"
                    id={model}
                    name="model"
                    value={model}
                    checked={selectedModel === model}
                    onChange={() => handleModelSelect(model)}
                  />
                  <label htmlFor={model} className="ml-2">
                    {model}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:ml-[-200px]  w-[1100px]">
          {/* Ürünlerin Listesi ve Sayfalama burada */}
          <div className="grid grid-cols-1 md:grid-cols-4  ">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
        <div>
          <SelectedProduct
            selectedProducts={selectedProducts}
            handleQuantityChange={handleQuantityChange}
          />
          <TotalPrices selectedProducts={selectedProducts} />
        </div>
      </div>

      <div className="flex justify-center mt-10 mb-10">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-2 p-2 rounded-lg ${
                i + 1 === currentPage ? "bg-white text-[#2A59FE]" : ""
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
