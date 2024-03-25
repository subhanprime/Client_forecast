import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import DynamicDropdown, { DropdownData } from '../../dropdown/DynamicDropdown';
import { useAppSelector } from '../../../app/hooks';

export default function Manages({ onClose }:any) {
  const [selected, setSelected] = useState<DropdownData | null>(null);
  const [peopleOptions, setPeopleOptions] = useState<DropdownData[]>([]);
  const [selectedPeopleOptions, setSelectedPeopleOptions] = useState<DropdownData[]>([]);
  // const { people } = useAppSelector((state) => state.data);
  const people = useAppSelector((state) => state.data.people || []);
  // const { people } = useAppSelector((state) => state.data || { people: [] });

  useEffect(() => {
    if (people && people.length > 0) {
      const temp:DropdownData[] = people.map((pro) => ({
        id: pro.people_id,
        name: pro.name,
        subtext: null,
        symbol: null,
        // icon: () => <ColorComp color={pro.color} />,
      }));
      setPeopleOptions(temp);
    }
  }, [people]);

  const handleSelect = (data:DropdownData | null) => {
    if (!data) {
      return;
    }
    setSelected(null);
    setPeopleOptions(peopleOptions.filter((pro) => !(pro.id === data?.id)));
    setSelectedPeopleOptions([...selectedPeopleOptions, data]);
  };
  const handleRemoveProject = (projectId: any) => {
    const updatedSelectedProjects = selectedPeopleOptions.filter((pro) => pro.id !== projectId);
    setSelectedPeopleOptions(updatedSelectedProjects);
  };

  return (
    <div data-testid="mock-manages-select" className="flex flex-col gap-3 py-3">
      <div className="bg-gray-100 rounded flex flex-col gap-2 items-center p-4">
        <div className="self-start">
          Access
        </div>

        <DynamicDropdown
          data={peopleOptions}
          defaultName="Select People"
          icon={null}
          dropSize="large"
          hasChevron
          className="w-full flex items-center justify-between px-4 py-2 text-gray-700 bg-white rounded selection-none"
          containerStyle="w-full rounded-lg"
          selected={selected}
          setSelected={setSelected}
          onSelection={handleSelect}
          isCancelable
        />

      </div>
      <div>
        {selectedPeopleOptions.map((peop) => (
          <div data-testid="mock-X-icon" key={peop.id} className="flex items-center justify-between border-b  p-2 rounded">
            <div className="flex gap-3 items-center">
              {peop.icon && peop.icon(12)}
              <div>{peop.name}</div>
            </div>
            <X onClick={() => handleRemoveProject(peop.id)} className="cursor-pointer" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-5">
        <button type="button" className="bg-blue-500 text-neutral-100 px-2 h-10 rounded-md text-sm">Add & invite person</button>
        <button type="button" onClick={onClose} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
      </div>

    </div>
  );
}
