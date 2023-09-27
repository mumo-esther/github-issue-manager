import React, { useState, useEffect } from "react";
import { IssueDetailsProps, IssueComment, Issue } from "../interfaces/issueTypes";
import NewIssueButton from "./NewIssueButton";
import {
  fetchIssueComments,
  postNewComment,
  UpdateIssue,
  lockIssue,
  unlockIssue,
  UpdateComment,
  DeleteComment,
} from "../api/githubAPI";
import DetailsSelect from "./DetailsSelect";
import { Lock, Unlock, Edit3, Save, Delete, Home } from "react-feather";

function IssueDetails({
  issue,
  onClose,
  issueNumber,
}: IssueDetailsProps): JSX.Element {
  const [activeButton, setActiveButton] = useState<string>("view");
  const [editableContent, setEditableContent] = useState<string>(issue.body);
  const [comments, setComments] = useState<IssueComment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [editableCommentContent, setEditableCommentContent] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        if (issueNumber !== null) {
          const commentsData = await fetchIssueComments(issueNumber);
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [issueNumber]);

  const handleButtonClick = (button: string): void => {
    setActiveButton(button);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setEditableContent(event.target.value);
  };

  const handleEditSave = async (): Promise<void> => {
    try {
      if (issueNumber !== null) {
        if (editableContent !== issue.body) {
          const update = { body: editableContent };
          await UpdateIssue(issueNumber, update);

          setIssues((prevIssue) => ({
            ...prevIssue,
            body: editableContent,
          }));

          alert("Issue has been successfully updated!");
        }
        setActiveButton("view");
      }
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  const handleNewComment = async (): Promise<void> => {
    try {
      if (!isLocked && issueNumber !== null) {
        await postNewComment(issueNumber, { body: newCommentText });
        const updatedIssue = { ...issue };
        updatedIssue.comments += 1;
        const newComment: IssueComment = {
          id: comments.length + 1,
          user: {
            avatar_url: issue.user.avatar_url,
            login: issue.user.login,
            id: issue.user.id
          },
          created_at: new Date().toISOString(),
          body: newCommentText,
        };
        setComments([...comments, newComment]);
        setIssues([updatedIssue]);
      } else {
        console.error("Cannot post a comment: issue is locked or issueNumber is null.");
      }
    } catch (error) {
      console.error("Error posting new comment:", error);
    }
  };

  const handleLockIssue = async (): Promise<void> => {
    try {
      if (issueNumber !== null) {
        await lockIssue(issueNumber);
        setIsLocked(true);
      }
    } catch (error) {
      console.error("Error locking issue:", error);
    }
  };

  const handleUnlockIssue = async (): Promise<void> => {
    try {
      if (issueNumber !== null) {
        await unlockIssue(issueNumber);
        setIsLocked(false);
      }
    } catch (error) {
      console.error("Error unlocking issue:", error);
    }
  };

  const handleEditComment = (commentId: number): void => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (!commentToEdit) {
      console.error("Comment not found for editing.");
      return;
    }
    setEditableCommentContent(commentToEdit.body);
    setEditingCommentId(commentId);
  };


  const handleSaveEditedComment = async (commentId: number): Promise<void> => {
    try {
      const commentToEdit = comments.find((comment) => comment.id === commentId);
      if (!commentToEdit) {
        console.error("Comment not found for editing.");
        return;
      }
      if (editableCommentContent !== commentToEdit.body) {
        await UpdateComment(commentId, {
          body: editableCommentContent,
        });

        const updatedComments = comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, body: editableCommentContent }
            : comment
        );
        setComments(updatedComments);
        alert("Comment has been successfully edited!");
      }
      setEditableCommentContent("");
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: number): Promise<void> => {
    try {
      await DeleteComment(commentId);
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
      alert("Comment has been successfully deleted!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-screen h-screen rounded-lg shadow-lg p-8 overflow-y-auto">
        <div className="flex justify-between p-4 border-b">
          <h1 className="text-2xl font-semibold">
            {issue.title} (#{issue.number})
          </h1>
          <DetailsSelect issueNumber={issueNumber} />
          <button onClick={onClose} className="text-blue-500 hover:text-gray-700">
            <Home size={30} />
          </button>
        </div>
        <div className="p-4">
          <div className="border rounded-md border-blue-500">
            <div className="flex items-center mb-2 bg-gray-200">
              <img src={issue.user.avatar_url} alt={issue.user.login} className="w-8 h-8 rounded-full mr-2" />
              <span className="text-gray-700 font-semibold">{issue.user.login}</span>
              <span className="text-gray-500 ml-2">
                opened this issue on {new Date(issue.created_at).toLocaleString()}
              </span>
              <span className="p-4"> Comments: {issue.comments}</span>
              <div className="flex justify-end flex-1">
                {activeButton === "view" ? (
                  <button
                    onClick={() => handleButtonClick("edit")}
                    className="bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md ml-10"
                  >
                    <Edit3 />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleEditSave}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md ml-10"
                    >
                      <Save size={16} />
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
                {isLocked ? (
                  <button
                    onClick={handleUnlockIssue}
                    className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
                  >
                  <Unlock size={16}/>
                  </button>
                ) : (
                  <button
                    onClick={handleLockIssue}
                    className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                  >
                    <Lock size={16} />
                  </button>
                )}
              </div>
            </div>
            {activeButton === "view" ? (
              <div
                className="ml-4 p-4 flex text-left flex-col"
                style={{
                  whiteSpace: "pre-line",
                  paddingLeft: 0,
                }}
              >
 {issue.body}
                {/* Display Labels */}
                <div className="mt-7 space-x-2 space-y-10 text-left ml-5 text-sm">
                  {issue.labels.map((label: { id: React.Key | null | undefined; color: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                    <div className="flex flex-row items-center">
                       <img
                    src={issue.user.avatar_url}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-bold p-1">
                     {issue.user.login}
                     </span>
                      added the
                    <span
                      key={label.id}
                      className="px-2 py-1 text-xs rounded ml-2 mr-2"
                      style={{ backgroundColor: `#${label.color}`, color: "#fff" }}
                    >
                     {label.name} 
                    </span>
                    label on {new Date(issue.created_at).toLocaleString()}
                    </div>
                  ))}
                </div>
                {issue.assignees.length > 0 && (
            <div className="mt-2 space-x-2">
              {issue.assignees.map((assignee: { id: React.Key | null | undefined; avatar_url: string | undefined; login: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.PromiseLikeOfReactNode | null | undefined; }) => (
                <div key={assignee.id} className="flex items-center text-sm ml-7 mt-8">
                  <img
                    src={assignee.avatar_url}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-2 font-bold p-1">{assignee.login}</span>
                  <span className="p-1">
                  selfassigned this on
                  </span>
                  {new Date(issue.created_at).toLocaleString()}
                </div>
              ))}
            </div>
          )}
              </div>

            ) : (
              <textarea
                value={editableContent}
                readOnly={activeButton === "view"}
                onChange={handleContentChange}
                className="w-full h-40 p-2 border rounded-md mb-4 bg-gray-50"
                placeholder="Edit content..."
              ></textarea>
            )}
          </div>
          {comments.map((comment) => (
            <div key={comment.id} className="border-t p-4">
              <div className="w-full mb-4">
                <div>
                  <div className="flex items-center">
                    <img
                      src={comment.user.avatar_url}
                      alt={comment.user.login}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700 font-semibold">
                      {comment.user.login}
                    </span>
                    <span className="text-gray-500 ml-2">
                      commented on {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  {editingCommentId === comment.id ? (
                    <>
                      <textarea
                        value={editableCommentContent}
                        onChange={(e) => setEditableCommentContent(e.target.value)}
                        className="h-40 w-full p-2 border rounded-md mt-2"
                        placeholder="Edit comment..."
                      ></textarea>
                      <div className="mt-2 flex items-center">
                        <button
                          onClick={() => handleSaveEditedComment(comment.id)}
                          className="bg-blue-600 text-white px-2 py-1 rounded-md mr-2"
                        >
                         < Save size={26}/>
                        </button>
                        <button
                          onClick={() => handleEditComment(comment.id)}
                          className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                    <div className="flex justify-end">
                        <button
                          onClick={() => handleEditComment(comment.id)}
                          className="text-blue-600 hover:underline mr-2"
                        >
                           <Edit3 />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-600 hover:underline"
                        >
                          <Delete size={25}/>
                        </button>
                      </div>
                      <div className="w-full ml-2 p-2 border rounded-md text-gray-900 bg-gray-100 text-left whitespace-pre-wrap">
                        {comment.body}
                      </div>
                      
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="border rounded-md mt-4 border-blue-500">
            <textarea
              className="w-full h-32 p-2 border rounded-md mb-4 border-blue-500"
              placeholder="Leave a comment"
              onChange={(e) => setNewCommentText(e.target.value)}
              value={newCommentText}
              disabled={isLocked}
            ></textarea>
            <div className="flex justify-end">
              {isLocked ? (
                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-md ml-10 border border-blue-500"
                >
                  Locked - Cannot Comment
                </button>
              ) : (
                <button
                  className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md ml-10 border border-blue-500"
                  onClick={handleNewComment}
                >
                  Comment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetails;
