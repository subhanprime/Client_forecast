import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import helpers from '../../utils/helpers';
import './schedule.css';
import Scheduler from '../../components/scheduler/Scheduler';
import Navbar from '../../components/nav/Navbar';
import ContextMenu from '../../components/context-menu/ContextMenu';
import {
  useFetchDepartmentQuery, useFetchPeopleQuery, useFetchProjectQuery,
  useFetchRolesQuery, useFetchTagQuery, useFetchTaskQuery,
} from '../../feature/schedulerApi/schedulerApiSlice';
import Loading from '../../components/loading/Loading';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initializeScheduler } from '../../feature/scheduler/schedulerSlice';
import ModalHandler from '../../components/modal/ModalHandler';
// import axios from 'axios';
// import {
//   collection, doc, getDocs, query, setDoc, updateDoc,
// } from 'firebase/firestore';
// import { v4 } from 'uuid';
// import { db } from '../../firebase';
// import { FirebaseCollection } from '../../constants';

function Schedule() {
  const { weeksArray, daysInYear, daysArray } = helpers.getDaysInCurrentYear();

  // const check = useRef(false);

  const {
    data: peopleData = [], isLoading: peopleLoading = true, isError: peopleError,
  } = useFetchPeopleQuery();
  const {
    data: taskData = [], isLoading: taskLoading = true, isError: taskError,
  } = useFetchTaskQuery();
  const {
    data: projectData = [], isLoading: projectLoading = true, isError: projectError,
  } = useFetchProjectQuery();
  const {
    data: roleData = [], isLoading: roleLoading = true, isError: roleError,
  } = useFetchRolesQuery();
  const {
    data: depData = [], isLoading: depLoading = true, isError: depError,
  } = useFetchDepartmentQuery();
  const {
    data: tagData = [], isLoading: tagLoading = true, isError: tagError,
  } = useFetchTagQuery();

  const dispatch = useAppDispatch();

  const { initialized } = useAppSelector((state) => state.sheduler);

  // const fetch = async () => {
  //   const { data } = await axios.get('http://localhost:8080/project');
  //   const temp1:Project[] = data.map((dat:Project) => ({
  //     ...dat,
  //     selectedBudget: 'No Budget',
  //     client: 'Client1',
  //     milestones: [],
  //     isDifferentRate: '',
  //     isTentative: false,
  //     perHourRate: 25,
  //     note: 'test note',
  //     isBillable: true,
  //     metaTasks: [{
  //       uuid: v4(),
  //       name: 'test meta',
  //       isBillable: true,
  //     }],

  //   }));
  //   if (!check.current) {
  //     const promises = temp1.map((task:Project) => {
  //       const temp = {
  //         ...task,
  //         uuid: v4(),
  //       };
  //       const taskRef = doc(collection(db, 'projects'), `${temp.project_id}`);
  //       return setDoc(taskRef, temp);
  //     });

  //     await Promise.all(promises).then(
  // () => console.log('first')).catch((err) => console.log(err));
  //   }
  //   check.current = true;

  // const q = query(collection(db, 'projects'));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((dc:any) => {
  //   updateDoc(dc.ref, {
  //     metaTasks: [{
  //       uuid: v4(),
  //       name: 'test meta',
  //       isBillable: true,
  //     }],
  //   });
  // });
  // };

  useEffect(() => {
    const isDataLoaded = (
      !peopleLoading && !taskLoading && !projectLoading
      && !roleLoading && !depLoading && !tagLoading
    );

    const isNoError = (
      !peopleError && !taskError && !projectError
      && !roleError && !depError && !tagError
    );
    // Will cause error in the future, to be fixed!!!!! Notice for Future me,
    if (isDataLoaded && isNoError) {
      // fetch();
      dispatch(initializeScheduler({
        tasks: taskData,
        people: peopleData,
        projects: projectData,
        roles: roleData,
        department: depData,
        tags: tagData,
      }));
    }
  }, [peopleLoading,
    taskLoading,
    projectLoading,
    roleLoading,
    depLoading,
    tagLoading,
    peopleError,
    taskError,
    projectError,
    roleError,
    depError,
    tagError]);

  if (peopleError || taskError || projectError || roleError || depError || tagError) {
    // Return error message or a component indicating an error
    return <div className="h-screen w-screen text-2xl flex items-center justify-center font-semibold">Error fetching data. Please try again later.</div>;
  }

  if (peopleLoading || taskLoading || projectLoading || roleLoading || depLoading
    || tagLoading || !initialized) {
    // Return loading indicator or skeleton UI
    return (
      <div className="h-screen w-screen bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full">
      <ModalHandler />
      <Navbar />
      <ContextMenu />
      <Scheduler weeksArray={weeksArray} daysArray={daysArray} daysInYear={daysInYear} />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default Schedule;
