// Selects.tsx

import React, { useState, useEffect } from 'react';
import { Label, Milestone, Assignee } from '../interfaces/issueTypes';
import { fetchAssignees, fetchLabels, fetchMilestones } from '../api/githubAPI';

interface SelectsProps {
  onFilterChange: (label: string | null, assignee: string | null, milestone: string | null) => void;
}

function Selects({ onFilterChange }: SelectsProps) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);

  useEffect(() => {
    fetchLabels().then((labelsData: Label[]) => setLabels(labelsData));
    fetchMilestones().then((milestonesData: Milestone[]) => setMilestones(milestonesData));
    fetchAssignees().then((assigneesData: Assignee[]) => setAssignees(assigneesData));
  }, []);

  const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = e.target.value || null;
    setSelectedLabel(selectedLabel);
    onFilterChange(selectedLabel, selectedAssignee, selectedMilestone);
  };

  const handleMilestoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMilestone = e.target.value || null;
    setSelectedMilestone(selectedMilestone);
    onFilterChange(selectedLabel, selectedAssignee, selectedMilestone);
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAssignee = e.target.value || null;
    setSelectedAssignee(selectedAssignee);
    onFilterChange(selectedLabel, selectedAssignee, selectedMilestone);
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleLabelChange}
      >
        <option value="">Label</option>
        {labels.map((label) => (
          <option key={label.id} value={label.name}>
            {label.name}
          </option>
        ))}
      </select>
      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleMilestoneChange}
      >
        <option value="">Milestones</option>
        {milestones.map((milestone) => (
          <option key={milestone.id} value={milestone.title}>
            {milestone.title}
          </option>
        ))}
      </select>
      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleAssigneeChange}
      >
        <option value="">Assignee</option>
        {assignees.map((assignee) => (
          <option key={assignee.id} value={assignee.login}>
            {assignee.login}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selects;
