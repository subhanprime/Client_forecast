import React, {
  useEffect, useRef, useState, RefObject,
} from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

export interface DropdownData {
  id?:number | string | undefined
  name: string ;
  subtext:string | null;
  icon?: ((size:number) => JSX.Element) | null;
  symbol: string | null
  department_id?: number,
  parent_id?: null | number,
  departmentName?: string
}

interface DropdownProps {
  defaultName:string ;
  hasChevron?:boolean;
  data:DropdownData[];
  icon: (JSX.Element) | null;
  isNameShown?:boolean;
  className:string
  dropSize:'large' | 'small',
  selectable?:boolean
  hoverClasses?: string;
  containerStyle?:string,
  selected:DropdownData | null,
  setSelected: React.Dispatch<React.SetStateAction<DropdownData | null>>,
  isCancelable?:boolean
  onSelection?:(data:DropdownData | null)=>void
}

function DynamicDropdown({
  data, defaultName, icon,
  hasChevron = true, isNameShown = true, className, dropSize, selectable = true,
  hoverClasses = 'hover:bg-gray-300', containerStyle = '', selected, setSelected, isCancelable = false, onSelection,
}:DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [data, defaultName]);
  const handleClick = (check:DropdownData) => {
    if (selectable) {
      setSelected(check);
    }
    if (onSelection) {
      onSelection(check);
    }
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${containerStyle}`}>
      <div
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className={`${className} active:bg-gray-400 active:scale-[0.98] transition-all 
              ${isOpen ? 'bg-gray-300' : ''} hover:bg-gray-300`}
      >
        {icon && icon}
        {isNameShown && <div>{selected?.name || defaultName}</div>}
        <div className="flex gap-3 items-center">

          {isCancelable && selected && (
            <div
              data-testid="cancel-icon"
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
                if (onSelection) {
                  onSelection(null);
                }
              }}
              className="h-5 w-5 hover:bg-gray-400 flex items-center justify-center  rounded"
            >
              <X size={12} color="black" />
            </div>
          )}
          {hasChevron && <ChevronDown size={10} color="black" />}
        </div>
      </div>
      {isOpen && (
        <div
          className="rounded bg-white p-1 z-50 absolute text-sm select-none max-h-56 overflow-auto scrollbar shadow-xl w-full transition-all duration-100 top-10"
          //   style={{ top: dropdownPosition.top, left: dropdownPosition.left }}

        >
          {data.map((check) => (
            <div
              key={check.name}
              onClick={() => handleClick(check)}
              className={`${dropSize === 'large' ? '' : 'text-xs'} w-full ${hoverClasses} py-2 rounded-md px-2 flex gap-2 items-center transition-color duration-200 ease-cubic-bezier`}
            >
              {check.icon && check.icon(dropSize === 'large' ? 23 : 18)}
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-1 font-semibold">
                  {check.name}
                  { check.subtext && (
                    <div className="text-[11px] font-normal ">

                      {check.subtext}
                    </div>
                  )}
                </div>
                {check.symbol && <div className="text-center">{check.symbol}</div>}
                {selectable && (selected?.name === check.name) && <Check size={dropSize === 'large' ? 20 : 15} />}

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DynamicDropdown;
