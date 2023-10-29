import React from "react";
import NewIssueButton from "./NewIssueButton";
import { useSearchContext } from "../context/SearchContext";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearchContext();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex items-center" data-testid="search-button">
      <div className="relative">
        <input
          type="text"
          placeholder="Search here..."
          className="bg-gray-200 text-black rounded-md py-2 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery} 
          onChange={handleInputChange}
        />
        <button className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M15 9a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </button>
      </div>
      <NewIssueButton />
    </div>
  );
}

export default SearchBar;
