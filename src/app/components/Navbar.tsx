import React, { ChangeEvent, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { NavbarProps } from "../interfaces/issueTypes";
import { useFilterContext } from "../context/FilterContext";
import { fetchLabels, fetchMilestones } from "../api/githubAPI";

interface Label {
  id: number;
  name: string;
  // Add other label properties here if necessary
}

interface Milestone {
  id: number;
  title: string;
  // Add other milestone properties here if necessary
}

function Navbar({ onFilterChange }: NavbarProps) {
  const { filter, setFilter } = useFilterContext();
  const [labels, setLabels] = useState<Label[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    // Fetch labels
    fetchLabels()
      .then((labelsData: Label[]) => {
        setLabels(labelsData);
      })
      .catch((error) => {
        console.error("Error fetching labels:", error);
      });

    // Fetch milestones
    fetchMilestones()
      .then((milestonesData: Milestone[]) => {
        setMilestones(milestonesData);
      })
      .catch((error) => {
        console.error("Error fetching milestones:", error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter);
  };

  // ...

return (
  <nav className="bg-white text-black p-4">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select
            className="bg-gray-200 text-black text-center rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">Filters</option>
            <option value="open">Open Issues</option>
            <option value="closed">Closed Issues</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Milestones</option>
            {milestones.map((milestone) => (
              <option key={milestone.id} value={milestone.id}>
                {milestone.title}
              </option>
            ))}
          </select>
          <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Label</option>
            {labels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <SearchBar />
    </div>
  </nav>
);
}

export default Navbar;
