import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DynamicDropdown, { DropdownData } from '../../dropdown/DynamicDropdown';
import { useAppSelector } from '../../../app/hooks';

function ColorComp({ color }:{ color:string }) {
  return (
    <div style={{ backgroundColor: `#${color}` }} className="h-5 w-5 rounded-full" />
  );
}
export default function Projects({ onClose, isEdit, selectedData }:any) {
  const [selected, setSelected] = useState<DropdownData | null>(null);
  const [projectOptions, setProjectOptions] = useState<DropdownData[]>([]);
  const [selectedProjectOptions, setSelectedProjectOptions] = useState<DropdownData[]>([]);

  const projects = useAppSelector((state) => state.data.projects);
  useEffect(() => {
    if (projects.length > 0) {
      const temp:DropdownData[] = projects.map((pro) => ({
        id: pro.project_id,
        name: pro.name,
        subtext: null,
        symbol: null,
        icon: () => <ColorComp color={pro.color} />,
      }));
      setProjectOptions(temp);
    }

    return () => {
      setSelectedProjectOptions([]);
    };
  }, [projects]);
  useEffect(() => {
    if (selectedData && isEdit && selectedData.projects && selectedData.projects.length > 0) {
      const temp:DropdownData[] = selectedData.projects.map((pro:any) => ({
        id: pro.project_id,
        name: pro.name,
        subtext: null,
        symbol: null,
        icon: () => <ColorComp color={pro.color} />,
      }));
      setSelectedProjectOptions(temp);
    }
    if (!isEdit) {
      setSelectedProjectOptions([]);
    }
  }, [selectedData, isEdit]);

  const handleSelect = (data:DropdownData | null) => {
    if (!data) {
      return;
    }
    setSelected(null);
    setProjectOptions(projectOptions.filter((pro) => !(pro.id === data?.id)));
    setSelectedProjectOptions([...selectedProjectOptions, data]);
  };
  const handleRemoveProject = (projectId: any) => {
    const updatedSelectedProjects = selectedProjectOptions.filter((pro) => pro.id !== projectId);
    setSelectedProjectOptions(updatedSelectedProjects);
  };

  return (
    <div data-testid="mock-select" className="flex flex-col gap-3 py-3">
      <div className="bg-gray-100 rounded flex flex-col gap-2 items-center p-4">
        <div className="self-start">
          Projects
        </div>
        <div data-testid="dropdown" className="w-full">

          <DynamicDropdown
            data={projectOptions}
            defaultName="Select Projects"
            icon={null}
            dropSize="large"
            hasChevron
            className="w-full flex items-center justify-between px-4 py-2 text-gray-700 bg-white rounded selection-none"
            containerStyle="w-full rounded-lg"
            selected={selected}
            setSelected={setSelected}
            isCancelable
            onSelection={handleSelect}
          />
        </div>

      </div>
      {/* <div>
        Once access rights are selected, your teammate will receive an email invitation to
        join your team.
      </div> */}
      <div>
        {selectedProjectOptions.map((pro) => (
          <div key={pro.id} className="flex items-center justify-between border-b  p-2 rounded">
            <div className="flex gap-3 items-center">
              {pro.icon && pro.icon(12)}
              <div>{pro.name}</div>
            </div>
            <X data-testid={`remove-button-${pro.id}`} onClick={() => handleRemoveProject(pro.id)} className="cursor-pointer" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-5">
        <button type="button" className="bg-blue-500 text-neutral-100 px-2 h-10 rounded-md text-sm">Add Person</button>
        <button type="button" onClick={onClose} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
      </div>
    </div>
  );
}

// export default Projects;
