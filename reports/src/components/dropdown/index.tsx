import React, { useEffect, useRef, useState } from 'react';

function Dropdown(props: { dropdownList: any; width:string; defaultSelected:string;
  setSelectedState: React.Dispatch<React.SetStateAction<string>> }) {
  const {
    dropdownList, defaultSelected, setSelectedState, width,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelectedValue, setcurrentSelectedValue] = useState(defaultSelected);
  const catMenu = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (value: React.SetStateAction<string>) => {
    setcurrentSelectedValue(value);
    setSelectedState(value);
    closeDropdown();
  };

  const closeOpenMenus = (e: MouseEvent) => {
    if (catMenu.current && isOpen && !catMenu.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (defaultSelected === 'Custom') {
      handleOptionClick(defaultSelected);
    }
  }, [defaultSelected]);

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener('click', closeOpenMenus);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('click', closeOpenMenus);
    };
  }, [isOpen]);

  return (
    <div ref={catMenu} className="relative inline-block border-2 rounded-md z-3">
      <button
        type="button"
        data-testid="dropdown-days"
        className="w-21 border-slate-300 px-2 py-2 text-#4E575F border border-transparent hover:border-blue-500 focus:ring-1 focus:outline-none focus:ring-blue-300 font-small rounded-md text-sm inline-flex space-x-2 justify-between"
        onClick={toggleDropdown}
      >
        <div className={`${width} flex gap-6 px-2 justify-between`}>
          <span>{currentSelectedValue}</span>
          <svg className="w-2.5 h-4.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </div>

      </button>
      {isOpen && (
        <div className={`${width} origin-top-right absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
          <ul className="p-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {dropdownList.map((name:string) => (
              <li>
                <button
                  type="button"
                  className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full flex justify-start"
                  onClick={() => { handleOptionClick(name); }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
