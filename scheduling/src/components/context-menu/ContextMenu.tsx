import {
  CheckCircle2, Columns, Link as LinkIcon, MousePointer2, XCircle,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeContext } from '../../feature/calender/calenderSlice';
import { ContextSelectedType } from '../../constants';

interface Button {
  text: string;
  symbol: string;
  key?: ContextSelectedType;
  icon: (size?:number) => JSX.Element;
}

const buttons:Button[] = [
  {
    text: 'Add/Edit',
    symbol: 'A',
    key: ContextSelectedType.Add,
    icon: (size = 12) => <MousePointer2 size={size} />,
  },
  {
    text: 'View',
    symbol: 'V',
    key: ContextSelectedType.View,
    icon: (size = 12) => <Columns size={size} />,
  },
  {
    text: 'Link',
    symbol: 'L',
    icon: (size = 12) => <LinkIcon size={size} />,
  },
  {
    text: 'Complete',
    symbol: 'C',
    icon: (size = 12) => <CheckCircle2 size={size} />,
  },
  {
    text: 'Delete',
    symbol: 'D',
    key: ContextSelectedType.Delete,
    icon: (size = 12) => <XCircle size={size} />,
  },
];

function ContextMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [onButtonClicked, setOnButtonClicked] = useState(false);
  const [selected, setSelected] = useState<Button>(buttons[0]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const { selectedContext } = useAppSelector((state) => state.calender);

  const handleContextMenu = (event:MouseEvent) => {
    // console.log((event.target as HTMLElement).classList.contains('grid-stack'));
    if ((event.target as HTMLElement).classList.contains('grid-stack')) {
      event.preventDefault();
      const { clientX, clientY } = event;
      setPosition({ top: clientY, left: clientX });
      setIsVisible(true);
    }
  };

  const closeContextMenu = () => {
    setIsVisible(false);
    setOnButtonClicked(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeContextMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = event;

    const menuWidth = 230;
    const menuHeight = buttons.length * 57;

    // Calculate the initial position
    const top = (clientY + menuHeight > window.innerHeight)
      ? window.innerHeight - menuHeight : clientY;
    const left = (clientX + menuWidth > window.innerWidth)
      ? window.innerWidth - menuWidth : clientX;

    setPosition({ top, left });
    setIsVisible(!isVisible);
    setOnButtonClicked(!onButtonClicked);
  };

  const handleMenuItemClick = (button:Button) => {
    if (button.key) {
      dispatch(changeContext(button.key));
      setSelected(button);
    }
    setIsVisible(false);
  };

  return (
    <>
      <button type="button" onClick={handleButtonClick} data-testid="context-menu-button" className={`absolute bottom-6 right-6 z-[100] bg-white shadow-xl rounded-lg flex justify-center items-center h-12 w-12 text-xxl mt-14 ${onButtonClicked ? 'text-indigo-800' : 'text-black/60'} `}>
        <div className="h-10 w-10 bg-indigo-200/80 rounded-md flex justify-center items-center">

          {/* <MousePointerClick /> */}
          {selected.icon(20)}
        </div>
      </button>

      {isVisible && (
      <div
        ref={menuRef}
        className="absolute z-[999] "
        style={{ top: position.top, left: position.left }}
        data-testid="context-menu"
        onBlur={closeContextMenu}
      >
        <div className="bg-white w-44 border border-gray-300 rounded-lg flex flex-col py-3 px-2 text-gray-500 shadow-xl">
          {buttons.map((button: Button) => (
            <div
              onClick={() => handleMenuItemClick(button)}
              key={button.symbol}
              className={`${selectedContext === button?.key ? 'text-indigo-600' : ''} flex w-full text-black hover:text-indigo-600 hover:bg-indigo-100 py-2 px-2 rounded items-center select-none cursor-pointer`}
            >
              <div className=" flex items-center flex-[0.2]">{button.icon(14)}</div>
              <div className="text-[15px] flex-[0.6]">{button.text}</div>
              <div className="text-[15px] flex-[0.2] text-center">{button.symbol}</div>
            </div>
          ))}
        </div>
      </div>
      )}
    </>
  );
}

export default ContextMenu;
