import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import scheduleIcon from '../media/svgs/line.svg';
import peopleIcon from '../media/svgs/people.svg';
import reportIcon from '../media/svgs/reports.svg';
import logSvg from '../media/svgs/log.svg';
import projectIcon from '../media/svgs/project.svg';
import '../App.css';
import ProfileMenu from './profileMenu/ProfileMenu';
import HelpMenu from './helpMenu/HelpMenu';
import ProfileModal from './profileModal/ProfileModal';
import CalenderModal from './calenderModal/CalenderModal';
import Settings from './sidebarSettings/Settings';
import NotificationModal from './notificationModal/NotificationModal';

function Sidebar() {
  const [isProfilePopupActive, setIsProfilePopupActive] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCalenderModalOpen, setIsCalenderModalOpen] = useState(false);

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  const closeProfilePopup = () => {
    setIsProfilePopupActive(false);
  };
  const profileModalOpener = (event:any) => {
    event.stopPropagation();
    setIsProfileModalOpen(!isProfileModalOpen);
    closeProfilePopup();
  };

  const handleProfileClick = (event:any) => {
    event.stopPropagation();
    setIsProfilePopupActive(true);
  };
  const calenderModalOpener = (event:any) => {
    event.stopPropagation();
    setIsCalenderModalOpen(true);
    closeProfilePopup();
  };
  const closeCalenderModal = () => {
    setIsCalenderModalOpen(false);
  };
  const location = useLocation();
  return (
    <div>
      {isProfileModalOpen && (
        <ProfileModal
          closeModal={closeProfileModal}
          isModalOpen={profileModalOpener}
        />
      )}
      {isCalenderModalOpen && (
        <CalenderModal
          closeModal={closeCalenderModal}
          isModalOpen={calenderModalOpener}
        />
      )}

      <div className="h-screen w-[70px] bg-gray-100 ">
        <ul className="flex flex-col justify-between h-full">
          <div className="flex flex-col justify-center items-center gap-y-4 pt-3">
            <div>
              <li className="pt-2 flex flex-col justify-center items-center">
                <Link
                  to="/scheduling"
                  className={location.pathname === '/scheduling' ? 'active' : ''}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img src={scheduleIcon} alt="" className="p-1" />
                  </div>
                </Link>
              </li>
              <div className="text-[10px] text-center mt-1">Schedule</div>
            </div>

            <div>
              <li className="pt-2 flex flex-col justify-center items-center">
                <Link
                  to="/people"
                  className={location.pathname === '/people' ? 'active' : ''}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img src={peopleIcon} alt="" className="p-1" />
                  </div>
                </Link>
              </li>
              <div className="text-[10px] text-center mt-1">People</div>
            </div>

            <div>
              <li className="pt-2 flex flex-col justify-center items-center">
                <Link
                  to="/project"
                  className={location.pathname === '/project' ? 'active' : ''}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img src={projectIcon} alt="" className="p-1" />
                  </div>
                </Link>
              </li>
              <div className="text-[10px] text-center mt-1">Projects</div>
            </div>

            <div>
              <li className="pt-2 flex flex-col justify-center items-center">
                <Link
                  to="/reports"
                  className={location.pathname === '/reports' ? 'active' : ''}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img src={reportIcon} alt="" className="p-1" />
                  </div>
                </Link>
              </li>
              <div className="text-[10px] text-center mt-1">Reports</div>
            </div>

            <div>
              <li className="pt-2 flex flex-col justify-center items-center">
                <Link
                  to="/log"
                  className={location.pathname === '/log' ? 'active' : ''}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img src={logSvg} alt="" className="p-1" />
                  </div>
                </Link>
              </li>

              <div className="text-[10px] text-center mt-1">Log Time</div>
            </div>
          </div>

          {/* _________________________________________________________________________ */}

          <div>
            <div>
              <Settings />
            </div>
            <div>
              <HelpMenu />
            </div>

            <div>
              <NotificationModal />
            </div>
            <div className="relative">
              <div
                className="flex justify-center items-center mb-3"
                onClick={handleProfileClick}
              >
                <span className="w-[30px] h-[30px] bg-orange-800 flex justify-center items-center rounded-full cursor-pointer">
                  P
                </span>
              </div>
              {isProfilePopupActive && (
                <ProfileMenu
                  onClose={closeProfilePopup}
                  onProfileClick={profileModalOpener}
                  onCalenderClick={calenderModalOpener}
                />
              )}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
