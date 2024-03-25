import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _, { isEmpty, update } from 'lodash';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import firestore from '../firebase/index';
import folderIcon from '../media/svg/folder.svg';
import { addProjects, removeProjectsByIds, archiveProjects } from '../redux/slice/createProjectSlice';
import { addClients } from '../redux/slice/clientSlice';
import { RootState, store } from '../redux/store';
import Modal from './projectModel';
import scheduleIcon from '../media/svg/line.svg';
import reportIcon from '../media/svg/reportsIcon.svg';
import plusIcon from '../media/svg/plusIconBlck.svg';
import CheckBoxBar from './checkBox/checkBoxBar';
import BulkEditHandler from './bulkEditHandler/bulkEditHandler';
// import { } from '../redux/slice/createProjectSlice';
import {
  Milestone,
  UserDetails,
  Task,
  ProjectObject,
  IFilterDropdownObj,
} from './constant/bulkActions';
import Spinner from './spinner';
import FilterDropDown from './bulkEditHandler/filterDropDown';
import HeaderCp from './navbar';

function TableProject() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const list = useSelector((state: RootState) => state.projects.projects);
  const [projectList, setProjectList] = useState<ProjectObject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleRecord, setSingleRecords] = useState<ProjectObject>();
  const [selectedRowsIds, setSelectedRowsIds] = useState<number[]>([]);
  const [selectedUuidIds, setSelectedUuidIds] = useState<ProjectObject[]>([]);
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterDropdownObj, setFilterDropdownObj] = useState<IFilterDropdownObj>({
    archived: false,
    active: true,
    myProjects: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkboxesRef = useRef<HTMLInputElement[]>([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (list.length > 0) {
      setProjectList(list);
    }
  }, [list]);

  function handleRowClick(rowData: ProjectObject): void {
    setSingleRecords(rowData);
    openModal();
  }

  function sortByModifiedDate(a: ProjectObject, b: ProjectObject) {
    const dateA = a.modified ? new Date(a.modified).getTime() : 0;
    const dateB = b.modified ? new Date(b.modified).getTime() : 0;
    return dateA - dateB;
  }

  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function handlePlusLink(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ): void {
    event.stopPropagation();
  }
  function handleScheduleLink(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    id: number,
  ): void {
    event.stopPropagation();
    navigate(`/scheduling?projectId=${id}`);
  }

  function handleReportLink(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    id: number,
  ): void {
    event.stopPropagation();
    navigate(`/reports?projectId=${id}`);
  }
  function handleHeaderClick(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ): void {
    console.log(e);
  }

  const handleCheckboxClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    id: number,
    row: ProjectObject,
  ) => {
    e.stopPropagation();
    const isChecked = e.currentTarget.checked;
    if (isChecked) {
      setSelectedRowsIds((prevIds) => {
        if (!prevIds.includes(id)) return [...prevIds, id];
        return prevIds;
      });
      setSelectedUuidIds((prev) => {
        if (!prev.some((item) => item.project_id === row.project_id)) {
          return [...prev, row];
        }
        return prev;
      });
    } else {
      setSelectedRowsIds((prevIds) => prevIds.filter((el) => el !== (id)));
      setSelectedUuidIds((prev) => prev.filter((item) => item.project_id !== row.project_id));
    }

    const allRowCheckboxesChecked = checkboxesRef.current.every((checkbox) => checkbox.checked);

    // // Update the header checkbox based on row checkboxes' status
    const headerCheckbox = document.getElementById('headingCheckBox') as HTMLInputElement;
    headerCheckbox.checked = allRowCheckboxesChecked;
  };

  const unSelectAllCheckBox = () => {
    checkboxesRef.current.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedRowsIds([]);
    setSelectedUuidIds([]);
    const headerCheckbox = document.getElementById('headingCheckBox') as HTMLInputElement;
    headerCheckbox.checked = false;
    // headerCheckbox.click();
  };

  const selectAllCheckboxes = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const isChecked = e.currentTarget.checked;
    checkboxesRef.current.forEach((checkbox) => {
      const id = checkbox?.dataset?.id;
      if (isChecked && !checkbox.checked) {
        checkbox.click();
        const headerCheckbox = document.getElementById('headingCheckBox') as HTMLInputElement;
        headerCheckbox.checked = true;
      }
      if (isChecked === false && checkbox.checked) {
        checkbox.click();
        const headerCheckbox = document.getElementById('headingCheckBox') as HTMLInputElement;
        headerCheckbox.checked = false;
      }
    });
  };

  useEffect(() => {
    // console.log('selectedRowsIds', selectedRowsIds);
  }, [selectedRowsIds.length, selectedRowsIds]);

  const handleBulkEditFn = () => {
    if (selectedRowsIds.length > 1) {
      setIsBulkEditOpen(true);
      return;
    }
    const selectedId = selectedRowsIds[0];
    const selectedItem = projectList.find((item) => item.project_id === selectedId);
    if (selectedItem) {
      handleRowClick(selectedItem);
    }
  };

  const onBulkEditClose = () => { setIsBulkEditOpen(false); };
  const deleteAllProjects = () => {
    const deleteRecordFirebase = async (records: ProjectObject[]) => {
      const batch = writeBatch(firestore);
      records.forEach((record) => {
        if (record.project_id) {
          const projectRef = doc(firestore, 'projects', `${record.project_id}`);
          batch.delete(projectRef);
        }
      });
      try {
        await batch.commit();
        console.log('Multiple records successfully deleted!');
      } catch (error) {
        console.error('Error removing multiple records: ', error);
      }
    };
    deleteRecordFirebase(selectedUuidIds);

    dispatch(removeProjectsByIds({ ids: selectedRowsIds }));
    setSelectedRowsIds([]);
    setSelectedUuidIds([]);
    setProjectList([]);
    setSelectedRows([]);
    const headerCheckbox = document.getElementById('headingCheckBox') as HTMLInputElement;
    headerCheckbox.checked = false;
  };

  const ArchiveAllProjects = async () => {
    dispatch(archiveProjects(selectedRowsIds));
    const batch = writeBatch(firestore);
    try {
      selectedUuidIds.forEach(async (project) => {
        if (project.project_id) {
          const projectRef = doc(firestore, 'projects', project.project_id.toString());
          batch.set(projectRef, { ...project, archived: true, active: false });
        }
      });
      await batch.commit();
    } catch (error) {
      console.error('Error updating documents in batch:', error);
    }

    setSelectedRowsIds([]);
    setSelectedUuidIds([]);
  };

  const callFirebase = async () => {
    setLoading(true);
    const collectionRef = collection(firestore, 'projects');
    const clientRef = collection(firestore, 'client');
    const clientShot = await getDocs(clientRef);
    const snapshot = await getDocs(collectionRef);
    const projects: any = [];
    const client: any = [];
    snapshot.forEach((docs) => {
      projects.push(docs.data());
    });
    clientShot.forEach((docs) => {
      // console.log(docs.data());
      client.push(docs.data());
    });
    // setLoading(false);
    // console.log('response=>', projects);
    dispatch(addProjects(projects));
    dispatch(addClients(client));
  };
  function shouldIncludeProject(el: ProjectObject) {
    return (
      (filterDropdownObj.active && el.active)
      || (filterDropdownObj.archived && el.archived)
    );
  }

  useEffect(() => {
    callFirebase();
  }, []);

  return (

    <div data-testid="project-table-mock">
      <HeaderCp filterDropdownObj={filterDropdownObj} />
      <div className="tablecls overflow-scroll fixed table-height rounded-3xl mx-2 py-3 pb-5 bg-white">
        <div className="px-4 p-2">
          <div className="flex gap-2 items-center">
            <FilterDropDown
              filterDropdownObj={filterDropdownObj}
              setFilterDropdownObj={setFilterDropdownObj}
              // unSelectAllCheckBox={unSelectAllCheckBox}
            />
          </div>
          {!isEmpty(selectedRowsIds) && (
            <CheckBoxBar
              howManySelected={selectedRowsIds.length}
              selectedRowsIds={selectedRowsIds}
              handleBulkEditFn={handleBulkEditFn}
              unSelectAllCheckBox={unSelectAllCheckBox}
              deleteAllProjects={deleteAllProjects}
              ArchiveAllProjects={ArchiveAllProjects}
            />
          )}
        </div>
        <div className="tablecls overflow-scroll fixed table-height px-4 pt-2 bg-white">
          <table className="min-w-full divide-none">
            <colgroup>
              <col className="mx-2 max-w-[30px]" />
              <col className="mx-2 max-w-[15%]" />
              <col className="ps-2 max-w-[15%]" />
              <col className="ps-2 width-[10px] max-w-[15%]" />
              <col className="ps-2 max-w-[15%]" />
              <col className="ps-2 max-w-[15%]" />
              <col className="ps-2 max-w-[15%]" />
            </colgroup>
            <thead className="bg-white border-b-2">
              <tr className="text-black">
                <th className="px-3 py-3 text-left">
                  {projectList.length ? <input type="checkbox" id="headingCheckBox" className="table-body-input" onClick={(e) => selectAllCheckboxes(e)} /> : ''}
                </th>
                <th className="px-6 py-3 text-left">Project</th>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left" />
                <th className="px-6 py-3 text-left">Budget</th>
                <th className="px-6 py-3 text-left">Start</th>
                <th className="px-6 py-3 text-left">End</th>
                <th className="px-6 py-3 text-left">Owner</th>
              </tr>
            </thead>
            <div className="h-1" />
            <tbody className="mt-2">
              {projectList.slice().sort(sortByModifiedDate)
                .filter((el) => shouldIncludeProject(el))
                .map((row, index) => {
                  const randomClr = `#${row?.color}`;
                  // console.log('Milestone To:', row?.milestones[0]?.to);
                  return (
                    <>

                      <tr
                        key={row.project_id}
                        className="hover:cursor-pointer table-record-row rounded-lg even:bg-white even:dark:bg-gray-900 odd:bg-gray-100 odd:dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() => handleRowClick(row)}
                      >
                        <td
                          className="px-3 "
                          style={{
                            borderLeftColor: randomClr,
                            borderLeftWidth: '4px',
                            borderLeftStyle: 'solid',
                          }}
                        >
                          <div className="custom-checkbox header-input-908d">
                            <input
                              data-id={row.project_id}
                              type="checkbox"
                              ref={(el) => {
                                if (el) {
                                  checkboxesRef.current[index] = el;
                                }
                              }}
                              onClick={(e) => handleCheckboxClick(e, row.project_id, row)}
                            />

                          </div>
                        </td>
                        <td className="p-2 truncate min-w-[300px] max-w-[320px] flex justify-between items-center">
                          <div className="row-projectName truncate">{row.name}</div>
                          <div className="linkIcon-wrapper gap-x-2 p-[1px] rounded">
                            <span
                              onClick={
                                (
                                  e: React.MouseEvent<HTMLImageElement, MouseEvent>,
                                ) => handlePlusLink(e)
                              }
                            >
                              <img src={plusIcon} alt="icon" className="cursor-pointer hover:bg-indigo-400 rounded hover:text-white p-[2px]" />
                            </span>

                            <span
                              onClick={
                                (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                                  handleScheduleLink(e, row.project_id);
                                }
                              }
                            >
                              <img src={scheduleIcon} alt="icon" className="cursor-pointer hover:bg-indigo-400 rounded hover:text-white p-[2px]" />
                            </span>

                            <span
                              onClick={
                                (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                                  handleReportLink(e, row.project_id);
                                }
                              }
                            >
                              <img src={reportIcon} alt="icon" className="cursor-pointer hover:bg-indigo-400 rounded hover:text-white p-[2px]" />
                            </span>
                          </div>
                        </td>

                        <td className="p-2 truncate max-w-[250px]">
                          {row.client}
                        </td>
                        <td className="p-2 truncate max-w-[250px]">
                          <div className="tag-list-34d overflow-x-scroll flex gap-2 max-w-[250px] items-center">
                            {
                              row?.tags.map((el) => <div className="bg-slate-200 block p-1 rounded">{el}</div>)
                            }
                          </div>
                        </td>
                        <td className="p-2 truncate max-w-[250px]">{row.selectedBudget}</td>
                        <td className="p-2 truncate max-w-[250px]">
                          {row?.milestones[0]?.from ? (
                            row?.milestones[0]?.from instanceof Timestamp ? (
                              row?.milestones[0]?.from?.toDate()?.toLocaleDateString()
                            ) : (
                              `${row?.milestones[0]?.from ? new Date(row.milestones[0].from).toLocaleDateString() : ''}`
                            )
                          ) : (
                            ''
                          )}
                        </td>
                        <td className="p-2 truncate max-w-[250px]">
                          {row?.milestones[0]?.to ? (
                            row?.milestones[0]?.to instanceof Timestamp ? (
                              row?.milestones[0]?.to?.toDate()?.toLocaleDateString()
                            ) : (
                              `${row?.milestones[0]?.to ? new Date(row.milestones[0].to).toLocaleDateString() : ''}`
                            )
                          ) : (
                            ''
                          )}
                        </td>
                        <td className="p-2 flex justify-start items-center max-w-[150px]"><div style={{ backgroundColor: randomClr }} className="truncate ms-5 w-7 h-7 rounded-full flex justify-center items-center text-white font-medium text-md">{row?.name.charAt(0).toUpperCase()}</div></td>
                      </tr>
                      <div className="h-1" />

                    </>
                  );
                })}
            </tbody>

          </table>
          {!isEmpty(projectList) && <div className="h-[80px]" />}
          {
            isEmpty(projectList) && (
              <div className="h-full w-full bg-gray-50 rounded-xl flex justify-center items-center">
                {loading ? <Spinner width="w-16" height="h-16" border="border-4" /> : <span className="text-2xl text-gray-400">There Is No Project</span>}
              </div>
            )
          }
          <Modal
            isModelOpen={isModalOpen}
            onClose={closeModal}
            isForUpdate
            singleRecord={singleRecord}
          />
          <BulkEditHandler
            onBulkEditClose={onBulkEditClose}
            isBulkEditOpen={isBulkEditOpen}
            selectedRowsIds={selectedRowsIds}
            selectedUuidIds={selectedUuidIds}
          />
        </div>
      </div>
    </div>

  );
}

// export { unSelectAllCheckBox };

export default TableProject;
