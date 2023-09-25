import React, { useEffect, useState } from "react";
import IssueHeader from "./IssueHeader";
import { Issue, IssueListProps } from "../interfaces/issueTypes";
import IssueDetails from "./IssueDetails";
import { useSearchContext } from "../context/SearchContext";
import { useFilterContext } from "../context/FilterContext";

function IssueList({ filter }: IssueListProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [selectedIssueNumber, setSelectedIssueNumber] = useState<number | null>(
    null
  ); // State to save the selected issue's issue_number
  const { searchQuery } = useSearchContext();
  const { filter: appliedFilter,
    selectedMilestone,
    selectedLabel,
    selectedAssignee,
   } = useFilterContext();

  useEffect(() => {
    const fetchIssues = async () => {
      let apiUrl = "https://api.github.com/repos/mumo-esther/Js-best-practices/issues";

      const queryParams = [];

      if (appliedFilter === "open") {
        apiUrl += "?state=open";
      } else if (appliedFilter === "closed") {
        apiUrl += "?state=closed";
      }

      if (selectedMilestone) {
        queryParams.push(`milestone=${selectedMilestone}`);
      }

      if (selectedLabel) {
        queryParams.push(`labels=${selectedLabel}`);
      }

      if (selectedAssignee) {
        queryParams.push(`assignee=${selectedAssignee}`);
      }

      if (queryParams.length > 0) {
        apiUrl += "?" + queryParams.join("&");
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Issue[] = await response.json();
        setIssues(data);
      } catch (error) {
        console.error("Error fetching GitHub issues:", error);
      }
    };

    fetchIssues();
  }, [appliedFilter, selectedMilestone, selectedLabel, selectedAssignee]);

  const paddingBottom = issues.length > 0 ? `pb-${issues.length * 8}` : "";

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setSelectedIssueNumber(issue.number); // Save the selected issue's issue_number
  };

  const handleCloseIssueDetails = () => {
    setSelectedIssue(null);
    setSelectedIssueNumber(null); // Clear the selected issue's issue_number
  };

  const filteredIssues = issues.filter((issue) => {
    const isOpen = issue.state === "open";
    const isClosed = issue.state === "closed";

    if (filter === "open" && !isOpen) {
      return false;
    }
    if (filter === "closed" && !isClosed) {
      return false;
    }

    if (searchQuery) {
      const searchKeywords = searchQuery.toLowerCase().split(" ");
      const title = issue.title.toLowerCase();
      const body = issue.body ? issue.body.toLowerCase() : "";

      if (
        !searchKeywords.every(
          (keyword) => title.includes(keyword) || body.includes(keyword)
        )
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      {filteredIssues.length > 0 ? (
        <div
          className={`border border-gray-500 rounded-md text-center ${paddingBottom} pt-0 px-0 relative`}
        >
          <IssueHeader />
          <div>
            {filteredIssues.map((issue, index) => (
              <div
                key={issue.id}
                className={`flex flex-col items-start mb-4 mt-2 ${
                  index === filteredIssues.length - 1 ? "" : "border-b"
                } hover:bg-gray-200 p-4 rounded-md cursor-pointer`}
                onClick={() => handleIssueClick(issue)}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500 mr-2 lg:mr-0"
                  />
                  <div className="w-5 h-5 border border-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="font-bold ml-2">{issue.title}</p>
                </div>
                <p className="text-gray-500 text-sm mt-2 ml-16">
                  # {issue.number} Opened on{" "}
                  {new Date(issue.created_at).toLocaleString()} by{" "}
                  {issue.user.login}
                </p>
              </div>
            ))}
          </div>
          {selectedIssue && (
            <IssueDetails
              issue={selectedIssue}
              onClose={handleCloseIssueDetails}
              issueNumber={selectedIssueNumber} // Pass the issue_number as a prop
            />
          )}
        </div>
      ) : (
        <div className="border border-gray-500 rounded-md text-center pb-80 pt-0 px-0 relative">
          <IssueHeader />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center mb-4">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <p className="font-bold">There aren’t any open issues.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default IssueList;
