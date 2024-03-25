/* eslint-disable react/react-in-jsx-scope */
import {
  BellRing, Calendar, LogOut, Speaker, User,
} from 'lucide-react';
import { RefObject, useEffect, useRef } from 'react';

function ProfileMenu({ onClose, onProfileClick, onCalenderClick }: any) {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const openWhatsNew = () => {
    // Open the desired URL in a new tab or window
    window.open('https://www.float.com/whats-new/?utm_medium=nav', '_blank');
    onClose(); // Close the profile menu
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="bg-white absolute top-[-220px] left-[70px] z-50 p-2 rounded-md shadow-2xl w-[250px] h-[250px]">
      <div className="cursor-pointer text-lg font-bold" onClick={onClose}>
        Personal
      </div>
      <div className="cursor-pointer" onClick={onClose}>
        <div className="flex gap-4 items-center mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1" onClick={onProfileClick}>
          <div>
            <User size={20} />
          </div>
          <div className="text-gray-600">Profile Settings</div>
        </div>
        <div className="flex gap-4 items-center  mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 " onClick={onCalenderClick}>
          <div>
            <Calendar size={20} />
          </div>
          <div className="text-gray-600">Calender Integrations</div>
        </div>
        <div className="flex gap-4 items-center  mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 ">
          <div>
            <BellRing size={20} />
          </div>
          <div className="text-gray-600">Notifications</div>
        </div>
        <div className="flex gap-4 items-center  mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1" onClick={openWhatsNew}>
          <div>
            <Speaker size={20} />
          </div>
          <div className="text-gray-600">What's new</div>
        </div>
        <div className="flex gap-4 items-center  mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 ">
          <div>
            <LogOut size={20} />
          </div>
          <div className="text-gray-600">Sign Out</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
