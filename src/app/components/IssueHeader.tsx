import { fetchClosedIssues, fetchOpenIssues } from "../api/githubAPI";
import { useFilterContext } from "../context/FilterContext";
import Selects from "./Selects";
import React, { useState, useEffect } from "react";

interface Issue {
  state: "open" | "closed"; // Add other properties as needed
}

function IssueHeader() {
  const [openIssuesCount, setOpenIssuesCount] = useState<number>(0);
  const [closedIssuesCount, setClosedIssuesCount] = useState<number>(0);
  const { filter, setFilter } = useFilterContext();

  useEffect(() => {
    // Fetch open issues
    fetchOpenIssues()
      .then((data: Issue[]) => {
        const openCount = data.filter((issue) => issue.state === "open").length;
        setOpenIssuesCount(openCount);
      })
      .catch((error: Error) => {
        console.error("Error fetching open issues:", error);
      });

    // Fetch closed issues
    fetchClosedIssues()
      .then((data: Issue[]) => {
        const closedCount = data.filter((issue) => issue.state === "closed").length;
        setClosedIssuesCount(closedCount);
      })
      .catch((error: Error) => {
        console.error("Error fetching closed issues:", error);
      });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-gray-200">
      <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4 mb-2 lg:mb-0">
        <input
          type="checkbox"
          className="form-checkbox text-blue-500 mr-2 lg:mr-0"
        />

        <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center mb-4">
          <div className="w-1 h-1 bg-black rounded-full"></div>
        </div>
        <span className="text-gray-700 mr-4 lg:mr-0">Open: {openIssuesCount}</span>
        <span className="text-gray-700">Closed: {closedIssuesCount}</span>
      </div>
      <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4">
        <Selects />
      </div>
    </div>
  );
}

export default IssueHeader;
