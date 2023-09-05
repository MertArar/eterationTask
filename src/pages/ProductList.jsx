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
    brand: "",
    model: "",
    selectedBrands: [],
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

      // Markayı filtrele
      if (filterCriteria.brand) {
        filtered = filtered.filter(
          (product) => product.brand === filterCriteria.brand
        );
      }

      // Seçilen markaları filtrele
      if (filterCriteria.selectedBrands.length > 0) {
        filtered = filtered.filter((product) =>
          filterCriteria.selectedBrands.includes(product.brand)
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBrandSelect = (brand) => {
    const selectedBrands = [...filterCriteria.selectedBrands];
    if (selectedBrands.includes(brand)) {
      selectedBrands.splice(selectedBrands.indexOf(brand), 1);
    } else {
      selectedBrands.push(brand);
    }
    setFilterCriteria({ ...filterCriteria, selectedBrands });
  };

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
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4 p-4">
          {/* Sort By Kartı */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Sort By</h2>
            <div className="mb-2">
              <input
                type="checkbox"
                id="priceLowToHigh"
                checked={sortOptions.priceLowToHigh}
                onChange={() => handleSortOptionChange("priceLowToHigh")}
              />
              <label htmlFor="priceLowToHigh" className="ml-2">
                Fiyat Düşükten Yükseğe
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
                Fiyat Yüksekten Düşüğe
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
                Yeniden Eskiye
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
                Eskiden Yeniye
              </label>
            </div>
          </div>

          {/* Markalar Kartı */}
          <div className="bg-white p-4 rounded shadow mt-4">
            <h2 className="text-lg font-semibold mb-2">Brands</h2>
            <div className="overflow-y-auto max-h-36">
              {products.map((product) => (
                <div key={product.id} className="mb-2">
                  <input
                    type="checkbox"
                    id={product.brand}
                    name={product.brand}
                    value={product.brand}
                    checked={filterCriteria.selectedBrands.includes(
                      product.brand
                    )}
                    onChange={() => handleBrandSelect(product.brand)}
                  />
                  <label htmlFor={product.brand} className="ml-2">
                    {product.brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Modeller Kartı */}
          <div className="bg-white p-4 rounded shadow mt-4">
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

          {/* Diğer filtre kartları burada ekleyin */}
        </div>

        <div className="w-full md:w-3/4 p-4">
          {/* Ürünlerin Listesi ve Sayfalama burada */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <SelectedProduct
            selectedProducts={selectedProducts}
            handleQuantityChange={handleQuantityChange}
          />
          <TotalPrices selectedProducts={selectedProducts} />
          <div className="flex justify-center mt-4">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / productsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-2 p-2 rounded-full ${
                    i + 1 === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
