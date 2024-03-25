import React, { useEffect, useState } from 'react';
// import { CSVLink, CSVDownload } from 'react-csv';
import UnderlineTabs from '../../components/tabs';
import DropDown from '../../components/dropdown';
import PeopleDropDownFilter from '../../components/dropdown/peopleDropDown';
import AllocationsDropDownFilter from '../../components/dropdown/allocationsDropDown';
import TimeoffDropDownFilter from '../../components/dropdown/timeoffDropDown';
import ScheduledMetric from '../../components/scheduleMetric';
import PastAndFutureMetric from '../../components/pastAndFutureMetric';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import {
  getClientData,
  getDepartmentData, getPeopleData, getProjectData, getRolesData, getTaskData,
} from '../../services/peopleService';
import {
  addPeopleData, addDepartmentData, addRolesData, addTaskData, addProjectData, addClientData,
} from '../../redux/store/features/apiSlice';
import Chart from '../../components/charts';
import DateSelect from '../../components/dateSelect';
import { preparePeopleCSV } from '../../helper/peopleCSVPreperation';
import ExportButton from '../../components/exportButton';
import Toggle from '../../components/toggleButton';
import LoggedScheduledMetric from '../../components/loggedScheduledMetric';
import { setIsPeopleSelected } from '../../redux/store/features/metricSlice';

function ReportsScreen() {
  const { isPeopleSelected } = useAppSelector((state) => state.metrics);
  const [scheduledSelected, setScheduledSelected] = useState('Scheduled');
  const [daysSelected, setDaysSelected] = useState('Days');
  const [exportOptions, setExportOptions] = useState('Days');
  const [peopleCSV, setpeopleCSV] = useState([]);
  const [isPeople, setIsPeople] = useState(true);
  const dispatch = useAppDispatch();

  const setPeopleDataInRedux = async () => {
    const peopleData = await getPeopleData();
    dispatch(addPeopleData(peopleData));
  };
  const setProjectDataInRedux = async () => {
    const projectData = await getProjectData();
    dispatch(addProjectData(projectData));
  };

  const setDepartmentDataInRedux = async () => {
    const departmentData = await getDepartmentData();
    dispatch(addDepartmentData(departmentData));
  };
  const setTaskDataInRedux = async () => {
    const taskData = await getTaskData();
    dispatch(addTaskData(taskData));
  };
  const setRolesDataInRedux = async () => {
    const rolesData = await getRolesData();
    dispatch(addRolesData(rolesData));
  };
  // const setClientDataInRedux = async () => {
  //   const clientData = await getClientData();
  //   dispatch(addClientData(clientData));
  // };

  useEffect(() => {
    setPeopleDataInRedux();
    setProjectDataInRedux();
    setDepartmentDataInRedux();
    setRolesDataInRedux();
    setTaskDataInRedux();
    // setClientDataInRedux();
  }, [isPeopleSelected]);

  const showMetric = () => {
    if (scheduledSelected === 'Scheduled' && isPeopleSelected === true) {
      return <ScheduledMetric />;
    }
    if (scheduledSelected === 'Scheduled' && isPeopleSelected === false) {
      return <LoggedScheduledMetric />;
    }
    return <PastAndFutureMetric />;
  };
  return (
    <div className="flex flex-col bg-[#F3F2F5] h-screen">
      {/* Fixed Header */}
      <div className="flex justify-between py-3 bg-[#F3F2F5] text-[24px] font-medium ml-20 items-center">
        <div className="flex gap-5">
          <div>Report</div>
          <Toggle setIsPeople={setIsPeople} isPeople={isPeople} />
        </div>

        <ExportButton
          dropdownList={['Export chart data', 'Export table data', 'Export time tracking data']}
          defaultSelected={exportOptions}
          setSelectedState={setExportOptions}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col flex-1 bg-[#FFFFFF] rounded-tl-lg ml-16 py-6 overflow-hidden">
        <div className="flex flex-col rounded-tl-lg h-full">
          <div className="flex justify-between gap-2 left-0 right-0 px-32 bg-white">
            <DateSelect />
            <div className="flex justify-between gap-2 left-0 right-0 bg-white">
              <DropDown width="w-64" dropdownList={['Logged vs Scheduled', 'Past logged + Future scheduled', 'Logged', 'Scheduled']} defaultSelected={scheduledSelected} setSelectedState={setScheduledSelected} />
              <DropDown width="w-24" data-testid="dropdown-days" dropdownList={['Days', 'Weeks', 'Month']} defaultSelected={daysSelected} setSelectedState={setDaysSelected} />
            </div>

          </div>
          <div className="overflow-y-auto px-28 flex-1">
            <div className="flex mt-4 ">
              <PeopleDropDownFilter />
              <AllocationsDropDownFilter />
              <TimeoffDropDownFilter />
            </div>

            {/* <div className="h-[250px] bg-slate-400 my-9" /> */}
            <div className="h-[380px] py-10">
              <Chart selectedType={daysSelected} />
            </div>

            {showMetric()}

            <div className="pt-4">
              <UnderlineTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsScreen;
