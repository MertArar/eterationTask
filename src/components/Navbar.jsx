import React, { useState } from "react";

import { AiOutlineUser, AiOutlineWallet } from "react-icons/ai";

import { Link } from "react-router-dom";

const Navbar = ({ searchProducts, walletAmount, userName }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    searchProducts(newSearchTerm);
  };

  return (
    <nav className="bg-[#2A59FE] p-4 px-24 text-white flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <span className="text-3xl font-bold">Eteration</span>
        </Link>
        <div className="ml-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white-70 ml-10 w-[400px] text-black p-2 rounded-sm "
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <AiOutlineWallet /> {walletAmount} USD
        </div>
        <div className="flex items-center m-2">
          <AiOutlineUser />
          {userName}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
