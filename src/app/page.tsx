"use client";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import IssueList from "./components/IssueList";
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext";
import { useState } from "react";

export default function Home() {
  const handleFilterChange = (filter: any) => {
    console.log("Filter changed:", filter);
  };

  const handleSearch = (query: any) => {
    console.log("Search query:", query);
  };

  return (
    <FilterProvider>
    <SearchProvider >
    <div>
      <Header />
      <main className="container mx-auto p-4">
      <Navbar onFilterChange={handleFilterChange} onSearch={handleSearch} />
        <IssueList   filter={""} issues={[]}       />
      </main>
    </div>
    </SearchProvider>
    </FilterProvider>
  )
}