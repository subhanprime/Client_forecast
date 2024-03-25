import React, { useState } from 'react';
import Info from './infoTab/Info';
import Access from './accessTab/Access';
import Availability from './availabilityTab/Availability';
import Projects from './projectTab/Projects';
import { useAppSelector } from '../../app/hooks';
import Manages from './managesTab/Manages';
import AddPhotoModal from './addPhoto/AddPhotoModal';

function MemberModal({
  isModalOpen, closeModal, selected, isEdit,
}:MemberModalProps) {
  enum TabOptions {
    INFO = 'Info',
    ACCESS = 'Access',
    AVAILABILITY = 'Availability',
    PROJECTS = 'Projects',
    MANAGES = 'Manages',
  }
  const [selectedTab, setSelectedTab] = useState<TabOptions>(TabOptions.INFO);
  // const [userImage, setUserImage] = useState();
  // const { management, taskDetails, confirm } = useAppSelector((state) => state.modal);
  const { isPeopleManager } = useAppSelector((state) => state.data);
  const handleTabClick = (tab: TabOptions) => {
    setSelectedTab(tab);
  };

  const showTabs = () => Object.values(TabOptions).filter((tab) => {
    if (!isPeopleManager && tab === TabOptions.MANAGES) {
      return false;
    }
    return true;
  });
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
            className="relative p-4 w-full max-w-xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-2xl  mt-24">
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 pt-4   rounded-t ">
                <div>
                  <input type="text" placeholder="Name" value={isEdit ? selected.name : ''} onChange={() => {}} className="bg-gray-50 h-15 w-30 text-xl border-none bg-transparent outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <input type="text" placeholder="Email" value={isEdit ? selected.email || '' : ''} onChange={() => {}} className="bg-gray-50 h-15 w-30 border-none bg-transparent outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {/* <div>
                  <div className="w-14 h-14 flex items-center justify-center rounded-full
                   bg-blue-100 text-indigo-700 font-semibold text-2xl hover:bg-gray-500
                    cursor-pointer "
                  />
                </div> */}
                <div>
                  <AddPhotoModal />
                </div>
              </div>
              {/* Modal body */}
              <div data-testid="tabs" className="px-4 md:px-5 pt-2 space-y-4 ">
                {/* Render tabs */}
                <ul className="flex flex-wrap text-base font-medium text-center text-gray-500  border-gray-200 dark:text-gray-400 pb-1">
                  {showTabs().map((tab) => (
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
                    <Info
                      onClose={closeModal}
                      isEdit={isEdit}
                      selected={selected}
                    />
                  )}
                  {selectedTab === TabOptions.ACCESS && <Access onClose={closeModal} />}
                  {selectedTab === TabOptions.AVAILABILITY && (
                    <Availability
                      onClose={closeModal}
                      isEdit={isEdit}
                      selectedData={selected}
                    />
                  )}
                  {selectedTab === TabOptions.PROJECTS && (
                    <Projects
                      onClose={closeModal}
                      isEdit={isEdit}
                      selectedData={selected}
                    />
                  )}
                  {selectedTab === TabOptions.MANAGES && (<Manages onClose={closeModal} />)}
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

export default MemberModal;
