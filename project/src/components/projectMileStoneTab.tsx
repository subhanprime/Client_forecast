import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import closeIcon from '../media/svg/crossIcon.svg';

interface Milestone {
  name: string;
  from: Date | null;
  to: Date | null;
}

interface ProjectMilestoneProps {
  milestones: Milestone[];
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
}

function ProjectMilestoneTab({ milestones, setMilestones }: ProjectMilestoneProps) {
  const [milestone, setMilestone] = useState<Milestone>({
    name: '',
    from: new Date(),
    to: new Date(),
  });

  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const handleAddMilestone = () => {
    if (milestone.name && milestone.from && milestone.to) {
      setMilestones([...milestones, milestone]);
      setMilestone({ name: '', from: new Date(), to: new Date() });
    }
  };

  const handleRemoveMilestone = (index: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  return (
    <div className="p-2">
      <div className="bg-gray-100 p-4 rounded">
        <div className="mb-2 text-xs font-medium text-gray-800">Milestone Name</div>
        <div className="w-full mb-2">
          <input
            type="text"
            placeholder="Milestone name"
            className="border rounded px-3 py-2 w-full focus:outline-none text-gray-700"
            value={milestone.name}
            onChange={(e) => setMilestone({ ...milestone, name: e.target.value })}
          />
        </div>
        <div className="flex justify-between items-center my-3">
          <div className="flex gap-2">
            <div>
              <div className="text-gray-800 text-xs font-semibold">From</div>
              <DatePicker
                selected={milestone.from}
                onChange={(date) => setMilestone({ ...milestone, from: date })}
                selectsStart
                startDate={milestone.from}
                endDate={milestone.to}
                dateFormat="d MMM yyyy" // Set the date format here
                className="bg-gray-100 border-b border-gray-300 px-3 py-2 w-36 max-w-36 focus:outline-none text-gray-800 text-lg font-medium"
              />
            </div>
            <div>
              <div className="text-gray-800 text-xs font-semibold">To</div>
              <DatePicker
                selected={milestone.to}
                onChange={(date) => setMilestone({ ...milestone, to: date })}
                selectsEnd
                startDate={milestone.from}
                endDate={milestone.to}
                dateFormat="d MMM yyyy" // Set the date format here
                minDate={milestone.from}
                className="bg-gray-100 border-b border-gray-300 px-3 py-2 w-36 max-w-36 focus:outline-none text-gray-800 text-lg font-medium"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleAddMilestone}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none text-sm"
            >
              Add Milestone
            </button>
          </div>
        </div>
      </div>
      <div className="my-2 h-[250px] overflow-y-scroll">
        {milestones.map((item, index) => (
          <div key={index} className={`px-2 mb-2 flex justify-between items-center border-b ${index === 0 ? 'border-t' : ''}`}>
            <div>
              <p className="text-lg text-gray-800 font-medium">{item.name}</p>
              <div className="flex justify-center">
                <p>{formatDate(item.from)}</p>
                <div className="px-1">&minus;</div>
                <p>{formatDate(item.to)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveMilestone(index)}
              className="text-red-500 hover:text-red-600 focus:outline-none"
            >
              <img src={closeIcon} alt="cross" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectMilestoneTab;
