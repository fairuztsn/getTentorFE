// src/components/Header.jsx
import React from "react";
import { useUser } from "@/contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <header className="bg-light-blue py-4 px-6 flex justify-between items-center shadow">
      <div className="flex items-center space-x-2">
        <img src={`/public/images/gettentor.png`} alt="logo" className="w-64 h-12" />
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-dark hover:bg-blue-600 text-white px-4 py-1 rounded">
          Tentor Favorit
        </button>
        {/* Bungkus nama & avatar dengan <div> yang punya onClick */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <span className="text-gray-700">{user?.name}</span>
          <img
            src={user?.fotoUrl}
            className="w-8 h-8 rounded-full border"
            alt="User Avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
