import React, { useState } from "react";
import { IssueDetailsProps } from "../interfaces/issueTypes";
import NewIssueButton from "./NewIssueButton";

function IssueDetails({ issue, onClose }: IssueDetailsProps) {
  const [activeButton, setActiveButton] = useState("write");

  const handleButtonClick = (button: React.SetStateAction<string>) => {
    setActiveButton(button);
  };
  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-screen h-screen rounded-lg shadow-lg p-8 overflow-y-auto ">
        <div className="flex justify-between p-4 border-b">
          <h1 className="text-2xl font-semibold">
            {issue.title} (#{issue.number})
          </h1>
          <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4">
            {/* Label select */}
            <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Label</option>
              {/* Add label options */}
            </select>
            {/* Projects select */}
            <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Projects</option>
              {/* Add project options */}
            </select>
            {/* Milestones select */}
            <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Milestones</option>
              {/* Add milestone options */}
            </select>
            {/* Assignee select */}
            <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Assignee</option>
              {/* Add assignee options */}
            </select>
            {/* Sort select */}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="p-4">
          <div className="border rounded-md">
            <div className="flex items-center mb-2 bg-gray-200">
              <img
                src={issue.user.avatar_url}
                alt={issue.user.login}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-gray-700 font-semibold">
                {issue.user.login}
              </span>
              <span className="text-gray-500 ml-2">
                opened this issue on{" "}
                {new Date(issue.created_at).toLocaleString()}
              </span>
              <span className="p-4"> Comments: {issue.comments}</span>
              <div className="flex justify-end flex-1">
                <button className="bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md ml-10">
                  Edit
                </button>
                <NewIssueButton />
              </div>
            </div>
            <div className="mb-4">
              <textarea
                className="w-full h-32 p-2 border rounded-md mb-4"
              >
                {issue.body}
              </textarea>
            </div>
          </div>
          <div className=" border rounded-md">
            <div className="bg-gray-200 flex items-start">
              <button
                className={`${
                  activeButton === "write"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                } px-4 py-2 rounded-md hover:bg-blue-600`}
                onClick={() => handleButtonClick("write")}
              >
                Write
              </button>
              <button
                className={`${
                  activeButton === "preview"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                } px-4 py-2 rounded-md ml-3 hover:bg-blue-600`}
                onClick={() => handleButtonClick("preview")}
              >
                Preview
              </button>
            </div>
            <textarea
              className="w-full h-32 p-2 border rounded-md mb-4"
              placeholder="Leave a comment"
            ></textarea>
            <div className="flex justify-end">
              <button className="bg-gray-200 hover:bg-blue-600 text-black px-4 py-2 rounded-md ml-10">
                Close Issue?
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ml-3">
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetails;
