"use client"
import React, { useState } from "react";
import {postNewIssue} from "../api/githubAPI";
import { useRouter } from "next/navigation";
import Selects from "../components/Selects";
import Link from "next/link";

function NewIssue() {
  const [activeButton, setActiveButton] = useState("write");
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

 const router = useRouter();

  const handleButtonClick = (button:any) => {
    setActiveButton(button);
  };

  const handleInputChange = (event: { target: { name: string; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await postNewIssue(formData);
      setFormData({
        title: "",
        body: "",
      });
      router.push('/')
    } catch (error) {
      console.error("Error creating new issue:", error);
    }
  };

  return (
    <div className="border rounded-md m-10">
      <form onSubmit={handleSubmit}>
        <div>
          <Selects onFilterChange={function (label: string | null, assignee: string | null, milestone: string | null): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
        <input
          name="title"
          className="w-full h-10 p-2 bg-gray-100 border rounded-md mb-2 text-black"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
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
          name="body"
          className="w-full h-40 p-2 border rounded-md mb-4 bg-gray-50"
          placeholder="Leave a comment"
          value={formData.body}
          onChange={handleInputChange}
        ></textarea>
        <div className="flex justify-end">
        <Link href = '/' >
        <button
            className="bg-blue-400 hover:bg-blue-700 text-black px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          </Link>
          <button
            type="submit"
            className="bg-gray-200 hover:bg-blue-600 text-black px-4 py-2 rounded-md ml-10"
          >
            Submit New Issue
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewIssue;
