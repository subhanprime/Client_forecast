import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {
  doc,
  setDoc,
} from 'firebase/firestore';
import firestore from '../firebase/index';
import ProjectInfoTab from './projectInfoTab';
import ProjectTeamTab from './projectTeamTab';
import ProjectMileStoneTab from './projectMileStoneTab';
import ProjectTasktab from './projectTasktab';
import { addProject, updateProject } from '../redux/slice/createProjectSlice';
import {
  ProjectObject,
  Task,
  ModalProps,
  UserDetails,
  Milestone,
} from './constant/bulkActions';
import Spinner from './spinner';

type Tab = 'info' | 'team' | 'milestone' | 'task';

const initialUserList = [
  { name: 'Emily', price: 0 },
  { name: 'Oliver', price: 0 },
  { name: 'Sophia', price: 0 },
];

function Modal({
  isModelOpen,
  onClose,
  isForUpdate,
  singleRecord,
}: ModalProps) {
  const [name, setName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDifferentRate, setIsDifferentRate] = useState<string>('false');
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const [isBillable, setIsBillable] = useState<boolean>(true);
  const [isTentative, setIsTentative] = useState<boolean>(false);
  const [selectedBudget, setSelectedBudget] = useState<string>('No budget');
  const [perHourRate, setPerHourRate] = useState<number>(0);
  const [totalProjectHour, setTotalProjectHour] = useState<number>(0);
  const [isTeamOpen, setIsTeamOpen] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<UserDetails[] | null>(null);
  const [filterTeamText, setFilterTeamText] = useState<string>('');
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isModelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModelOpen, onClose]);

  const randomNumber = () => Math.floor(100000 + Math.random() * 900000);
  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleCreateProject = () => {
    setLoading(true);
    const newUUID = uuidv4();
    if (name.trim() === '') {
      console.error('Project Name cannot be empty');
      return;
    }
    setLoading(true);
    const color = getRandomColor();

    const projectObject = {
      project_id: (isForUpdate && singleRecord?.project_id)
        ? singleRecord.project_id
        : randomNumber(),
      name,
      isDifferentRate,
      note,
      tags,
      isBillable,
      isTentative,
      selectedBudget,
      perHourRate,
      selectedUsers: selectedUsers || null,
      metaTasks: tasks,
      milestones,
      client: inputValue,
      totalProjectHour,
      color,
      archived: false,
    };

    const updateProjectFirebase = async (projectId: any) => {
      let projectRef: any = null;

      if (isForUpdate) {
        projectRef = doc(firestore, 'projects', `${projectId}`);
      } else {
        projectRef = doc(firestore, 'projects', newUUID);
      }
      try {
        if (isForUpdate) {
          await setDoc(projectRef, { ...singleRecord, ...projectObject });
          setLoading(false);
        } else {
          await setDoc(
            projectRef,
            { ...projectObject, uuid: newUUID, project_id: newUUID },
          );
          setLoading(false);
        }
        // setLoading(false);
        onClose();
      } catch (error) {
        setLoading(false);
        onClose();
      }
    };

    updateProjectFirebase(singleRecord?.project_id);

    setName('');
    setIsDifferentRate('false');
    setNote('');
    setTags([]);
    setIsBillable(true);
    setIsTentative(false);
    setSelectedBudget('');
    setPerHourRate(0);
    setInputValue('');
    setSelectedUsers([]);
    setTasks([]);
    setMilestones([]);
    setIsTeamOpen(false);
    setTotalProjectHour(0);

    if (isForUpdate) dispatch(updateProject({ ...singleRecord, ...projectObject }));
    else dispatch(addProject(projectObject));
    setActiveTab('info' as Tab);
  };

  const tabContent = {
    info: <ProjectInfoTab
      isDifferentRate={isDifferentRate}
      setIsDifferentRate={setIsDifferentRate}
      inputValue={inputValue}
      setInputValue={setInputValue}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      note={note}
      setNote={setNote}
      tags={tags}
      setTags={setTags}
      tagInputValue={tagInputValue}
      setTagInputValue={setTagInputValue}
      isBillable={isBillable}
      setIsBillable={setIsBillable}
      isTentative={isTentative}
      setIsTentative={setIsTentative}
      selectedBudget={selectedBudget}
      setSelectedBudget={setSelectedBudget}
      perHourRate={perHourRate}
      setPerHourRate={setPerHourRate}
      totalProjectHour={totalProjectHour}
      setTotalProjectHour={setTotalProjectHour}

    />,
    team: <ProjectTeamTab
      isDifferentRate={isDifferentRate}
      setIsDifferentRate={setIsDifferentRate}
      isTeamOpen={isTeamOpen}
      setIsTeamOpen={setIsTeamOpen}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
      initialUserList={initialUserList}
      filterTeamText={filterTeamText}
      setFilterTeamText={setFilterTeamText}
    />,
    milestone: <ProjectMileStoneTab
      milestones={milestones}
      setMilestones={setMilestones}
    />,
    task: <ProjectTasktab
      task={task}
      setTask={setTask}
      tasks={tasks}
      setTasks={setTasks}
    />,
  };

  const updateValueOfProject = () => {
    setActiveTab('info' as Tab);
    if (singleRecord?.name) {
      setName(singleRecord?.name);
      setIsDifferentRate(singleRecord?.isDifferentRate);
      setNote(singleRecord?.note);
      setTags(singleRecord?.tags);
      setIsBillable(singleRecord?.isBillable);
      setIsTentative(singleRecord?.isTentative);
      setSelectedBudget(singleRecord?.selectedBudget);
      setPerHourRate(singleRecord?.perHourRate);
      setSelectedUsers(singleRecord?.selectedUsers);
      setTasks(singleRecord?.metaTasks);
      setMilestones(singleRecord?.milestones);
      setInputValue(singleRecord?.client);
      if (singleRecord?.totalProjectHour) setTotalProjectHour(singleRecord?.totalProjectHour);
    }
  };

  useEffect(() => {
    // console.log('singleRecord', singleRecord);
    if (isForUpdate) updateValueOfProject();
  }, [singleRecord]);

  if (!isModelOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 shadow-2xl">
      <div ref={modalRef} className="bg-white p-4 rounded-md w-[550px] min-h-[610px] flex flex-col justify-between">
        <div>
          <div className="px-3">
            <input
              type="text"
              placeholder="Project Name"
              className="w-full border-none outline-none text-xl font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex">
            {['info', 'team', `milestone`, 'task'].map((tab) => (
              <button
                type="button"
                key={tab}
                className={`px-3 py-2 text-gray-600 text-lg capitalize font-medium ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600' : ''}`}
                onClick={() => setActiveTab(tab as Tab)}
              >
                {tab}
                {tab === 'milestone' ? ` ${milestones.length}` : ''}
                {tab === 'task' ? ` ${tasks.length}` : ''}
              </button>
            ))}
          </div>
          <div className="mt-4">{tabContent[activeTab]}</div>
        </div>
        {/* there are handling both create and update Project */}
        <div className="flex space-x-4 mt-5">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded flex gap-2 items-center"
            onClick={handleCreateProject}
          >
            {loading && <Spinner width="w-4" height="h-4" />}
            {isForUpdate ? 'Update Project' : 'Create Project'}
          </button>
          <button type="button" className="bg-slate-100 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
