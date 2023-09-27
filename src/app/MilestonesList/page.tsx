"use client"
import React, { useEffect, useState } from "react";
import {
  fetchMilestones,
  DeleteMilestone as deleteMilestoneApi,
  UpdateMilestone as updateMilestoneApi,
} from "../api/githubAPI";
import Link from "next/link";
import Modal from "react-modal";
import { Milestone } from "../interfaces/issueTypes";
import { Save, Delete, Edit3 } from "react-feather";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    maxWidth: "800px",
    width: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
};

function MilestonesList() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedMilestoneTitle, setEditedMilestoneTitle] = useState<string>("");

  useEffect(() => {
    fetchMilestones()
      .then((data: Milestone[]) => {
        setMilestones(data);
      })
      .catch((error) => {
        console.error("Error fetching milestones:", error);
      });
  }, []);

  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setEditedMilestoneTitle(milestone.title);
    setIsModalOpen(true);
  };

  const handleCloseMilestoneDetails = () => {
    setSelectedMilestone(null);
    setEditedMilestoneTitle("");
    setIsModalOpen(false);
  };

  const handleDeleteMilestone = async (milestone: Milestone) => {
    try {
      await deleteMilestoneApi(milestone.number);
      setMilestones((prevMilestones) => prevMilestones.filter((m) => m.id !== milestone.id));
      handleCloseMilestoneDetails();
    } catch (error:any) {
      console.error("Error deleting milestone:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  };
  
  
  const handleEditMilestone = async (editedMilestone: Milestone) => {
    try {
      const updatedMilestone = { ...editedMilestone, title: editedMilestoneTitle };
      await updateMilestoneApi(editedMilestone.number, updatedMilestone);
      setMilestones((prevMilestones) =>
        prevMilestones.map((m) => (m.id === editedMilestone.id ? updatedMilestone : m))
      );
      handleCloseMilestoneDetails();
    } catch (error:any) {
      console.error("Error updating milestone:", error);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
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
          <Link href="/">
            <button className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 border rounded-md">
              Cancel
            </button>
          </Link>
          <Link href="/NewMilestone">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              New Milestone
            </button>
          </Link>
        </div>
      </div>
      {milestones.length > 0 ? (
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-white border rounded-md border-blue-200 p-4 cursor-pointer transition duration-300 hover:shadow-md flex justify-between items-center"
            >
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
              <div className="flex items-center space-x-2">

              <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  onClick={() => handleMilestoneClick(milestone)}
                >
                 < Edit3 />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md ml-2"
                  onClick={() => handleDeleteMilestone(milestone)}
                >
                 < Delete size={20}/>
                </button>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gray-300 rounded-md p-5 text-center">
          <p className="text-gray-500">There aren&apos;t any open milestones.</p>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseMilestoneDetails}
        style={modalStyles}
        contentLabel="Milestone Details"
        ariaHideApp={false}
      >
        {selectedMilestone && (
          <>
            <h3 className="text-lg font-bold mb-2">Edit Milestone</h3>
            <div className="mb-4">
              <label htmlFor="milestoneTitle" className="font-semibold">
                Milestone Title
              </label>
              <input
                type="text"
                id="milestoneTitle"
                className="w-full p-2 border rounded-md"
                value={editedMilestoneTitle}
                onChange={(e) => setEditedMilestoneTitle(e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleCloseMilestoneDetails}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleEditMilestone(selectedMilestone)}
              >
               < Save />
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default MilestonesList;
