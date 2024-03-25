import React, {
  RefObject, useEffect, useRef, useState,
} from 'react';
import { Check, Cog, Plus } from 'lucide-react';
import setting from '../../media/svgs/setting.svg';

function Settings() {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const [isSettingActive, setIsSettingActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsSettingActive(false);
        // More functioanlity will be written here
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleSettingClick = (event: any) => {
    event.stopPropagation();
    setIsSettingActive(!isSettingActive);
  };

  return (
    <div ref={ref}>
      <div
        className="flex justify-center items-center mb-3"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={setting}
          alt="Help"
          className={`p-1 cursor-pointer ${isSettingActive ? 'active' : ''}`}
          onClick={handleSettingClick}
        />
      </div>

      {isSettingActive && (
        <div className="bg-white absolute top-[570px] left-[60px] z-50 p-2 rounded-lg shadow-2xl w-[250px] h-[200px] ">
          <div className="cursor-pointer text-lg font-semibold py-2 " onClick={() => setIsSettingActive(false)}>
            Team
          </div>
          <div className="flex flex-row items-center justify-between mt-3">
            <div>THD</div>
            <Check size={22} />
          </div>

          <div className="flex gap-4 items-center  mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-2 border-b ">
            <div>
              <Cog size={20} />
            </div>
            <div className="text-gray-600">Team settings</div>
          </div>
          <div className="flex gap-4 items-center  mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-2 ">
            <div>
              <Plus size={20} />
            </div>
            <div className="text-gray-600">Create new team</div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Settings;
