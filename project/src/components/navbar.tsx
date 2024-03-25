import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { addProject } from '../redux/slice/createProjectSlice';
import { RootState } from '../redux/store';
import savedIcon from '../media/svg/saveditem.svg';
import filterIcon from '../media/svg/filterIcon.svg';
import plusIcon from '../media/svg/plusIcon.svg';
import Modal from './projectModel';
import { HeaderCpProps } from './constant/bulkActions';

function HeaderCp({ filterDropdownObj }: HeaderCpProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  const projectList = useSelector((state: RootState) => state.projects.projects);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const uniqueProjects = new Set();

    projectList.forEach((el) => {
      if ((filterDropdownObj.active && el.active)
        || (filterDropdownObj.archived && el.archived)) {
        uniqueProjects.add(el.project_id);
      }
    });

    setNumber(uniqueProjects.size);
  }, [filterDropdownObj, projectList]);

  useEffect(() => { }, [number]);

  return (
    <div className="bg-gray-100 w-full min-h-[60px] flex justify-between items-center px-5">
      <div className="flex gap-x-2">
        <span className="navbar-title">
          {number}
          &nbsp;Project
        </span>
        <div className="borderCLR flex justify-center items-center saved-btn">
          <img src={savedIcon} alt="saved item" className="cursor-pointer" />
        </div>
        <button className="filter-button p-2 gap-[4px]" type="button">
          <img src={filterIcon} alt="filter item" className="cursor-pointer" />
          <span>Filter</span>
        </button>
      </div>
      <div>
        <div
          className="bg-blue-600 p-[2px] rounded cursor-pointer"
          onClick={openModal}
          onKeyDown={() => { }}
          role="button"
          tabIndex={0}
        >
          <img src={plusIcon} alt="plus icon" />
        </div>
      </div>
      <Modal data-testid="modal" isModelOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default HeaderCp;
