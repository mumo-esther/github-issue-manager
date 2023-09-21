"use client";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import IssueList from "./components/IssueList";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        < Navbar 
        onFilterChange={function (filter: string): void {
          throw new Error("Function not implemented.");
        } } onSearch={function (query: string): void {
          throw new Error("Function not implemented.");
        }  } />
        <IssueList filter={""} />
      </main>
    </div>
  )
}