// src/components/SearchBar.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      navigate("/"); // redirect ke default page
    } else {
      navigate(`/?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Masukkan mata kuliah yang ingin dipelajari"
        className="w-[400px] px-4 py-2 border rounded-l-md shadow"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button
        className="bg-blue hover:bg-blue-dark text-white px-4 py-2 rounded-r-md"
        onClick={handleSearch}
      >
        Cari 🔍
      </button>
    </div>
  );
};

export default SearchBar;
