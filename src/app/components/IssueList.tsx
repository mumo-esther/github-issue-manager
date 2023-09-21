import React, { useEffect, useState } from "react";
import IssueHeader from "./IssueHeader";
import { fetchGitHubIssues } from "../api/githubAPI";
import { Issue, IssueListProps } from "../interfaces/issueTypes";
import IssueDetails from "./IssueDetails";

function IssueList({ filter }: IssueListProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    fetchGitHubIssues()
      .then((data: Issue[]) => {
        setIssues(data);
      })
      .catch((error) => {
        console.error("Error fetching GitHub issues:", error);
      });
  }, []);

  const paddingBottom = issues.length > 0 ? `pb-${issues.length * 8}` : "";

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleCloseIssueDetails = () => {
    setSelectedIssue(null);
  };

  // Filter issues based on the selected filter
  const filteredIssues = issues.filter((issue) => {
    if (filter === "open") {
      return issue.state === "open";
    } else if (filter === "closed") {
      return issue.state === "closed";
    }
    // Default: show all issues
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
