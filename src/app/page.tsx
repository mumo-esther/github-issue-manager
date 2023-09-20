import Header from "@/components/Header";
import IssueList from "@/components/IssueList";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        < Navbar />
        <IssueList />
      </main>
    </div>
  )
}