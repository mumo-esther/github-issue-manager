"use client"
import React, { useEffect, useState } from "react";
import { fetchLabels } from "../api/githubAPI";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLabels()
      .then((data: Label[]) => {
        setLabels(data);
      })
  }, []);

  const handleLabelClick = (label: Label) => {
    setSelectedLabel(label);
    setIsModalOpen(true);
  };

  const handleCloseLabelDetails = () => {
    setSelectedLabel(null);
    setIsModalOpen(false);
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
      <Link href = '/' >
        <button
            className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          </Link>
        <Link href="/NewLabel">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md m-4">
            New Label
          </button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-gray-200">
        <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4 mb-2 lg:mb-0">
          <input
            type="checkbox"
            className="form-checkbox text-blue-500 mr-2 lg:mr-0"
          />
          <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center mb-4">
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
          <span className="text-gray-700 mr-4 lg:mr-0">{labels.length} Labels</span>
        </div>
        <div className="flex flex-wrap items-center space-y-2 lg:space-y-0 lg:space-x-4">
        </div>
      </div>

      {labels.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {labels.map((label) => (
            <div
              key={label.id}
              className={`border border-gray-300 p-3 rounded-md cursor-pointer hover:bg-gray-100`}
              onClick={() => handleLabelClick(label)}
            >
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: `#${label.color}` }}
              ></div>
              <p className="text-gray-700 text-sm font-medium">
                {label.name}
              </p>
              {/* Other label information can be displayed here */}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gray-500 rounded-md text-center mt-4 p-4">
          <p className="font-bold">There aren&apos;t any labels yet.</p>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseLabelDetails}
        style={modalStyles}
        contentLabel="Label Details"
        ariaHideApp={false}
      >
        {selectedLabel && (
          <>
            <h3 className="text-lg font-bold mb-2">{selectedLabel.name}</h3>
            <div
              className="w-3 h-3 rounded-full mb-2"
              style={{ backgroundColor: `#${selectedLabel.color}` }}
            ></div>
            <p>{selectedLabel.description}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleCloseLabelDetails}
            >
              Close
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

export default LabelsList;
