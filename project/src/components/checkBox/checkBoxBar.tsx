import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeProjectsByIds } from '../../redux/slice/createProjectSlice';
import penIcon from '../../media/svg/penIcon.svg';
import deleteIcon from '../../media/svg/deleteIcon.svg';

interface ICheckBoxBar {
  howManySelected: number;
  selectedRowsIds: number[];
  handleBulkEditFn: () => void;
  unSelectAllCheckBox: () => void;
  deleteAllProjects: () => void;
  ArchiveAllProjects: () => void;
}

function CheckBoxBar(
  {
    selectedRowsIds,
    howManySelected,
    handleBulkEditFn,
    unSelectAllCheckBox,
    deleteAllProjects,
    ArchiveAllProjects,
  }: ICheckBoxBar,
) {
  const dispatch = useDispatch();
  useEffect(() => { }, [howManySelected]);
  return (
    <div className=" flex gap-5 items-center mt-[5px]">
      <div className="text-sm text-gray-900 font-medium">
        {howManySelected}
        &nbsp;Selected
      </div>
      <div className="text-[12px] font-medium flex gap-1">
        <button
          type="button"
          className="hover:shadow-lg tracking-[1.5px] bg-blue-600 text-white h-[32px] rounded cursor-pointer outline-none border-none p-[8px] pl-[5px] flex items-center"
          onClick={handleBulkEditFn}
        >
          <img src={penIcon} alt="icon" />
          &nbsp;Edit
        </button>
        <button
          type="button"
          className="hover:shadow-lg tracking-[1.5px] bg-blue-600 text-white h-[32px] rounded cursor-pointer outline-none border-none p-[8px] pl-[5px] flex items-center"
          onClick={ArchiveAllProjects}
        >
          <img src={penIcon} alt="icon" />
          &nbsp;Archive
        </button>
        <button
          type="button"
          className="hover:shadow-lg tracking-[1.5px] bg-blue-600 text-white h-[32px] rounded cursor-pointer outline-none border-none p-[8px] pl-[5px] flex items-center"
          onClick={deleteAllProjects}
        >
          <img src={deleteIcon} alt="icon" />
          &nbsp;Delete
        </button>

        <button
          type="button"
          className="hover:shadow p-3 tracking-[1.5px] text-blue-500 h-[32px] rounded cursor-pointer outline-none border-none flex items-center"
          onClick={unSelectAllCheckBox}
        >
          clear
        </button>
      </div>
    </div>
  );
}
export default CheckBoxBar;
