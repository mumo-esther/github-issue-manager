import React, { useEffect, useState } from 'react';
import { Label, Assignee } from '../interfaces/issueTypes';
import { fetchAssignees, fetchLabels, addAssignees, addLabel, removeAssignee, removeLabel } from '../api/githubAPI';
import Swal from 'sweetalert2';
import { Plus, Minus } from 'react-feather';

interface DetailsSelectProps {
  issueNumber: number | null;
}

function DetailsSelect({ issueNumber }: DetailsSelectProps) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);

  useEffect(() => {
    fetchLabels().then((labelsData: Label[]) => {
      setLabels(labelsData);
    });

    fetchAssignees().then((assigneesData: Assignee[]) => {
      setAssignees(assigneesData);
    });
  }, []);

  const handleAddLabel = async () => {
    if (selectedLabel && issueNumber) {
      try {
        const labelsToAdd = [selectedLabel];
        await addLabel(issueNumber, labelsToAdd);
        Swal.fire('Label Added', '', 'success');
        setSelectedLabel(null);
      } catch (error) {
        console.error('Error adding label:', error);
        Swal.fire('Error', 'Failed to add label', 'error');
      }
    }
  };
  
  const handleRemoveLabel = async () => {
    if (selectedLabel && issueNumber) {
      try {
        await removeLabel(issueNumber, selectedLabel); 
        Swal.fire('Label Removed', '', 'success');
        setSelectedLabel(null);
      } catch (error) {
        console.error('Error removing label:', error);
        Swal.fire('Error', 'Failed to remove label', 'error');
      }
    }
  };
  

  const handleAddAssignee = async () => {
    if (selectedAssignee && issueNumber) {
      try {
        await addAssignees(issueNumber, [selectedAssignee]); 
        Swal.fire('Assignee Added', '', 'success');
        setSelectedAssignee(null);
      } catch (error) {
        console.error('Error adding assignee:', error);
        Swal.fire('Error', 'Failed to add assignee', 'error');
      }
    }
  };
  

  const handleRemoveAssignee = async () => {
    if (selectedAssignee && issueNumber) {
      try {
        await removeAssignee(issueNumber, [selectedAssignee]);
        Swal.fire('Assignee Removed', '', 'success');
        setSelectedAssignee(null);
      } catch (error) {
        console.error('Error removing assignee:', error);
        Swal.fire('Error', 'Failed to remove assignee', 'error');
      }
    }
  };
  

  return (
    <div className="flex flex-wrap justify-start items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <div className="">
        <select
          className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedLabel || ''}
          onChange={(e) => setSelectedLabel(e.target.value)}
        >
          <option value="">Select Label</option>
          {labels.map((label) => (
            <option key={label.id} value={label.name}>
              {label.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={handleAddLabel}
      >
        <Plus size={16} /> 
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        onClick={handleRemoveLabel}
      >
        <Minus size={16} /> 
      </button>

      <div className="">
        <select
          className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedAssignee || ''}
          onChange={(e) => setSelectedAssignee(e.target.value)}
        >
          <option value="">Select Assignee</option>
          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee.login}>
              {assignee.login}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={handleAddAssignee}
      >
        <Plus size={16} /> 
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        onClick={handleRemoveAssignee}
      >
        <Minus size={16} /> 
      </button>
    </div>
  );
}

export default DetailsSelect;
