import React, {
  SetStateAction, useEffect, useState,
} from 'react';

import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  OnChangeFn,
  Table,
  Render,
  ColumnDef,
} from '@tanstack/react-table';
import { useDispatch } from 'react-redux';
import tableConfiguration from '../../../constants/peopleTableConfigration';
import ProjectTableConfiguration from '../../../constants/projectTableConfigration';
import { getProjectDataManually } from '../../../services/projectTableService';
import { ProjectData } from './projectInterface';
import { getPeopleDataManually } from '../../../services/peopleTableService';
import PeopleTableInterface from './propleInterface';
import TimeOffTableConfiguration from '../../../constants/timeOffTableConfigration';
// import { getTimeOffDataMockoon } from '../../../services/timeoffService';
import DepartmentTableConfiguration from '../../../constants/departmentTableConfigration';
import { getDepartmentDataManually } from '../../../services/departmentTableService';
import DepartmentInterface from '../../../interface/departmentInterface';
import { getRolesDataManually } from '../../../services/rolesService';
import RolesTableConfiguration from '../../../constants/rolesTableConfigration';
import TaskTableConfiguration from '../../../constants/taskTableConfigration';
import { getTaskDataManually } from '../../../services/taskTableService';
import { useAppSelector } from '../../../redux/store/store';
import { getPeopleFilterDataFake } from '../../../services/peopleService';
import { addPeopleFilterData, addTaskData } from '../../../redux/store/features/apiSlice';
import Roles from '../../../interface/rolesInterface';
import { ProjectInterface } from '../projectTable/interface';
import { TaskTableData } from './taskTableInterface';
import { getTaskBasedOnPeopleId } from '../../../helper/tableComponent';
import ClientTableConfiguration from '../../../constants/clientTableConfigration';
import { getClientDataManually } from '../../../services/clientTableService';
import { setIsProjectSelected } from '../../../redux/store/features/metricSlice';
import Task from '../../../interface/taskInterface';
import People from '../../../interface/peopleListInterface';
import TeamTableConfiguration from '../../../constants/teamTableConfigration';
import {
  addDepartmentTableDataList, addPeopleTableDataList, addProjectTableDataList, addRolesTableDataList, addTaskTableDataList,
} from '../../../redux/store/features/tableDataSlics';
import Project from '../../../interface/projectInterface';
import { SelectedProject } from '../../../interface/selectedProjectInterface';

const table: Table<{
  Renderer: Render;
  Rendered: React.ReactNode | JSX.Element;
}> = createTable();

