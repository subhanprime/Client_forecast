import React, { useEffect, useState } from 'react';
import { Layers2, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FilterSelectedDisplay from '../filter/FilterSelectedDisplay';
import {
  SavedFilterType,
  SavedFilterTypeEnum, addSavedFilterState,
  setSavedFilterState, setSelectedFilterState, updateSavedFilterState,
} from '../../feature/filter/filterSlice';

interface SaveModalProps {
  visibility:boolean;
  closeModal: ()=>void;
  filter?:SavedFilterType
}

function SaveFilterModal({ visibility, closeModal, filter = undefined }:SaveModalProps) {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isPersonal, setIsPersonal] = useState(true);
  const [values, setValues] = useState({
    name: '',
  });

  const {
    selectedFilter, savedFilter,
    selectedSavedFilter,
  } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const onChange = (e:any) => {
    if (error) {
      setError(false);
      setErrorText('');
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setError(false);
    setErrorText('');
    setIsPersonal(filter ? filter.type === 'personal' : true);
    setValues({
      name: filter ? filter.name : '',
    });
  }, [visibility, filter]);

  const handleSubmit = () => {
    if (values.name === '') {
      setErrorText('You must enter a name before saving');
      setError(true);
      return;
    }
    const temp = savedFilter.filter((t) => t.name === values.name);
    if (!filter && temp.length > 0) {
      setErrorText('A View with this name already exists');
      setError(true);
      return;
    }
    let filters = selectedFilter;
    if (selectedSavedFilter) {
      filters = [...selectedSavedFilter.filter, ...selectedFilter];
    }
    if (!filter) {
      dispatch(addSavedFilterState({
        filter: filters,
        name: values.name,
        type: isPersonal ? SavedFilterTypeEnum.Personal : SavedFilterTypeEnum.Shared,
      }));
      dispatch(setSelectedFilterState([]));
      dispatch(setSavedFilterState({
        filter: filters,
        name: values.name,
        type: isPersonal ? SavedFilterTypeEnum.Personal : SavedFilterTypeEnum.Shared,
      }));
    } else {
      dispatch(updateSavedFilterState(
        {
          name: filter.name,
          filter: {
            filter: filter.filter,
            name: values.name,
            type: isPersonal ? SavedFilterTypeEnum.Personal : SavedFilterTypeEnum.Shared,
          },
        },
      ));
    }
    closeModal();
  };

  return (
    <Modal visibility={visibility} closeModal={closeModal} place="top" width="large">
      <div className="flex flex-col gap-8 px-5 py-7">
        <div className="flex gap-5 items-center w-full">
          {isPersonal ? <Layers2 size={25} /> : <Share2 size={25} />}
          <div className="w-full text-xs">

            <input
              type="text"
              name="name"
              value={values.name}
              onChange={onChange}
              placeholder="Enter the name of View"
              className="w-full bg-white  outline-none text-2xl "
            />
            {error && errorText !== '' && (
              <p className="text-red-500">
                {errorText}
              </p>
            )}
          </div>
        </div>

        <div className="px-2 flex gap-5 items-center w-full">
          <p className="text-xs self-start">Filter</p>
          <div className="flex flex-wrap gap-2">
            {!filter ? ([...(selectedSavedFilter ? selectedSavedFilter.filter : []),
              ...selectedFilter].map((fil, index) => (
                <FilterSelectedDisplay
                  key={`${fil.filter.name}-${index}`}
                  filter={fil}
                  index={index}
                  handleOpen={() => {}}
                  updateSelectedFilter={() => {}}
                  deleteSelectedFilter={() => {}}
                  isViewOnly
                />
            ))) : (
              filter.filter.map((fil, index) => (
                <FilterSelectedDisplay
                  key={`${fil.filter.name}-${index}`}
                  filter={fil}
                  index={index}
                  handleOpen={() => {}}
                  updateSelectedFilter={() => {}}
                  deleteSelectedFilter={() => {}}
                  isViewOnly
                />
              ))
            )}
          </div>
        </div>

        <div className="text-xs px-2 flex gap-5 items-center w-full">
          <p>Type</p>
          <div className="flex gap-2 bg-gray-200/60 px-2 py-1 rounded-md ">
            <div className={`${isPersonal ? 'text-black' : 'text-gray-400 hover:text-black'} relative`}>
              <div onClick={() => setIsPersonal(true)} className="relative z-20 p-1 cursor-pointer">
                Personal
              </div>

              {isPersonal && <motion.div transition={{ type: 'spring', duration: 0.3 }} layoutId="underline" className="bg-white rounded absolute h-full w-full top-0" />}
            </div>
            <div className={`${!isPersonal ? 'text-black' : 'text-gray-400 hover:text-black'} relative`}>
              <div onClick={() => setIsPersonal(false)} className="relative z-20 p-1 cursor-pointer">
                Shared
              </div>
              {!isPersonal && <motion.div transition={{ type: 'spring', duration: 0.3 }} layoutId="underline" className="bg-white rounded absolute h-full w-full top-0" />}

            </div>
          </div>
        </div>

        <div className=" px-2 flex gap-3">
          <button
            onClick={handleSubmit}
            type="button"
            className={` hover:bg-indigo-800 bg-indigo-500 text-white  text-sm rounded  p-2 cursor-pointer`}
          >
            Save View
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="hover:bg-indigo-200  text-indigo-600  text-sm rounded  p-2 cursor-pointer"
          >
            Cancel

          </button>
        </div>
      </div>

    </Modal>
  );
}

export default SaveFilterModal;
