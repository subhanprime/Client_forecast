import React, { useState } from 'react';
import { accountTypeDescription, formatDate, getInitials } from '../../utils/helper';
import TabOptions from '../../enum/Enums';
// Enums

function PeopleModal({
  isModalOpen, closeModal, selected,
}:PeopleModalProps) {
  const [selectedTab, setSelectedTab] = useState<TabOptions>(TabOptions.INFO);

  const handleTabClick = (tab: TabOptions) => {
    setSelectedTab(tab);
  };
  return (
    <div>

      {/* Main modal */}
      {isModalOpen && selected && (
        <div
          id="default-modal"
          aria-hidden="true"
          className={`${
            isModalOpen && selected ? 'fixed flex' : 'hidden'
          } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-start w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white/40 bg-opacity-50`}
          onClick={closeModal}
        >
          <div
            data-testid="default-modal"
            className="relative p-4 w-full max-w-2xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-2xl  mt-24">
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 pt-4   rounded-t ">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {selected && selected.name ? selected.name : '---'}
                </h3>
                <div>
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-indigo-700 font-semibold text-2xl ">
                    {selected && selected.name ? getInitials(selected.name) : '---'}
                  </div>
                </div>

              </div>
              {/* Modal body */}
              <div className="px-4 md:px-5 pt-2 space-y-4 ">
                {/* Render tabs */}
                <ul className="flex flex-wrap text-base font-medium text-center text-gray-500  border-gray-200 dark:text-gray-400 pb-1">
                  {Object.values(TabOptions).map((tab) => (
                    <li key={tab} className="me-2">
                      <div
                        onClick={() => handleTabClick(tab)}
                        className={`${
                          selectedTab === tab
                            ? 'inline-block px-2 py-2 text-blue-700  rounded-t-lg active border-b-[3px] border-blue-500 dark:text-blue-500 cursor-pointer'
                            : 'inline-block px-2 py-2 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer'
                        }`}
                      >
                        {tab}
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Render content based on selected tab */}
                <div>
                  {selectedTab === TabOptions.INFO && (
                    <div className="flex flex-col px-2 pb-5 gap-5">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-600 font-semibold">Department</p>
                        <p className="font-semibold text-black/80">{selected && selected.department_id === 16913892 ? 'Engineering' : '---'}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-600 font-semibold">Type</p>
                        <p className="font-semibold text-black/80">
                          {selected && selected.employee_type === 1 ? 'Employee' : '---'}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedTab === TabOptions.ACCESS && (
                    <div className="flex flex-col px-2 pb-5 gap-5">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-600 font-semibold">Access</p>
                        <p className="font-semibold text-black/80">{accountTypeDescription(selected && selected.account_type)}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-gray-600 font-semibold">Email</p>
                        <p className="font-semibold text-black/80">
                          {' '}
                          {selected && selected.email}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedTab === TabOptions.AVAILABILITY
                && (
                  <div className="flex flex-col px-2 pb-5 gap-5">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-gray-600 font-semibold">Start date</p>
                      <p className="font-semibold text-black/80">{selected && selected.start_date ? formatDate(selected.start_date) : '---'}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-gray-600 font-semibold">End date</p>
                      <p className="font-semibold text-black/80">
                        {' '}
                        {selected && selected.end_date ? formatDate(selected.end_date) : '---'}
                      </p>
                    </div>
                    <div className="flex gap-3 text-sm cursor-default">
                      <div className="rounded bg-blue-200 py-2 px-3 text-blue-600 font font-semibold">Full-Time</div>
                      <div className="rounded bg-gray-100 py-2 px-3 text-gray-600 font font-semibold">Part-Time</div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Public Holidays</p>
                      <p className="font-semibold text-black/80">---</p>
                    </div>
                  </div>
                )}
                  {selectedTab === TabOptions.PROJECTS && (
                    <div id="projects" data-testid="projects" className="pb-5 border-t pt-2">
                      {selected && selected.projects.map((proj:Projects) => (
                        <div key={proj.project_id} className="w-full flex gap-3 items-center border-b pb-2 mb-2">
                          <div style={{ backgroundColor: `#${proj.color}` }} className="h-10 w-10 rounded-full" />
                          <div>
                            <p>
                              {proj.name}
                            </p>
                            <p className="text-xs">No Client</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Modal footer */}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PeopleModal;
