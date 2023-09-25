import React, { useEffect, useState } from 'react';
import { Label, Milestone, Assignee } from '../interfaces/issueTypes';
import { fetchAssignees, fetchLabels, fetchMilestones } from '../api/githubAPI';

function Selects({ issues, setFilteredIssues }) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [Assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [selectedMilestone, setSelectedMilestone] = useState<string>('');

  useEffect(() => {
    fetchLabels()
      .then((labelsData: Label[]) => {
        setLabels(labelsData);
      });

    fetchMilestones()
      .then((milestonesData: Milestone[]) => {
        setMilestones(milestonesData);
      });

    fetchAssignees()
      .then((AssigneesData: Assignee[]) => {
        setAssignees(AssigneesData);
      });

    // This effect will run whenever any of the selection criteria changes.
  }, [selectedLabel, selectedAssignee, selectedMilestone]);

  // Filter issues based on selected criteria and update the filtered list.
  useEffect(() => {
    const filteredIssues = issues.filter((issue) => {
      const hasSelectedLabel = !selectedLabel || issue.labels.includes(selectedLabel);
      const hasSelectedAssignee = !selectedAssignee || issue.assignees.includes(selectedAssignee);
      const hasSelectedMilestone = !selectedMilestone || issue.milestone === selectedMilestone;
      return hasSelectedLabel && hasSelectedAssignee && hasSelectedMilestone;
    });
    setFilteredIssues(filteredIssues);
  }, [issues, selectedLabel, selectedAssignee, selectedMilestone, setFilteredIssues]);

  return (
    <div className="flex items-center space-x-4">
      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
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
        value={selectedAssignee}
        onChange={(e) => setSelectedAssignee(e.target.value)}
      >
        <option value="">Assignee</option>
        {Assignees.map((Assignee) => (
          <option key={Assignee.id} value={Assignee.login}>
            {Assignee.login}
          </option>
        ))}
      </select>
      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedMilestone}
        onChange={(e) => setSelectedMilestone(e.target.value)}
      >
        <option value="">Milestones</option>
        {milestones.map((milestone) => (
          <option key={milestone.id} value={milestone.title}>
            {milestone.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selects;
