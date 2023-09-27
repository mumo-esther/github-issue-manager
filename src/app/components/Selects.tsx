import React, { useState, useEffect } from 'react';
import { Label, Milestone, Assignee } from '../interfaces/issueTypes';
import { fetchAssignees, fetchLabels, fetchMilestones } from '../api/githubAPI';
import { useFilterContext } from '../context/FilterContext';

interface SelectsProps {
  onFilterChange: (label: string | null, assignee: string | null, milestone: string | null) => void;
}

function Selects({ onFilterChange }: SelectsProps) {
  const {
    selectedLabel,
    setSelectedLabel,
    selectedMilestone,
    setSelectedMilestone,
    selectedAssignee,
    setSelectedAssignee,
  } = useFilterContext();

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    fetchLabels().then((labelsData: Label[]) => setLabels(labelsData));
    fetchMilestones().then((milestonesData: Milestone[]) => setMilestones(milestonesData));
    fetchAssignees().then((assigneesData: Assignee[]) => setAssignees(assigneesData));
  }, []);

  useEffect(() => {
   
    onFilterChange(selectedLabel, selectedAssignee, selectedMilestone);
  }, [selectedLabel, selectedAssignee, selectedMilestone, onFilterChange]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = e.target.value;
    setSelectedLabel(selectedLabel);
  };

  const handleMilestoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMilestone = e.target.value;
    setSelectedMilestone(selectedMilestone);
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAssignee = e.target.value;
    setSelectedAssignee(selectedAssignee);
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleLabelChange}
        value={selectedLabel}
      >
        <option value="">Label</option>
        {labels.map((label) => (
          <option key={label.id} value={label.name}>
            {label.name}
          </option>
        ))}
      </select>
     {/**<select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleMilestoneChange}
        value={selectedMilestone || ''}
      >
        <option value="">Milestones</option>
        {milestones.map((milestone) => (
          <option key={milestone.id} value={milestone.title}>
            {milestone.title}
          </option>
        ))}
      </select> */} 
      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleAssigneeChange}
        value={selectedAssignee || ''}
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
