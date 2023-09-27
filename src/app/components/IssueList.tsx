import React, { useEffect, useState } from "react";
import IssueHeader from "./IssueHeader";
import IssueDetails from "./IssueDetails";
import { useSearchContext } from "../context/SearchContext";
import { useFilterContext } from "../context/FilterContext";
import { Issue, IssueListProps, Label, User } from "../interfaces/issueTypes";
import Image from 'next/image';

function IssueList({ filter }: IssueListProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [selectedIssueNumber, setSelectedIssueNumber] = useState<number | null>(
    null
  );
  const { searchQuery } = useSearchContext();
  const { filter: appliedFilter, selectedLabel, selectedAssignee, selectedMilestone } = useFilterContext();

  useEffect(() => {
    const fetchIssues = async () => {
      let apiUrl = "https://api.github.com/repos/mumo-esther/Js-best-practices/issues";
      const params = new URLSearchParams();

      if (appliedFilter === "open" || appliedFilter === "closed") {
        params.append("state", appliedFilter);
      }

      if (selectedLabel) {
        params.append("labels", selectedLabel);
      }

      if (selectedAssignee) {
        params.append("assignee", selectedAssignee);
      }

      if (selectedMilestone) {
        params.append("milestone", selectedMilestone);
      }

      apiUrl += `?${params.toString()}`;

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
  }, [appliedFilter, selectedLabel, selectedAssignee, selectedMilestone]);

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setSelectedIssueNumber(issue.number);
  };

  const handleCloseIssueDetails = () => {
    setSelectedIssue(null);
    setSelectedIssueNumber(null);
  };

  const openIssues = issues.filter((issue) => issue.state === "open");

  return (
    <>
      {openIssues.length === 0 ? (
        <div className="border border-gray-500 rounded-md text-center pb-80 pt-0 px-0 relative">
          <IssueHeader />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center mb-4">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <p className="font-bold">
              There aren&apos;t any results matching your Search.
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`border border-gray-500 rounded-md text-center pb-${issues.length * 8
            } pt-0 px-0 relative`}
        >
          <IssueHeader />
          <div>
            {openIssues.map((issue, index) => (
              <div
                key={issue.id}
                className={`flex flex-col items-start mb-4 mt-2 ${index === openIssues.length - 1 ? "" : "border-b"
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

                <div className="mt-2 ml-16 space-x-2">
                  {issue.labels.map((label: Label) => (
                    <span
                      key={label.id}
                      className="px-2 py-1 text-sm rounded"
                      style={{ backgroundColor: `#${label.color}`, color: "#fff" }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>


                {issue.assignees.length > 0 && (
                  <div className="mt-2 ml-16 space-x-2 flex flex-row">
                    <h1 className="text-sm text-blue-400">Assignees:</h1>
                    {issue.assignees.map((assignee: User) => (
                      <Image
                        src={assignee.avatar_url}
                        alt={assignee.login}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    ))}
                  </div>
                )}


                <div className="mt-2 ml-16 flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="8" />
                  </svg>
                  <span>{issue.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
          {selectedIssue && (
            <IssueDetails
              issue={selectedIssue}
              onClose={handleCloseIssueDetails}
              issueNumber={selectedIssueNumber}
            />
          )}
        </div>
      )}

      {openIssues.length === 0 && issues.length === 0 && (
        <div className="border border-gray-500 rounded-md text-center pb-80 pt-0 px-0 relative">
          <IssueHeader />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center mb-4">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <p className="font-bold">
              There aren&apos;t any open issues.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default IssueList;
