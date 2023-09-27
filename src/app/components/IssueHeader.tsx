import React, { useState, useEffect } from 'react';
import { fetchClosedIssues, fetchOpenIssues } from "../api/githubAPI";
import Selects from "./Selects";

interface Issue {
  state: "open" | "closed"; 
}

function IssueHeader() {
  const [openIssuesCount, setOpenIssuesCount] = useState<number>(0);
  const [closedIssuesCount, setClosedIssuesCount] = useState<number>(0);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  useEffect(() => {
    fetchOpenIssues(selectedLabel, selectedAssignee, selectedMilestone)
      .then((data: Issue[]) => {
        const openCount = data.filter((issue) => issue.state === "open").length;
        setOpenIssuesCount(openCount);
      })
      .catch((error: Error) => {
      
        console.error("Error fetching open issues:", error);
      });
  
    fetchClosedIssues(selectedLabel, selectedAssignee, selectedMilestone)
      .then((data: Issue[]) => {
        const closedCount = data.filter((issue) => issue.state === "closed").length;
        setClosedIssuesCount(closedCount);
      })
      .catch((error: Error) => {
       
        console.error("Error fetching closed issues:", error);
      });
  }, [selectedLabel, selectedAssignee, selectedMilestone]);

 
  const handleFilterChange = (label: string | null, assignee: string | null, milestone: string | null) => {
   
    setSelectedLabel(label);
    setSelectedAssignee(assignee);
    setSelectedMilestone(milestone);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-gray-200">
      <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4 mb-2 lg:mb-0">
        
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-500 mr-2 lg:mr-0" />
          <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center ml-5">
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
        </label>
        <span className="text-gray-700 mr-4 lg:mr-0">Open: {openIssuesCount}</span>
        <span className="text-gray-700">Closed: {closedIssuesCount}</span>
      </div>
      <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4">
        
        <Selects onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}

export default IssueHeader;
