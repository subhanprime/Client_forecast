import React, {
  useEffect, useRef, useState, RefObject,
} from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { DropdownData } from '../../constants';

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
  isSelect?:boolean;
  // selected:DropdownData | null;
  // setSelected:React.Dispatch<React.SetStateAction<DropdownData | null>>;
  onSelection?: (data:DropdownData)=>void;
  onMultiSelection?: (data:DropdownData[])=>void;
  onMultiCancel?: (data:DropdownData[])=>void;
  testid?:string;
  multiSelect?:boolean;
  hoverContainer?:string;
  preSelected?:DropdownData[] | DropdownData;
  adjustHeight?:boolean;
  defaultNameShown?:boolean;
}

function Dropdown({
  data, defaultName, icon,
  hasChevron = true, isNameShown = true, className, dropSize, selectable = true, onSelection,
  hoverClasses = 'hover:bg-gray-300', isSelect = false, testid = 'dropdown', multiSelect = false,
  hoverContainer = 'hover:bg-gray-300', onMultiCancel, onMultiSelection, preSelected, adjustHeight = true,
  defaultNameShown = false,
}:DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropData, setDropData] = useState<DropdownData[]>([]);
  const [selected, setSelected] = useState<DropdownData | null>(null);
  const [multiSelected, setMultiSelected] = useState<DropdownData[]>([]);
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setDropData(data);
  }, [data]);

  useEffect(() => {
    if (preSelected) {
      if (multiSelect) {
        setMultiSelected([...multiSelected].concat(preSelected));
      } else {
        setSelected(Array.isArray(preSelected) ? preSelected[0] : preSelected);
      }
    }
  }, [preSelected]);

  useEffect(() => {
    if (!isSelect && !multiSelect) {
      const def = dropData.filter((drop) => drop.name === defaultName);
      if (def.length === 0) {
        setSelected(dropData[0]);
      } else {
        setSelected(def[0]);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropData, defaultName]);

  useEffect(() => {
    // Update the position of the dropdown based on the button's position
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const top = rect.top + rect.height - 10;
      const left = (rect.left + 165 > window.innerWidth)
        ? -(rect.left + 165 - window.innerWidth) : 0;
      setDropdownPosition({
        top,
        left,
      });
    }
  }, [isOpen]);

  const handleClick = (check:DropdownData) => {
    if (selectable && !multiSelect) {
      setSelected(check);
    }
    if (multiSelect) {
      const newTemp = dropData.filter((item) => item.name !== check.name);
      if (onMultiSelection) {
        onMultiSelection([...multiSelected, check]);
      }
      setDropData(newTemp);
      setMultiSelected([...multiSelected, check]);
    }
    if (onSelection) { onSelection(check); }
    setIsOpen(false);
  };

  const handleMultiRemove = (
    e:any,
    item:DropdownData,
  ) => {
    e.stopPropagation();
    const newTemp = multiSelected.filter((i) => i.name !== item.name);
    setMultiSelected(newTemp);
    if (onMultiCancel) {
      onMultiCancel(newTemp);
    }
    setDropData([...dropData, item]);
  };

  const handleStyle = () => ((isSelect || multiSelect || !adjustHeight) ? {}
    : { top: dropdownPosition.top, left: dropdownPosition.left });

  return (
    <div ref={ref} className="relative">
      <div
        data-testid={testid}
        onClick={() => setIsOpen(!isOpen)}
        className={`${className} border  active:bg-gray-400 active:scale-95 transition-all  duration-200
            ${isOpen ? 'bg-indigo-100 border-indigo-500' : ''} ${hoverContainer} `}
      >
        {icon && icon}
        {isNameShown && !multiSelect && <div>{selected?.name || defaultName}</div>}
        {!isNameShown && defaultNameShown && <div>{defaultName}</div>}
        {isNameShown && multiSelect && (
        <div>
          {(multiSelected.length === 0) ? (
            <div>{defaultName}</div>
          ) : (
            <div className="w-full pr-3 flex gap-2 flex-wrap">

              {multiSelected.map((item, index) => (
                <div key={index} className="bg-gray-200 py-1 px-2 hover:bg-gray-300 rounded flex gap-2 items-center">
                  {item.name}
                  <div className="hover:bg-gray-400 rounded" data-testid={`remove-multi-${index}`} onClick={(e:any) => handleMultiRemove(e, item)}>
                    <X size={12} />

                  </div>
                </div>
              ))}
            </div>
          ) }
        </div>
        )}
        {hasChevron && <ChevronDown size={10} color="black" />}
      </div>
      {isOpen && (
      <div
        className={`rounded bg-white p-1 z-50 absolute text-sm select-none  shadow-xl ${(isSelect || multiSelect) ? 'w-full max-h-56 overflow-auto scrollbar' : 'w-40'}  transition-all duration-300`}
        style={handleStyle()}

      >
        {dropData.map((check) => (
          <div
            key={check.name}
            onClick={() => handleClick(check)}
            className={`${dropSize === 'large' ? '' : 'text-xs'} w-full ${hoverClasses} py-2 rounded-md px-2 flex gap-2 items-center transition-color duration-200 ease-cubic-bezier`}
          >
            {check.icon && check.icon(dropSize === 'large' ? 23 : 18)}
            <div className="flex justify-between items-center w-full">
              {check.name}
              {check.symbol && <div className="text-center">{check.symbol}</div>}
              {(selectable && !multiSelect) && (selected?.name === check.name) && <Check size={dropSize === 'large' ? 20 : 15} />}

            </div>

          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default Dropdown;
