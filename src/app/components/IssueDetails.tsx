import React, { useState } from "react";
import { IssueDetailsProps } from "../interfaces/issueTypes";
import NewIssueButton from "./NewIssueButton";

function IssueDetails({ issue, onClose, issueNumber }: IssueDetailsProps) {
  const [activeButton, setActiveButton] = useState("view");
  const [editableContent, setEditableContent] = useState(issue.body);

  const handleButtonClick = (button: React.SetStateAction<string>) => {
    setActiveButton(button);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditableContent(event.target.value);
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/OWNER/REPO/issues/${issueNumber}`,
        {
          method: "PATCH",
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer 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", 
            "Content-Type": "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          body: JSON.stringify({
            body: editableContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setActiveButton("view");
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-screen h-screen rounded-lg shadow-lg p-8 overflow-y-auto">
        <div className="flex justify-between p-4 border-b">
          <h1 className="text-2xl font-semibold">
            {issue.title} (#{issue.number})
          </h1>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>
        <div className="p-4">
          <div className="border rounded-md border-blue-500">
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
                {activeButton === "view" ? (
                  <button
                    onClick={() => handleButtonClick("edit")}
                    className="bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md ml-10"
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleEditSave}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md ml-10"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setActiveButton("view");
                        setEditableContent(issue.body);
                      }}
                      className="bg-white hover:bg-red-600 text-black px-4 py-2 rounded-md ml-2"
                    >
                      Cancel
                    </button>
                  </>
                )}
                <NewIssueButton />
              </div>
            </div>
            {activeButton === "view" ? (
              <div
                className="ml-4 p-4 flex text-left"
                style={{ whiteSpace: "pre-line", paddingLeft: 0 }}
              >
                {issue.body}
              </div>
            ) : (
              <textarea
                value={editableContent}
                readOnly={activeButton === "view"}
                onChange={(e) => setEditableContent(e.target.value)}
                className="w-full h-40 p-2 border rounded-md mb-4 bg-gray-50"
                placeholder="Edit content..."
              ></textarea>
            )}
          </div>
          <div className="border rounded-md mt-4 border-blue-500">
            <textarea
              className="w-full h-32 p-2 border rounded-md mb-4 border-blue-500"
              placeholder="Leave a comment"
            ></textarea>
            <div className="flex justify-end">
              <button className="bg-gray-200 hover:bg-blue-600 text-black px-4 py-2 rounded-md ml-10 border border-blue-500">
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
