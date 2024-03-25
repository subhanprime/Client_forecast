import { Globe } from 'lucide-react';
import React, { useState } from 'react';
import DynamicDropdown, { DropdownData } from '../dropdown/DynamicDropdown';

interface Props {
  icon: JSX.Element;
  heading:string;
  substring:string;
  data:DropdownData[];
  onSelect?: (data:DropdownData | null)=>void;
  // onChangeToggle?: (selected:boolean)=>void;
  isToggle?:boolean;
  onToggleChange?:(name:string, toggle:boolean)=>void;
  text?:string;
}

function Options({
  icon, heading, substring, data, onSelect, isToggle = false, text, onToggleChange = undefined,
}:Props) {
  const [selected, setSelected] = useState<DropdownData | null>(data[0]);
  const [toggle, setToggle] = useState(false);

  const handleToggled = (t:boolean) => {
    setToggle(t);
    if (onToggleChange) {
      onToggleChange(heading, t);
    }
  };

  return (
    <div className="flex w-full h-12  rounded-md py-1 px-2">
      <div className="flex-[0.7] flex gap-3 items-center h-full ">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200">
          {icon}
        </div>
        <div>
          <div className="font-semibold">{heading}</div>
          <div className="text-xs text-black/80">{substring}</div>
        </div>
      </div>
      <div data-testid="dynamic-dropdown" className="flex-[0.3] h-full">
        {(!isToggle && !text) ? (
          <DynamicDropdown
            className="bg-gray-200 rounded flex items-center justify-between h-full px-3 cursor-pointer select-none"
            defaultName="Everyone"
            dropSize="large"
            data={data}
            icon={selected?.icon ? selected?.icon(13) : <Globe />}
            selected={selected}
            setSelected={setSelected}
            containerStyle="h-full"
            onSelection={onSelect}
          />
        )
          : !text ? (
            <div className="flex text-black/30 items-center w-[90%] cursor-pointer select-none bg-gray-100 h-full rounded-lg justify-center p-1 shadow-inner transition-colors duration-500">
              <div onClick={() => handleToggled(false)} className={`flex-[0.5] flex items-center  justify-center rounded-lg h-full ${!toggle ? 'text-black shadow-md bg-white/80' : ''}`}>No</div>
              <div onClick={() => handleToggled(true)} className={`flex-[0.5] flex items-center  justify-center  rounded-lg h-full ${toggle ? 'text-black shadow-md bg-white/80' : ''}`}>Yes</div>
            </div>
          ) : (
            <div className=" ml-4 text-sm items-center font-semibold">{text}</div>
          )}
      </div>
    </div>
  );
}

export default Options;
