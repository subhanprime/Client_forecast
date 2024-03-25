import { ArrowDownWideNarrow } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Dropdown from '../dropdown/Dropdown';
import {
  DateRangeEnum,
  DateRangeHeaderDrop,
  DateRangeVars,
  DropdownData, SideBarProjectSortItems, SideBarSortItems,
  SortOrder, SortType, calenderViewConstants,
} from '../../constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeSortOrder, changeSortType, setSelectedDates } from '../../feature/calender/calenderSlice';
import helpers from '../../utils/helpers';

function SidebarHeader() {
  const {
    viewType, sortOrder, selectedDates, calenderType,
  } = useAppSelector((state) => state.calender);

  const [dropData, setDropData] = useState<DropdownData[]>(DateRangeHeaderDrop);
  const [selected, setSelected] = useState<DateRangeEnum>(DateRangeEnum.Custom);
  const checkRef = useRef({
    this: 0,
    others: 0,
  });

  const dispatch = useAppDispatch();

  const handleSelect = (data:DropdownData) => {
    dispatch(changeSortType(SortType[data.name as keyof typeof SortType]));
  };

  useEffect(() => {
    if (selectedDates) {
      checkRef.current.others += 1;
      if (checkRef.current.this !== checkRef.current.others) {
        if (dropData[0].name !== DateRangeEnum.Custom) {
          setDropData([{
            name: DateRangeEnum.Custom,
            icon: null,
            symbol: null,
          }, ...dropData]);
        }
        setSelected(DateRangeEnum.Custom);
      }
    }
    checkRef.current = {
      this: 0,
      others: 0,
    };
  }, [selectedDates]);

  useEffect(() => {
    if (selected !== DateRangeEnum.Custom) {
      const temp = helpers.getDateRangeWeeks(DateRangeVars[selected]);

      const type = calenderViewConstants[calenderType];
      const start = moment(temp.from as Date).dayOfYear() * type - type;
      const end = moment(temp.to as Date).dayOfYear() * type - type;
      const total = ((end - start) / type) + 1;
      checkRef.current.this += 1;
      dispatch(setSelectedDates({
        start,
        end,
        total,
      }));
    }
  }, [selected]);

  const handleSelectDrop = (data:DropdownData) => {
    setSelected(data.name as DateRangeEnum);
    if (data.name as DateRangeEnum !== DateRangeEnum.Custom) {
      setDropData(DateRangeHeaderDrop);
    }
  };

  return (
    <div className="fixed z-30 w-[250px] bg-white h-[35px] mt-[15px] rounded-t-xl text-xs border-b border-black/20">
      <div className="h-full w-full flex items-center justify-between px-4">
        <div
          className="flex items-center justify-evenly border  border-black rounded cursor-pointer"
        >
          <Dropdown
            defaultName="Name"
            hasChevron={false}
            data={viewType === 'Schedule' ? SideBarSortItems : SideBarProjectSortItems}
            icon={<ArrowDownWideNarrow size={13} color="black" />}
            className="border border-gray-300 rounded-l px-1 py-1 h-6 items-center justify-center hover:bg-gray-300 text-xs flex gap-1 cursor-pointer select-none"
            dropSize="small"
            adjustHeight={false}
            onSelection={handleSelect}
          />
          <button
            onClick={() => dispatch(
              changeSortOrder(sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc),
            )}
            type="button"
            className="border-l border-black h-6 rounded-r  pl-2 pr-2 hover:bg-gray-300"
          >
            {sortOrder === SortOrder.Asc ? 'A-Z' : 'Z-A'}
          </button>
        </div>
        {selectedDates && (
        <div
          className="flex items-center justify-evenly border  border-black rounded cursor-pointer"
        >
          <Dropdown
            defaultName={selected}
            hasChevron={false}
            data={dropData}
            icon={null}
            className="border border-transparent rounded-l px-1 py-1 h-6 items-center justify-center hover:bg-gray-300 text-xs flex gap-1 cursor-pointer select-none"
            dropSize="small"
            adjustHeight={false}
            onSelection={handleSelectDrop}
          />
        </div>
        )}
      </div>
    </div>
  );
}

export default SidebarHeader;
