import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { setIsPeopleSelected } from '../../redux/store/features/metricSlice';

interface ToggleInterface {
  isPeople:boolean,
  setIsPeople: React.Dispatch<React.SetStateAction<boolean>>
}

function Toggle(props:ToggleInterface) {
  const dispatch = useAppDispatch();
  const projectData = useAppSelector((state) => state?.apiSlice.projectData);
  const peopleData = useAppSelector((state) => state?.apiSlice.peopleData);
  const { isPeople, setIsPeople } = props;
  return (
    <div className="flex gap-5 bg-gray-200/60 py-1 rounded-md text-[12px] justify-center px-4">
      <div className={`${isPeople ? 'text-black' : 'text-gray-400 hover:text-black'} relative`}>
        <div className="flex justify-center">
          <div data-testid="people-toggle" onKeyUp={() => {}} onClick={() => { setIsPeople(true); dispatch(setIsPeopleSelected(true)); }} className="relative z-20 p-1 cursor-pointer">
            {peopleData[0] ? peopleData[0].length : 0}
            {' '}
            People
          </div>

          {isPeople && <motion.div transition={{ type: 'spring', duration: 0.3 }} layoutId="underline" className="bg-white rounded-md absolute h-full w-full top-0 px-11" />}
        </div>

      </div>
      <div className={`${!isPeople ? 'text-black' : 'text-gray-400 hover:text-black'} relative`}>
        <div className="flex justify-center">
          <div data-testid="projects-toggle" onKeyUp={() => {}} onClick={() => { setIsPeople(false); dispatch(setIsPeopleSelected(false)); }} className="relative z-20 p-1 cursor-pointer">
            {projectData[0] ? projectData[0].length : 0}
            {' '}
            Projects
          </div>
          {!isPeople && <motion.div transition={{ type: 'spring', duration: 0.3 }} layoutId="underline" className="bg-white rounded-md absolute h-full w-full top-0 px-11" />}
        </div>
      </div>
    </div>
  );
}

export default Toggle;