function TableComponent(props:any) {
  const [tableData, setTableData] = useState<ProjectData[] | PeopleTableInterface[] | DepartmentInterface[]
  | Roles[] | ProjectInterface[] | Task[] | TaskTableData[]>([]);
  const [selectedPeopleData, setSelectedPeopleData] = useState<ProjectData>();
  const [selectedRolesData, setSelectedRolesData] = useState<Roles>();
  const [selectedDepartmentData, setSelectedDepartmentData] = useState<DepartmentInterface>();
  const [selectedProjectData, setSelectedProjectData] = useState<ProjectInterface>();
  const [peopleTableData, setPeopleTableData] = useState<PeopleTableInterface[]>([]);
  const [teamTableData, setTeamTableData] = useState([]);
  // const [selectedFilter, setSelectedFilter] = useState({ type: '' });
  let defaultColumns:
  ColumnDef<{ Renderer: Render; Rendered: JSX.Element | React.ReactNode; }>[] = [];
  const [columns, setColumns] = useState([...defaultColumns]);
  const { type, activeTab } = props;
  const persons = useAppSelector((state) => state?.person.peopleTableData);
  const peopleData = useAppSelector((state) => state?.apiSlice.peopleData);
  const peopleFilterData = useAppSelector((state) => state?.apiSlice.peopleFilterData);
  const projectData = useAppSelector((state) => state?.apiSlice.projectData);
  const { isPeopleSelected } = useAppSelector((state) => state.metrics);
  const { isProjectSelected } = useAppSelector((state) => state.metrics);

  // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  const peopleTableDataList = useAppSelector((state) => state?.tableSlice.peopleTableDataList);
  const projectTableDataList = useAppSelector((state) => state?.tableSlice.projectTableDataList);
  const rolesTableDataList = useAppSelector((state) => state?.tableSlice.rolesTableDataList);
  const departmentTableDataList = useAppSelector((state) => state?.tableSlice.departmentTableDataList);
  const taskTableDataList = useAppSelector((state) => state?.tableSlice.taskTableDataList);
  const selectedFilterType = useAppSelector((state) => state?.tableSlice.filterSelectedType);

  // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  const departmentData = useAppSelector((state) => state?.apiSlice.departmentData);
  const rolesData = useAppSelector((state) => state?.apiSlice.rolesData);
  const taskData = useAppSelector((state) => state?.apiSlice.taskData);
  const clientData = useAppSelector((state) => state?.apiSlice.clientData);
  const isTeamSelected = false;
  const dispatch = useDispatch();

  const getSelectedPeopleData = async () => {
    if (selectedPeopleData) {
      if (selectedPeopleData.projects) {
        defaultColumns = ProjectTableConfiguration(table, setSelectedProjectData);
        setColumns([...defaultColumns]);
        const peopleFilter = await getPeopleFilterDataFake();
        dispatch(addPeopleFilterData(peopleFilter));
        let taskOfPeople: { billable: number; scheduled: number; nonbillable: number; billableperct: number; name: string; }[];
        // if (Object.keys(peopleFilterData['legacy.capacity']).length > 0 && peopleData.length !== 0 && taskData.length !== 0) {
        //   taskOfPeople = await getTaskBasedOnPeopleId(selectedPeopleData.people_id, taskData[0], peopleFilterData, peopleData[0]);
        // }
        // // const taskOfPeople = await getTaskBasedOnPeopleId(selectedPeopleData.people_id);
        // selectedPeopleData.projects.forEach((projectList: any) => {
        //   const updatedProjList = { ...projectList, projects: [] };
        //   updatedProjList.projects = taskOfPeople;
        //   projectList.projects = taskOfPeople;
        // });
        // setTableData(selectedPeopleData.projects);
      } else { /* empty */ }
    } else { /* empty */ }
  };
  const getSelectedRolesData = async () => {
    if (selectedRolesData) {
      setTableData([selectedRolesData]);
      const peopleFilter = await getPeopleFilterDataFake();
      dispatch(addPeopleFilterData(peopleFilter));
      // const data = await getPeopleDataMockoon();
      // const filteredPeopleData = data.filter((e) => e.role_id === selectedRolesData.id);
      // setPeopleTableData(filteredPeopleData);
    } else { /* empty */ }
  };
  const getSelectedDepartmentData = async () => {
    if (selectedDepartmentData) {
      setTableData([selectedDepartmentData]);
      const peopleFilter = await getPeopleFilterDataFake();
      dispatch(addPeopleFilterData(peopleFilter));
    } else { /* empty */ }
  };
  const getTeamTableData = async (teamData?:any) => {
    try {
      if (teamData !== undefined) {
        setTableData(teamData);
      }
    } catch (error) { /* empty */ }
  };
  const getSelectedProjectData = async () => {
    if (selectedProjectData) {
      setTableData([selectedProjectData]);
      const peopleFilter = await getPeopleFilterDataFake();
      dispatch(addPeopleFilterData(peopleFilter));
    }
    if (selectedProjectData && isPeopleSelected === false) {
      dispatch(setIsProjectSelected(true));
      defaultColumns = TaskTableConfiguration(table, isPeopleSelected, isProjectSelected);
      setColumns([...defaultColumns]);
      // const data = await getTaskDataMockoon();
      // const filteredTasks:Task[] = [];
      // const teamData: any = [];
      // data.forEach((tasks:Task, index:number) => {
      //   tasks.people.forEach((people:any) => {
      //     if (selectedProjectData.project_id === people.project_id) {
      //       filteredTasks.push(people);
      //     }
      //   });
      //   data[index].people = filteredTasks;
      // });
      // data.forEach((everyTask:Task, index:number) => {
      //   let totalScheduledHours = 0;
      //   everyTask.people.forEach((people:People) => {
      //     totalScheduledHours += people.scheduled;
      //   });
      //   data[index].scheduled = totalScheduledHours;
      // });
      // // FOR TEAM TABLE DATA PREPERATION
      // data.forEach((team:Task) => {
      //   team.people.forEach((indivisualPeople:People) => {
      //     const updatedPeopleObj:any = { ...indivisualPeople, scheduled: indivisualPeople.hours.scheduled, projects: [] };
      //     const taskObj: { name: string; scheduled: number } = { name: team.name, scheduled: indivisualPeople.hours.scheduled };
      //     updatedPeopleObj.projects.push(taskObj);
      //     teamData.push(updatedPeopleObj);
      //   });
      // });
      // setTableData(data);
      // isTeamSelected = true;
      // setTeamTableData(teamData);
    }
  };
  const getProjectData = async () => {
    // FROM MOCKOON
    // try {
    //   const data = await getProjectDataMockoon();
    //   dispatch(addProjectTableDataList(data));
    //   if (projectTableDataList.length > 0) {
    //     setTableData(projectTableDataList);
    //     // if (selectedFilterType.type === 'people') {
    //     //   setTableData(selectedFilterType.selectedEntry.projects);
    //     // } else {
    //     //   setTableData(projectTableDataList);
    //     // }
    //   }
    //   // setTableData(data);
    // } catch (error) { /* empty */ }
    // FROM Manually
    try {
      if (Object.keys(peopleFilterData['legacy.capacity']).length > 0 && peopleData.length !== 0 && departmentData.length !== 0 && taskData[0].length !== 0 && projectData.length !== 0) {
        const data = await getProjectDataManually(taskData[0], peopleData[0], projectData[0], peopleFilterData);
        dispatch(addProjectTableDataList(data));
        if (projectTableDataList.length > 0) {
          setTableData(projectTableDataList);
        }
      }
    } catch (error) { /* empty */ }
  };
  const getPeopleTableData = async () => {
    // FROM MOCKOON
    // try {
    //   const data = await getPeopleDataMockoon();
    //   dispatch(addPeopleTableDataList(data));
    //   if (peopleTableDataList.length > 0) {
    //     setTableData(peopleTableDataList);
    //     // if (selectedFilterType.type === 'roles') {
    //     //   const filterPeopleBasedOnRole:any = [];
    //     //   peopleTableDataList.forEach((people:People) => {
    //     //     if (selectedFilterType.selectedEntry.id === people.role_id) {
    //     //       filterPeopleBasedOnRole.push(people);
    //     //     }
    //     //   });
    //     //   setTableData(filterPeopleBasedOnRole);
    //     // } else {
    //     //   setTableData(peopleTableDataList);
    //     // }
    //   }

    //   // setTableData(data);
    // } catch (error) { /* empty */ }
    // FROM MANUALLY
    try {
      if (Object.keys(peopleFilterData['legacy.capacity']).length > 0 && peopleData.length !== 0 && departmentData.length !== 0 && taskData[0].length !== 0 && projectData.length !== 0) {
        const data = await getPeopleDataManually(taskData[0], peopleData[0], projectData[0], peopleFilterData, departmentData[0]);
        dispatch(addPeopleTableDataList(data));
        if (peopleTableDataList.length > 0) {
          setTableData(peopleTableDataList);
        }
      }
    } catch (error) { /* empty */ }
  };
  // const getTimeOffTableData = async () => {
  //   // try {
  //   //   const data = await getTimeOffDataManually(peopleData, peopleFilterData);
  //   //   setTableData(data);
  //   //   console.log('TimeOff', data);
  //   // } catch (error) { /* empty */ }
  //   try {
  //     const data = await getTimeOffDataMockoon();
  //     setTableData(data);
  //   } catch (error) { /* empty */ }
  // };
  const getDepartmentTableData = async () => {
    try {
      if (Object.keys(peopleFilterData['legacy.capacity']).length > 0 && peopleData.length !== 0 && departmentData.length !== 0 && taskData[0].length !== 0) {
        const data = await getDepartmentDataManually(peopleData[0], peopleFilterData, departmentData[0], taskData[0]);
        dispatch(addDepartmentTableDataList(data));
        if (departmentTableDataList.length > 0) {
          setTableData(departmentTableDataList);
        }
      }
    } catch (error) { /* empty */ }
    // try {
    //   const data = await getDepartmentDataMockoon();
    //   dispatch(addDepartmentTableDataList(data));
    //   // if (departmentTableDataList.length > 0) {
    //   //   if (selectedFilterType.type === 'roles') {
    //   //     if (Object.keys(peopleFilterData['legacy.capacity']).length > 0 && peopleData.length !== 0 && departmentData.length !== 0 && taskData[0].length !== 0) {
    //   //       const dataManually = await getDepartmentDataManually(selectedFilterType.selectedEntry.people, peopleFilterData, departmentTableDataList, taskData[0]);
    //   //       setTableData(dataManually);
    //   //     }
    //   //     // departmentTableDataList.forEach((department:DepartmentInterface) => {
    //   //     //   const filterDepartmentBasedOnRole:any = [];
    //   //     //   department.people.forEach((people:People) => {
    //   //     //     if (selectedFilterType.selectedEntry.id === people.role_id) {
    //   //     //       filterDepartmentBasedOnRole.push(people);
    //   //     //     }
    //   //     //     // console.log('DEPARTMENT', filterDepartmentBasedOnRole);
    //   //     //   });
    //   //     //   // setTableData(filterDepartmentBasedOnRole);
    //   //     //   console.log('DEPT', department.people);
    //   //     // });
    //   //   } else {
    //   //     setTableData(departmentTableDataList);
    //   //   }
    //   // }
    //   if (departmentTableDataList.length > 0) {
    //     setTableData(departmentTableDataList);
    //   }
    //   // setTableData(data);
    // } catch (error) { /* empty */ }
  };
  const getRolesTableData = async () => {
    try {
      if (Object.keys(peopleFilterData['legacy.capacity']).length > 0 && peopleData.length !== 0 && rolesData.length !== 0 && taskData[0].length !== 0) {
        const data = await getRolesDataManually(peopleData[0], peopleFilterData, rolesData[0], taskData[0]);
        dispatch(addRolesTableDataList(data));
        if (rolesTableDataList.length > 0) {
          setTableData(rolesTableDataList);
        }
        // setTableData(data);
      }
    } catch (error) { /* empty */ }
    // try {
    //   const data = await getRolesDataMockoon();
    //   dispatch(addRolesTableDataList(data));
    //   if (rolesTableDataList.length > 0) {
    //     setTableData(rolesTableDataList);
    //   }
    //   // setTableData(data);
    // } catch (error) { /* empty */ }
  };
  const getTaskTableData = async () => {
    try {
      if (Object.keys(peopleFilterData['legacy.capacity']).length > 0 && peopleData.length !== 0 && taskData.length !== 0) {
        const data = await getTaskDataManually(taskData[0], peopleFilterData, peopleData[0]);
        dispatch(addTaskTableDataList(data));
        if (taskTableDataList.length > 0) {
          setTableData(taskTableDataList);
        }
      }
    } catch (error) { /* empty */ }
    // try {
    //   const data = await getTaskDataMockoon();
    //   dispatch(addTaskTableDataList(data));
    //   // if (taskTableDataList.length > 0) {
    //   //   if (selectedFilterType.type === 'people') {
    //   //     setTableData(selectedFilterType.selectedEntry.projects);
    //   //   } if (selectedFilterType.type === 'roles') {
    //   //     const filterTask = await getTaskDataManually(taskData[0], peopleFilterData, selectedFilterType.selectedEntry.people);
    //   //     // taskTableDataList.forEach((tasks:any) => {
    //   //     //   tasks.people.forEach((e:People) => {
    //   //     //     selectedFilterType.selectedEntry.people.forEach((people:People) => {
    //   //     //       if (people.people_id === e.person_id) {
    //   //     //         console.log('first', people);
    //   //     //       }
    //   //     //     });
    //   //     //   });
    //   //     // });
    //   //   }
    //   //   else {
    //   //     setTableData(taskTableDataList);
    //   //   }
    //   // }
    //   if (taskTableDataList.length > 0) {
    //     setTableData(taskTableDataList);
    //   }
    //   // setTableData(data);
    // } catch (error) { /* empty */ }
  };
  const getClientTableData = async () => {
    try {
      if (Object.keys(peopleFilterData['legacy.capacity']).length > 0 && projectData.length !== 0) {
        const data = await getClientDataManually(peopleFilterData, projectData[0]);
        setTableData(data);
      }
    } catch (error) { /* empty */ }
  };

  const setAllTablesData = () => {
    if (type === 'people') {
      defaultColumns = tableConfiguration(table, setSelectedPeopleData, dispatch);
      setColumns([...defaultColumns]);
      if (selectedPeopleData === undefined) getPeopleTableData(); else getSelectedPeopleData();
    }
    // if (type === 'timeoff') {
    //   defaultColumns = TimeOffTableConfiguration(table);
    //   setColumns([...defaultColumns]);
    //   getTimeOffTableData();
    // }
    if (type === 'project') {
      defaultColumns = ProjectTableConfiguration(table, setSelectedProjectData);
      setColumns([...defaultColumns]);
      if (selectedProjectData === undefined) getProjectData(); else getSelectedProjectData();
    }
    if (type === 'department') {
      defaultColumns = DepartmentTableConfiguration(table, setSelectedDepartmentData);
      setColumns([...defaultColumns]);
      if (selectedDepartmentData === undefined) getDepartmentTableData(); else getSelectedDepartmentData();
    }
    if (type === 'roles') {
      defaultColumns = RolesTableConfiguration(table, setSelectedRolesData, dispatch);
      setColumns([...defaultColumns]);
      if (selectedRolesData === undefined) getRolesTableData(); else getSelectedRolesData();
    }
    if (type === 'task') {
      defaultColumns = TaskTableConfiguration(table, isPeopleSelected, isProjectSelected);
      setColumns([...defaultColumns]);
      getTaskTableData();
    }
    if (type === 'clients') {
      defaultColumns = ClientTableConfiguration(table);
      setColumns([...defaultColumns]);
      getClientTableData();
    }
    if (type === 'team') {
      defaultColumns = TeamTableConfiguration(table);
      setColumns([...defaultColumns]);
      // console.log('TAEDCA', teamTableData);
      // getTeamTableData();
      // getTeamTableData(teamTableData);
    }
  };
  useEffect(() => {
    setAllTablesData();
  }, [persons, peopleData, projectData, rolesData, taskData, selectedPeopleData, selectedRolesData, selectedDepartmentData, selectedProjectData, isPeopleSelected, selectedFilterType]);

  // useEffect(() => {
  //   console.log('TYPE', type);
  //   if (type === 'team') {
  //     defaultColumns = TeamTableConfiguration(table);
  //     setColumns([...defaultColumns]);
  //     console.log('sdasdasdasdasd', teamTableData);
  //     getTeamTableData(teamTableData);
  //   }
  // }, [teamTableData]);

  const getSubRows = (row: { people: any; projects: any; }) => {
    if (type === 'people') {
      return row.projects;
    }
    if (type === 'project') {
      return selectedFilterType.type === 'people' ? row.projects : row.people;
    }
    if (type === 'timeoff') {
      return row.people;
    }
    if (type === 'department') {
      return row.people;
    }
    if (type === 'roles') {
      return row.people;
    }
    if (type === 'task') {
      return selectedFilterType.type === 'people' ? row.projects : row.people;
    }
    if (type === 'clients') {
      return row.projects;
    }
    if (type === 'team') {
      return row.projects;
    }
    return '';
  };

  const [expanded, setExpanded] = useState({});
  const [sorting, setSorting] = useState([]);
  const setSortingHandler: OnChangeFn<SortingState> = (newSorting) => {
    setSorting(newSorting as SetStateAction<never[]>);
  };
  const instance = useTableInstance(table, {
    data: tableData,
    columns,
    state: {
      expanded,
      sorting,
    },
    getSubRows: (rows: any) => getSubRows(rows),
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSortingHandler,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div data-testid="table" className="">
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F7F7F7] justify-start border-y-2 text text-gray-500 text-[14px]">
            {instance.getHeaderGroups().map((headerGroup) => (
              <tr className="h-[30px]" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="font-normal" key={header.id}>
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {instance.getRowModel().rows.map((row) => (
              <tr className="w-full border-2 h-[35px] text-[16px] font-[400]" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {cell.renderCell()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default TableComponent;
