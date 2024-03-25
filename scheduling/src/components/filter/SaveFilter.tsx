import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check, ChevronDown, Edit3, Layers2, MoreHorizontal, Share2, Trash,
} from 'lucide-react';
import saveFilter from '../../images/save-filter.png';
import { SavedFilterType, SavedFilterTypeEnum } from '../../feature/filter/filterSlice';
import FilterSearch from './FilterSearch';
import { OptionActions } from '../../constants';

interface SaveFilterProps {
  handleOpen: (type: 'full' | 'selected' | 'new', ind?: number) => void;
  setIsOpen:(open: boolean) => void;
  isOpen: boolean;
  savedFilter: SavedFilterType[];
  selectedSavedFilter: SavedFilterType | null;
  onSetSavedFilter: (filter: SavedFilterType) => void;
  onSavedFilterActions: (optionAction: OptionActions, filter: SavedFilterType) => void;

}
enum SavedTypeEnum {
  All = 'all',
  Personal = 'personal',
  Shared = 'shared',
}

const options = [
  {
    name: 'Edit View',
    icon: (size = 15) => <Edit3 size={size} />,
    newSection: false,
    action: OptionActions.Edit,
  },
  {
    name: 'Convert to shared view',
    icon: (size = 15) => <Share2 size={size} />,
    newSection: false,
    action: OptionActions.Change,
    for: SavedFilterTypeEnum.Personal,
  },
  {
    name: 'Convert to personal view',
    icon: (size = 15) => <Layers2 size={size} />,
    newSection: false,
    action: OptionActions.Change,
    for: SavedFilterTypeEnum.Shared,
  },
  {
    name: 'Delete View',
    icon: (size = 15) => <Trash size={size} />,
    newSection: true,
    action: OptionActions.Delete,

  },
];
interface Context {
  top:number,
  left:number,
  filter:SavedFilterType
}

function SaveFilter({
  handleOpen, isOpen, setIsOpen, savedFilter, selectedSavedFilter,
  onSetSavedFilter, onSavedFilterActions,
}:SaveFilterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const optionRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState('');
  const [contextOpen, setContextOpen] = useState<Context | null>(null);
  const [selectedDisplay, setSelectedDisplay] = useState(SavedTypeEnum.All);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionRef.current && !optionRef.current.contains(event.target as Node)) {
        setContextOpen(null);
      }
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setContextOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedDisplay(SavedTypeEnum.All);
    setSearch('');
  }, [isOpen]);

  const handleAddFilter = () => {
    handleOpen('new');
  };
  const handleSearchUpdate = (e:any) => {
    setSearch(e.target.value);
  };
  const handleFilter = (t:SavedFilterType) => {
    if (selectedDisplay === SavedTypeEnum.All) {
      return true;
    }
    if (selectedDisplay === SavedTypeEnum.Personal) {
      return t.type === SavedFilterTypeEnum.Personal;
    }
    if (selectedDisplay === SavedTypeEnum.Shared) {
      return t.type === SavedFilterTypeEnum.Shared;
    }
    return false;
  };
  const handleMenuPress = (e:any, filter:SavedFilterType) => {
    e.stopPropagation();
    setContextOpen({
      filter,
      left: e.pageX,
      top: e.pageY,
    });
  };

  return (
    <div ref={ref} data-testid="saved-filters">

      <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-xs border border-gray-300 rounded px-2 py-1 flex gap-2 items-center hover:bg-gray-300 active:bg-gray-400 active:scale-95 transition-all  duration-200">
        <Layers2 size={15} color="black" />
        {selectedSavedFilter && <p>{selectedSavedFilter.name}</p>}
      </button>
      {isOpen && (
        <div
          className={`w-[300px] ${savedFilter.length === 0 ? 'items-center justify-center  p-3' : 'p-2 '}  max-h-[500px] min-h-[350px] absolute top-7 bg-white shadow-lg z-[9999]  rounded-lg flex flex-col gap-6`}
        >
          <AnimatePresence>

            {savedFilter.length === 0
              ? (
                <motion.div
                  initial={{ opacity: 0, x: '-100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '-100%' }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  className="flex flex-col justify-center text-sm items-center px-6 gap-4 h-full text-center"
                >
                  <div>

                    <img src={saveFilter} alt="save filter" />
                  </div>
                  <h2 className="font-bold">No saved Views</h2>
                  <p>
                    Create your first View by adding a filter, then clicking “Save”

                  </p>
                  <button onClick={handleAddFilter} type="button" className="bg-indigo-400 hover:bg-indigo-500 text-white px-2 py-1 rounded">Add a filter</button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: '-100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '-100%' }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  className="flex flex-col gap-2 h-full overflow-auto"
                >
                  <FilterSearch
                    getLength={() => ''}
                    searchValue={search}
                    onChange={handleSearchUpdate}

                  />
                  <div className="text-xs flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      Recent
                      <ChevronDown size={12} />
                    </div>
                    <div className="flex text-xs gap-2  px-2 py-1 rounded-md ">
                      {Object.keys(SavedTypeEnum).map((type) => (

                        <div key={type} className={`${(SavedTypeEnum as any)[type] === selectedDisplay ? 'text-black' : 'text-gray-400 hover:text-black'} relative`}>
                          <div onClick={() => setSelectedDisplay((SavedTypeEnum as any)[type])} className="relative z-20 p-1 cursor-pointer capitalize">
                            {(SavedTypeEnum as any)[type]}
                          </div>

                          {(SavedTypeEnum as any)[type] === selectedDisplay && <motion.div transition={{ type: 'spring', duration: 0.3 }} layoutId="underline" className="bg-gray-200/60 rounded absolute h-full w-full top-0" />}
                        </div>
                      ))}

                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2 overflow-auto scrollbar">
                    {savedFilter.filter((t) => handleFilter(t)).map((filter) => (
                      <div key={filter.name} onClick={() => onSetSavedFilter(filter)} className="flex justify-between items-center hover:bg-gray-200/70 rounded text-sm px-2 py-1 cursor-pointer">
                        <div className="flex gap-3 items-center">
                          {filter.type === SavedFilterTypeEnum.Personal ? (
                            <Layers2 size={15} />
                          ) : <Share2 size={15} />}
                          <p>{filter.name}</p>
                        </div>
                        <div>
                          {selectedSavedFilter && filter.name === selectedSavedFilter.name ? (
                            <div className="px-1">
                              <Check size={15} />
                            </div>
                          )
                            : (
                              <div onClick={(e) => handleMenuPress(e, filter)} data-testid="menu-buttons" className="hover:bg-gray-300 px-1 rounded relative">
                                <MoreHorizontal size={15} />
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

          </AnimatePresence>
          <div ref={optionRef}>

            {contextOpen && (
            <div
              style={{ top: contextOpen.top + 10, left: contextOpen.left }}
              className="fixed bg-white  z-[999999] flex flex-col gap-1 rounded-lg shadow-lg py-2 px-3 text-sm"
            >
              {options.filter((t) => (!t.for) || (t.for && t.for === contextOpen.filter.type))
                .map((option) => (
                  <div onClick={() => { onSavedFilterActions(option.action, contextOpen.filter); setContextOpen(null); }} key={option.name} className={` ${option.newSection ? 'border-t border-black/20 pt-3' : ''} `}>
                    <div className={`flex gap-3 hover:bg-gray-200 py-1 px-2 rounded items-center cursor-pointer `}>
                      {option.icon()}
                      {option.name}
                    </div>
                  </div>
                ))}

            </div>
            )}
          </div>
        </div>
      )}

    </div>

  );
}

export default SaveFilter;
