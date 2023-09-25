import React, { useEffect, useState } from 'react';
import { Label, Assignee } from '../interfaces/issueTypes';
import { fetchAssignees, fetchLabels, addAssignee, addLabel, removeAssignee, removeLabel } from '../api/githubAPI';
import Swal from 'sweetalert2';

interface DetailsSelectProps {
    issueNumber: number | null; 
  }

function DetailsSelect({ issueNumber }: DetailsSelectProps) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [Assignees, setAssignees] = useState<Assignee[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);

  useEffect(() => {
    fetchLabels()
      .then((labelsData: Label[]) => {
        setLabels(labelsData);
      });

    fetchAssignees()
      .then((AssigneesData: Assignee[]) => {
        setAssignees(AssigneesData);
      });
  }, []);

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLabel(event.target.value);
  };

  const handleAssigneeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAssignee(event.target.value);
  };

  const handleAddLabel = async () => {
    if (selectedLabel) {
      try {
        await addLabel(issueNumber);
        Swal.fire('Label Added', '', 'success');
        setSelectedLabel(null);
      } catch (error) {
        console.error('Error adding label:', error);
        Swal.fire('Error', 'Failed to add label', 'error');
      }
    }
  };

  const handleRemoveLabel = async () => {
    if (selectedLabel) {
      try {
        await removeLabel(issueNumber);
        Swal.fire('Label Removed', '', 'success');
        setSelectedLabel(null);
      } catch (error) {
        console.error('Error removing label:', error);
        Swal.fire('Error', 'Failed to remove label', 'error');
      }
    }
  };

  const handleAddAssignee = async () => {
    if (selectedAssignee) {
      try {
        await addAssignee(issueNumber);
        Swal.fire('Assignee Added', '', 'success');
        setSelectedAssignee(null);
      } catch (error) {
        console.error('Error adding assignee:', error);
        Swal.fire('Error', 'Failed to add assignee', 'error');
      }
    }
  };

  const handleRemoveAssignee = async () => {
    if (selectedAssignee) {
      try {
        await removeAssignee(issueNumber);
        Swal.fire('Assignee Removed', '', 'success');
        setSelectedAssignee(null);
      } catch (error) {
        console.error('Error removing assignee:', error);
        Swal.fire('Error', 'Failed to remove assignee', 'error');
      }
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedLabel || ''}
        onChange={handleLabelChange}
      >
        <option value="">Label</option>
        {labels.map((label) => (
          <option key={label.id} value={label.name}>
            {label.name}
          </option>
        ))}
      </select>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={handleAddLabel}
      >
        Add Label
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        onClick={handleRemoveLabel}
      >
        Remove Label
      </button>

      <select
        className="bg-white text-gray rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedAssignee || ''}
        onChange={handleAssigneeChange}
      >
        <option value="">Assignee</option>
        {Assignees.map((assignee) => (
          <option key={assignee.id} value={assignee.login}>
            {assignee.login}
          </option>
        ))}
      </select>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={handleAddAssignee}
      >
        Add Assignee
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        onClick={handleRemoveAssignee}
      >
        Remove Assignee
      </button>
    </div>
  );
}

export default DetailsSelect;
