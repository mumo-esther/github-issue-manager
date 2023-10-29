import React, { ChangeEvent } from "react";
import SearchBar from "./SearchBar";
import { NavbarProps } from "../interfaces/issueTypes";
import { useFilterContext } from "../context/FilterContext";
import Link from "next/link";

function Navbar({ onFilterChange }: NavbarProps) {
  const { filter, setFilter } = useFilterContext();

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter);
  };

  return (
    <nav className="bg-white text-black p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
          {/**   <select
              className="bg-gray-200 text-black text-center rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">Filters</option>
              <option value="open">Open Issues</option>
              <option value="closed">Closed Issues</option>
            </select>
            */}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/MilestonesList">
              <button className="border border-gray-400 bg-whites hover:bg-gray-200 text-black px-4 py-2 rounded-md ml-3">
                Milestones
              </button>
            </Link>
            <Link href="/LabelsList">
              <button className="border border-gray-400 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md ml-3">
                Labels
              </button>
            </Link>
          </div>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}

export default Navbar;
