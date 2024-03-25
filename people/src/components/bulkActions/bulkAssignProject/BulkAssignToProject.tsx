import React, { useEffect, useState } from 'react';
import DynamicDropdown, { DropdownData } from '../../dropdown/DynamicDropdown';
import { useAppSelector } from '../../../app/hooks';

function BulkAssignToProject({ closeModal, isModalOpen } :any) {
  const [selected, setSelected] = useState<DropdownData | null>(null);
  const [projectOptions, setProjectOptions] = useState<DropdownData[]>([]);

  const projects = useAppSelector((state) => state.data.projects);
  const handleSelect = (data:DropdownData | null) => {
    if (data) {
      setSelected(data);
    }
  };
  useEffect(() => {
    if (projects.length > 0) {
      const temp:DropdownData[] = projects.map((pro) => ({
        id: pro.project_id,
        name: pro.name,
        subtext: null,
        symbol: null,
      }));
      setProjectOptions(temp);
    }
  }, [projects]);
  return (
    <div>
      {/* Main modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className={`${
            isModalOpen ? 'fixed flex' : 'hidden'
          } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-start w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white/40 bg-opacity-50`}
          onClick={closeModal}
        >
          <div
            className="relative p-4 w-full max-w-xl max-h-full "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-2xl pb-4
             mt-24"
            >

              <div className="px-4 text-2xl font-semibold py-4">
                Assign to project
              </div>
              <div className="flex flex-col gap-3 py-3">
                <div className=" rounded flex flex-col gap-2 items-center p-4">
                  <div className="self-start">
                    Field
                  </div>
                  <div className="w-full">
                    <DynamicDropdown
                      data={projectOptions}
                      defaultName="Select Project"
                      icon={null}
                      dropSize="large"
                      hasChevron
                      className="w-full flex items-center justify-between px-3 py-1 text-gray-700 bg-white rounded selection-none border"
                      containerStyle="w-full rounded-lg"
                      selected={selected}
                      setSelected={setSelected}
                      isCancelable
                      onSelection={handleSelect}
                    />
                  </div>

                </div>
              </div>
              <div className="flex gap-2 mt-3 px-4">
                <button type="button" className="bg-blue-600 text-neutral-100 px-2 h-10 rounded-md text-sm">Assign to project</button>
                <button type="button" onClick={closeModal} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BulkAssignToProject;
