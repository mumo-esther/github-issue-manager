import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { NavbarProps } from "../interfaces/issueTypes";

function Navbar({ onFilterChange, onSearch }: NavbarProps) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter); 
  };

  return (
    <nav className="bg-white text-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              className="bg-gray-200 text-black text-center rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">Filters</option>
              <option value="all">All Issues</option>
              <option value="open">Open Issues</option>
              <option value="closed">Closed Issues</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button className="border border-gray-400 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md ml-3">
              Milestones
            </button>
            <button className="border border-gray-400 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md ml-3">
              Labels
            </button>
          </div>
        </div>
        <SearchBar onSearch={onSearch} />
      </div>
    </nav>
  );
}

export default Navbar;