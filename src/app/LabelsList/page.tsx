"use client"
import React, { useEffect, useState } from "react";
import {
  fetchLabels,
  UpdateLabel as updateLabelApi,
  deleteLabel as deleteLabelApi,
} from "../api/githubAPI";
import Link from "next/link";
import Modal from "react-modal";
import { Label } from "../interfaces/issueTypes";

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

function LabelsList() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedLabelName, setEditedLabelName] = useState<string>("");

  useEffect(() => {
    fetchLabels()
      .then((data: Label[]) => {
        setLabels(data);
      })
      .catch((error) => {
        console.error("Error fetching labels:", error);
      });
  }, []);

  const handleLabelClick = (label: Label) => {
    setSelectedLabel(label);
    setEditedLabelName(label.name);
    setIsModalOpen(true);
  };

  const handleCloseLabelDetails = () => {
    setSelectedLabel(null);
    setEditedLabelName("");
    setIsModalOpen(false);
  };

  const handleDeleteLabel = async (label: Label) => {
    try {
      await deleteLabelApi(label.name);
      setLabels((prevLabels) => prevLabels.filter((l) => l.id !== label.id));
      handleCloseLabelDetails();
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  const handleEditLabel = async (label: Label) => {
    try {
      const updatedLabel = { ...label, name: editedLabelName };
      await updateLabelApi(label.name, updatedLabel);
      setLabels((prevLabels) =>
        prevLabels.map((l) => (l.id === updatedLabel.id ? updatedLabel : l))
      );
      handleCloseLabelDetails();
    } catch (error) {
      console.error("Error updating label:", error);
    }
  };

  return (
    <div className="p-5 m-5 border rounded-md border-blue-600">
      <h1 className="text-3xl font-semibold">Labels</h1>
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
      <div className="flex justify-end items-center">
        <Link href="/">
          <button className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 border rounded-md">
            Cancel
          </button>
        </Link>
        <Link href="/NewLabel">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md m-4">
            New Label
          </button>
        </Link>
      </div>
      <div className="flex flex-col">
        {labels.length > 0 ? (
          labels.map((label) => (
            <div
              key={label.id}
              className={`border border-gray-300 p-3 rounded-md cursor-pointer hover:bg-gray-100 flex flex-row justify-between`}
              onClick={() => handleLabelClick(label)}
            >
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: `#${label.color}` }}
              ></div>
              <p className="text-gray-700 text-sm font-medium">
                {label.name}
              </p>
              <div className="mt-2 flex justify-end items-right">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md mr-2"
                  onClick={() => handleDeleteLabel(label)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  onClick={() => handleEditLabel(label)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-gray-500 rounded-md text-center mt-4 p-4">
            <p className="font-bold">There aren't any labels yet.</p>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseLabelDetails}
        style={modalStyles}
        contentLabel="Label Details"
        ariaHideApp={false}
      >
        {selectedLabel && (
          <>
            <h3 className="text-lg font-bold mb-2">Edit Label</h3>
            <div className="mb-4">
              <label htmlFor="labelName" className="font-semibold">
                Label Name
              </label>
              <input
                type="text"
                id="labelName"
                className="w-full p-2 border rounded-md"
                value={editedLabelName}
                onChange={(e) => setEditedLabelName(e.target.value)}
              />
            </div>
            <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: `#${selectedLabel.color}` }}></div>
            <p>{selectedLabel.description}</p>
            <div className="mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleCloseLabelDetails}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleEditLabel(selectedLabel)}
              >
                Save
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default LabelsList;
