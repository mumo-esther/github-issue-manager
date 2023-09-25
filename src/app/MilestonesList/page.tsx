"use client"
import React, { useEffect, useState } from "react";
import { fetchClosedIssues, fetchMilestones, fetchOpenIssues } from "../api/githubAPI";
import { Milestone } from "../interfaces/issueTypes";
import Link from "next/link";

function MilestonesList() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [openIssuesCount, setOpenIssuesCount] = useState(0);
  const [closedIssuesCount, setClosedIssuesCount] = useState(0);

  useEffect(() => {
    fetchMilestones()
      .then((data: Milestone[]) => {
        setMilestones(data);
      })

    fetchOpenIssues()
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Open issues request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOpenIssuesCount(data.length);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

    fetchClosedIssues()
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Closed issues request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setClosedIssuesCount(data.length);
      })
      .catch((error) => {
        console.error("Error fetching closed issues:", error);
      });
  }, []);

  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
  };

  return (
    <div className="container border rounded-md border-blue-500 p-4 mt-4">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-3xl font-semibold">Milestones</h1>
          <div className="flex space-x-3 mt-2">
          <div className="flex items-center space-x-4">
        <Link href="/MilestonesList">
          <button className="border border-gray-400 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md ml-3">
            Milestones
          </button>
        </Link>
        <Link href="/LabelsList">
          <button className="border border-gray-400 bg-whites hover:bg-gray-200 text-black px-4 py-2 rounded-md ml-3">
            Labels
          </button>
        </Link>
      </div>
          </div>
        </div>
        <div className="flex justify-end items-center space-x-4">
        <Link href = '/' >
        <button
            className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          </Link>
         
        <Link href='/NewMilestone'>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            New Milestone
          </button>
        </Link>
        </div>
      </div>
      {milestones.length > 0 ? (
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="bg-white border rounded-md border-blue-200 p-4 cursor-pointer transition duration-300 hover:shadow-md"
              onClick={() => handleMilestoneClick(milestone)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h2 className="text-lg font-semibold">{milestone.title}</h2>
                </div>
                <span className="text-gray-500">
                  #{milestone.number} opened on {new Date(milestone.updated_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{milestone.description}</p>
              <div className="mt-3">
                <span className="text-gray-600">
                  {milestone.open_issues} Open / {milestone.closed_issues} Closed
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gray-300 rounded-md p-5 text-center">
          <p className="text-gray-500">There aren't any open milestones.</p>
        </div>
      )}
    </div>
  );
}

export default MilestonesList;
