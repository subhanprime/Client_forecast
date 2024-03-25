/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Archive, Pencil, UserCheck, UserPlus,
} from 'lucide-react';
import PeopleModal from '../components/people/peopleModal';
import Dropdown from '../components/dropdown/Dropdown';
import TableHeader from '../components/table/TableHeader';
import TabeleRow from '../components/table/TableRow';
import { useAppDispatch } from '../app/hooks';
import { updateCount } from '../features/nav/navSlice';
import MemberModal from '../components/addmember/memberModal';
import {
  Project, setDepartments, setPeople, setPeopleManager, setProjects,
} from '../features/data/dataSlice';
import BulkEdit from '../components/bulkActions/bulkEdit/BulkEdit';
import BulkAssignToProject from '../components/bulkActions/bulkAssignProject/BulkAssignToProject';
import BulkArchive from '../components/bulkActions/bulkArchive/BulkArchive';
import { getCollection } from '../firebase/database';
import { FirebaseCollection } from '../enum/Enums';

function People() {
  const [peopleData, setPeopleData] = useState<any[]>([]);
  const [accountAccessData, setAccountAccessData] = useState<any[]>([]);
  const [shownData, setShownData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  const [isBulkAssignToProjectModalOpen, setIsBulkAssignToProjectModalOpen] = useState(false);
  const [isBulkArchiveModalOpen, setIsBulkArchiveModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [sortingOrder, setSortingOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const handleCheckboxChange = (person: any) => {
    if (person.access_type !== 'Account owner') {
      const selectedIndex = selectedRows.findIndex((row) => row.people_id === person.people_id);

      if (selectedIndex === -1) {
        const temp = [...selectedRows, person];

        setSelectedRows(temp);
        if (temp.length === shownData.length) {
          setSelectAll(true);
        }
      } else {
        const newSelectedRows = [...selectedRows];
        newSelectedRows.splice(selectedIndex, 1);
        if (selectAll) {
          setSelectAll(false);
        }
        setSelectedRows(newSelectedRows);
      }
    }
  };

  const handleCheckboxChangeAll = () => {
    if (!selectAll) {
      // const newSelectedRows = peopleData.filter((person)
      //  => person.access_type !== 'Account owner');
      setSelectedRows(shownData);
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peopleResponse, projectsResponse,
          managersResponse, departmentResponse] = await Promise.all([
          getCollection<any>(FirebaseCollection.People),
          getCollection<any>(FirebaseCollection.Project),
          getCollection<any>(FirebaseCollection.Account),
          getCollection<any>(FirebaseCollection.Department),
        ]);
        dispatch(setProjects(projectsResponse.data as Project[]));
        const personData = peopleResponse.data.map((person: any) => {
          person.projects = projectsResponse.data.filter(
            (project: any) => project.people_ids && project.people_ids.includes(person.people_id),
          );
          return person;
        });
        const peopleMap = new Map();
        const manMap = new Map();
        const depMap = new Map();
        personData.forEach((person: any) => {
          peopleMap.set(person.account_id, { ...person });
        });
        departmentResponse.data.forEach((dep: any) => {
          depMap.set(dep.department_id, { ...dep });
        });
        managersResponse.data.forEach((man: any) => {
          manMap.set(man.account_id, { ...man });
        });
        const managers = managersResponse.data.map((man: any) => {
          const person = peopleMap.get(man.account_id);
          return { ...man, ...person };
        });
        const newPeop = personData.map((person: any) => {
          const man = manMap.get(person.account_id);
          const department = depMap.get(person.department_id).name;
          if (man) {
            return { ...man, ...person, department };
          }
          return { ...person, department };
        });
        setPeopleData(newPeop);
        setShownData(newPeop);
        dispatch(setDepartments(departmentResponse.data));
        dispatch(setPeople(peopleResponse.data));
        dispatch(updateCount(newPeop.length));
        setAccountAccessData(managers);
      } catch (error) {
        // Handle errors
      }
    };
    if (shownData.length === 0) {
      fetchData();
    }
  }, []);

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      setEditable(true);
      setSelectedPerson(selectedRows[0]);
      setIsMemberModalOpen(true);
    } else {
      setIsBulkEditModalOpen(true);
    }
  };

  const handleDelete = () => {
    setIsBulkAssignToProjectModalOpen(true);
  };

  const handleArchive = () => {
    setIsBulkArchiveModalOpen(true);
  };
  const handleClear = () => {
    setSelectedRows([]);
    setSelectAll(false);
  };

  const sortByName = () => {
    const sortedData = [...shownData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return sortingOrder === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortingOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setShownData(sortedData);
    setSortingOrder(sortingOrder === 'asc' ? 'desc' : 'asc');
  };
  const onCloseMemberModal = () => {
    setIsMemberModalOpen(false);
    setEditable(false);
    setSelectedPerson(null);
    dispatch(setPeopleManager(false));
  };
  const onCloseBulkEditModal = () => {
    setIsBulkEditModalOpen(false);
  };
  const onCloseBulkAssignToProjectModal = () => {
    setIsBulkAssignToProjectModalOpen(false);
  };
  const onCloseBulkArchiveModal = () => {
    setIsBulkArchiveModalOpen(false);
  };
  // console.log('shownDaata', peopleData);
  return (
    <div data-testid="all-people" className="px-4">
      <PeopleModal
        isModalOpen={isModalOpen}
        selected={selectedPerson}
        closeModal={() => { setIsModalOpen(false); setSelectedPerson(null); }}
      />
      <MemberModal
        isModalOpen={isMemberModalOpen}
        selected={selectedPerson}
        closeModal={onCloseMemberModal}
        isEdit={editable}
      />
      <BulkEdit
        closeModal={onCloseBulkEditModal}
        isModalOpen={isBulkEditModalOpen}
        numberOfUsers={selectedRows.length}
      />
      <BulkAssignToProject
        isModalOpen={isBulkAssignToProjectModalOpen}
        closeModal={onCloseBulkAssignToProjectModal}
      />
      <BulkArchive
        isModalOpen={isBulkArchiveModalOpen}
        closeModal={onCloseBulkArchiveModal}
        selected={selectedRows}
      />

      <div className="flex flex-col gap-6 pt-3">
        {selectedRows.length > 0 ? (
          <td className="flex items-center pl-4 gap-2">
            <div className="font-semibold">
              {selectedRows.length}
              {' '}
              selected
            </div>
            <div className="flex gap-3 text-sm cursor-pointer bg-blue-700 rounded py-2 px-3 font-semibold">
              <div
                className="text-white flex items-center gap-3"
                onClick={() => handleEdit()}
              >
                <Pencil height={16} width={16} />
                Edit
              </div>
            </div>
            <div className="flex gap-3 text-sm cursor-pointer bg-blue-700 rounded py-2 px-3 font-semibold">
              <div
                className="text-white flex items-center gap-3"
                onClick={() => handleDelete()}
              >
                <UserCheck height={16} width={16} />
                Assign to project
              </div>
            </div>
            <div className="flex gap-3 text-sm cursor-pointer bg-blue-700 rounded py-2 px-3 font-semibold">
              <div
                className="text-white flex items-center gap-3"
                onClick={() => handleArchive()}
              >
                <Archive strokeWidth={2.25} height={16} width={16} />
                Archived
              </div>
            </div>
            <div className="flex gap-3 cursor-pointer rounded py-2 px-3 text-md ">
              <div
                className="text-blue-700 flex items-center gap-3 hover:bg-blue-400 rounded-md w-22"
                onClick={() => handleClear()}
              >
                Clear
              </div>
            </div>
          </td>
        ) : (
          <div className="flex items-center pl-4 gap-2">

            <UserPlus data-testid="user-create" className="w-5 h-5 hover:text-blue-500" onClick={() => { setSelectedPerson(shownData[0]); setIsMemberModalOpen(true); }} />
            <Dropdown
              setShownData={setShownData}
              accountAccessData={accountAccessData}
              peopleData={peopleData}
            />
          </div>
        )}

        <div className="relative overflow-x-auto  sm:rounded-[1.5rem] bg-white px-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
            <TableHeader
              onSort={sortByName}
              onIconClick={sortByName}
              sortingOrder={sortingOrder}
              isChecked={selectAll}
              onCheckboxChange={handleCheckboxChangeAll}
            />
            <tbody data-testid="table" className="rounded-xl">
              {shownData.map((person, idx) => (
                <TabeleRow
                  key={`${person.people_id}-${idx}`}
                  person={person}
                  setSelectedPerson={setSelectedPerson}
                  setIsModalOpen={
                    (open:boolean) => { setIsMemberModalOpen(open); setEditable(open); }
                  }
                  isSelected={selectedRows.some((row) => row.people_id === person.people_id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default People;
