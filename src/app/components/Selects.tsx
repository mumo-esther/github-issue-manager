import React, { useEffect, useState } from 'react'
import { Label, Milestone, Assignee } from '../interfaces/issueTypes';
import { fetchAssignees, fetchLabels, fetchMilestones } from '../api/githubAPI';

function Selects() {

    const [labels, setLabels] = useState<Label[]>([]);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [Assignees, setAssignees] = useState<Assignee[]>([]);
  
    useEffect(() => {
      fetchLabels()
        .then((labelsData: Label[]) => {
          setLabels(labelsData);
        })
  
      fetchMilestones()
        .then((milestonesData: Milestone[]) => {
          setMilestones(milestonesData);
        })

        fetchAssignees()
        .then((AssigneesData: Assignee[]) => {
          setAssignees(AssigneesData);
        })
        
    }, []);
  
  return (
    <div className="flex items-center space-x-4">
       <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Label</option>
            {labels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.name}
              </option>
            ))}
          </select>
          <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Assignee</option>
            {Assignees.map((Assignee) => (
              <option key={Assignee.id} value={Assignee.id}>
                {Assignee.login}
              </option>
              ))}
        </select>
          <select className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Milestones</option>
            {milestones.map((milestone) => (
              <option key={milestone.id} value={milestone.id}>
                {milestone.title}
              </option>
            ))}
          </select>
        </div>
  )
}

export default Selects;