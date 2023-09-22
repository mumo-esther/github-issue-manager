import { useEffect, useState } from "react";
import { fetchAssignees } from "../api/githubAPI";
interface Assignee {
  id: number;
  login: string;
}

function IssueHeader() {
  const [Assignees, setAssignees] = useState<Assignee[]>([]);
  useEffect(() => {
    fetchAssignees()
      .then((AssigneesData: Assignee[]) => {
        setAssignees(AssigneesData);
      })
      .catch((error) => {
        console.error("Error fetching Assignees:", error);
      });
  }, []);
  
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-gray-200">
      <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4 mb-2 lg:mb-0">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="form-checkbox text-blue-500 mr-2 lg:mr-0"
        />

        <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center mb-4">
          <div className="w-1 h-1 bg-black rounded-full"></div>
        
        </div>
        {/* Count of open issues */}
        <span className="text-gray-700 mr-4 lg:mr-0">Open: 10</span>
        {/* Count of closed issues */}
        <span className="text-gray-700">Closed: 5</span>
      </div>
      <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4">
        {/* Author select */}
        <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Author</option>
          {/* Add author options */}
        </select>
        {/* Label select */}
        
        {/* Projects select */}
        <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Projects</option>
          {/* Add project options */}
        </select>
        {/* Assignees select */}
        
        {/* Assignee select */}
        <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Assignee</option>
            {Assignees.map((Assignee) => (
              <option key={Assignee.id} value={Assignee.id}>
                {Assignee.login}
              </option>
              ))}
        </select>
        {/* Sort select */}
        <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Sort</option>
          {/* Add sort options */}
        </select>
      </div>
    </div>
  );
}

export default IssueHeader;
