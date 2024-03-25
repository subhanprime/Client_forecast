import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { DateRange } from 'react-day-picker';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 } from 'uuid';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DropdownData, TaskStatus } from '../../constants';
import Dropdown from '../dropdown/Dropdown';
import { TaskData } from '../../feature/modal/modalSlice';
import DateRangePicker from '../datapicker/DateRangePicker';
import TaskInput from './TaskInput';
import helpers from '../../utils/helpers';
import { addTask, updateProject } from '../../firebase';
import { addTaskState, updateTaskState } from '../../feature/scheduler/schedulerSlice';

interface AllocProps {
  closeModal?:(skipCon?:boolean)=>void
  task?:TaskSlot;
  taskData?:TaskData;
}

interface SelectedTask { isNew: Boolean, task: MetaTask }

const getDateFromDay = (day:number) => moment().dayOfYear(day).toDate();

function ColorComponent({ color }:{ color:string | number }) {
  return (
    <div style={{ backgroundColor: `#${color}` }} className="h-6 w-6 rounded-full" />
  );
}

function ErrorMessage({ error }:{ error:string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="text-xs text-red-600 flex flex-row gap-1"
    >
      *
      <p>
        {error}
      </p>
    </motion.div>
  );
}

function AllocationForm({ closeModal, task = undefined, taskData }:AllocProps) {
  const {
    projects, people, tasks, peopleTasks,
  } = useAppSelector((state) => state.sheduler);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState<FormValues>({
    hours: '',
    totalHours: '',
    notes: '',
    project: null,
    people: [],
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>(task ? {
    from: moment(task.startDate).toDate(),
    to: moment(task.endDate).toDate(),
  } : taskData ? {
    from: getDateFromDay(taskData.start + 1),
    to: getDateFromDay(taskData.end),
  } : {
    from: moment().toDate(),
    to: moment().toDate(),
  });

  const [taskOpen, setTaskOpen] = useState(false);
  const [selectedTask, setSelectedTasks] = useState < null | SelectedTask >(null);
  const [selectedProject, setSelectedProject] = useState<null | Project>(null);

  const [projectsData, setProjectsData] = useState<DropdownData[]>([]);
  const [personsData, setPersonsData] = useState<DropdownData[]>([]);
  const [preSelectedProject, setPreSelectedProject] = useState<DropdownData | null>(null);
  const [preSelectedPeople, setPreSelectedPeople] = useState<DropdownData[]>([]);
  const [editableTask, setEditableTask] = useState<Task | null>(null);
  const [buttonCheck, setButtonCheck] = useState<TaskStatus>(TaskStatus.None);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (task && tasks) {
      const temp = tasks[task.id];
      if (temp) {
        setEditableTask(temp);
        setValues({
          hours: `${temp.hours}`,
          notes: temp.notes,
          totalHours: `${task.w * temp.hours}`,
          project: temp.project_id,
          people: temp.people_id ? [temp.people_id as number] : temp.people_ids as number[],
        });
        return () => {};
      }
    }
    if (taskData) {
      setEditableTask(null);
      setValues({
        hours: `8`,
        totalHours: `${(taskData.end - taskData.start) * 8}`,
        notes: '',
        project: taskData.projectId || null,
        people: [taskData.peopleId],
      });
    }
    setEditableTask(null);
    return () => {};
  }, [task, tasks, taskData]);

  useEffect(() => {
    if (projects) {
      let proDrop = _.map([...projects], (project) => ({
        id: project[1].project_id,
        name: project[1].name,
        icon: () => <ColorComponent color={project[1].color} />,
        symbol: null,
      }));

      if (editableTask || taskData) {
        const proId = editableTask?.project_id || taskData?.projectId;
        if (proId) {
          const sel = projects.get(proId);
          setSelectedProject(sel || null);
          if (editableTask) {
            const meta = (sel as Project).metaTasks.filter(
              (t) => t.uuid === editableTask.task_meta_id,
            );
            setButtonCheck(editableTask?.status as TaskStatus);
            setSelectedTasks(meta.length > 0 ? { isNew: false, task: meta[0] } : null);
            setTaskOpen(meta.length > 0);
          }
          const preSelProject = _.find(proDrop, { id: proId });
          if (preSelProject) {
            setPreSelectedProject(preSelProject);
            proDrop = _.without(proDrop, preSelProject);
          }
        }
      }
      setProjectsData(proDrop);
    }
  }, [projects, editableTask, taskData]);
  useEffect(() => {
    if (people) {
      const perDrop = _.map([...people], (pep) => ({
        id: pep[1].people_id,
        name: pep[1].name,
        icon: null,
        symbol: null,
      }));

      if (editableTask || taskData) {
        const pepId = editableTask?.people_id || taskData?.peopleId;
        const pepIds = editableTask?.people_ids || [taskData?.peopleId];
        if (pepId || pepIds) {
          const tempPeople = _.remove(perDrop, (per) => {
            const isSelected = pepId === per.id
            || _.includes(pepIds, per.id);
            if (isSelected) {
              return true;
            }
            return false;
          });

          setPreSelectedPeople(tempPeople);
        }
      }
      setPersonsData(perDrop);
    }
  }, [people, editableTask, taskData]);

  useEffect(() => {
    if (values.project === null || projects === null) {
      return;
    }
    if (selectedProject !== null && selectedProject.project_id === values.project) {
      return;
    }
    const proj = projects.get(values.project);
    setSelectedProject(proj || null);
  }, [values, projects]);

  const handleButtonSelect = (button:TaskStatus) => {
    if (buttonCheck === button) {
      setButtonCheck(TaskStatus.None);
    } else {
      setButtonCheck(button);
    }
  };
  const onChange = (e:any) => {
    if (e.target.name === 'hours') {
      let hours = +e.target.value;
      hours = hours > 24 ? 24 : hours;

      let daysdiff = 1;
      if (dateRange) {
        daysdiff = dateRange?.to ? moment(dateRange.to).diff(dateRange.from, 'days') + 1 : 1;
      }
      setValues({
        ...values,
        [e.target.name]: `${hours}`,
        totalHours: `${daysdiff * hours}`,
      });
      return;
    }
    if (e.target.name === 'totalHours') {
      const thours = +e.target.value;
      const hours = +values.hours;
      const days = Math.ceil(thours / hours);
      setDateRange({
        from: dateRange?.from || moment().toDate(),
        to: moment(dateRange?.from || moment().toDate()).add(days, 'days').toDate(),
      });
    }

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const rangeUpdate = (range:DateRange | undefined) => {
    setDateRange(range);
  };
  const projectUpdate = (data:DropdownData) => {
    setValues({
      ...values,
      project: data.id ? +data.id : null,
    });
    setTaskOpen(false);
    setSelectedTasks(null);
  };
  const peopleUpdate = (data:DropdownData[]) => {
    setValues({
      ...values,
      people: _.compact(data.map((dat) => (dat.id ? +dat.id : null))),
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setSubmitting(true);
    const err = helpers.getAllocErrors(values, dateRange);
    if (!err.date && dateRange) {
      const start = moment(dateRange.from).day();
      let end:null | number = null;
      if (dateRange.to) {
        end = moment(dateRange.to).day();
      }
      if (start === 0 || start === 6 || end === 0 || end === 6) {
        err.date = 'Date cannot start or end on weekends';
      }
    }
    if (!err.people) {
      const names = helpers.checkForDuplicationTimings(
        values.people,
        dateRange as DateRange,
        peopleTasks as PeopleTasks[],
        editableTask ? editableTask.task_id : undefined,
      );
      if (names.length > 0) {
        err.people = `${names.join(', ')} already ${names.length > 1 ? 'have' : 'has'} tasks at these dates`;
      }
    }
    const keys = Object.keys(err);

    setErrors(err);
    if (keys.length > 0) {
      setSubmitting(false);
      return;
    }
    const dateString = new Date().toISOString();
    const tempTask = selectedTask;
    const ids = _.difference(values.people, (selectedProject as Project).people_ids);
    const updateMetas = [];

    if (tempTask && tempTask.isNew && selectedProject) {
      const id = v4();
      tempTask.task = {
        ...tempTask.task,
        uuid: id,
      };
      updateMetas.push(tempTask.task);
    }

    if (ids.length > 0 || updateMetas.length > 0) {
      try {
        await updateProject(
          values.project as number,
          [...(selectedProject as Project).metaTasks, ...updateMetas],
          [...(selectedProject as Project).people_ids, ...ids],
        );
      } catch (error) {
        toast.error('Error adding new task');
        setSubmitting(false);
        return;
      }
    }

    const newtask:Task = {
      name: tempTask ? tempTask.task.name : '',
      notes: values.notes,
      task_id: editableTask ? editableTask.task_id : v4(),
      project_id: values.project as number,
      billable: tempTask ? tempTask.task.isBillable : true,
      people_id: values.people.length === 1 ? values.people[0] : null,
      people_ids: values.people.length > 1 ? values.people : null,
      created: dateString,
      modified: dateString,
      created_by: 810890,
      modified_by: 0,
      task_meta_id: tempTask ? tempTask.task.uuid : null,
      has_child: 0,
      priority: 0,
      priority_info: null,
      integration_status: 0,
      hours: +values.hours,
      phase_id: 0,
      start_date: moment((dateRange as DateRange).from).format('YYYY-MM-DD'),
      end_date: moment((dateRange as DateRange).to || (dateRange as DateRange).from).format('YYYY-MM-DD'),
      repeat_state: 0,
      status: buttonCheck,
    };

    try {
      // worls for both add or edit
      await addTask(
        newtask,
      );
      if (editableTask) {
        dispatch(updateTaskState(newtask));
      } else {
        dispatch(addTaskState(newtask));
      }
      toast.success(`Task ${editableTask ? 'Updated' : 'Added'}!`);
      if (closeModal) { closeModal(true); }
    } catch (error) {
      toast.error('Error adding new task');
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className=" h-full w-full">
      <div className="text-base flex bg-gray-200/70 rounded-lg w-full pt-2 pb-4 ">
        <div className="flex-[0.4] w-full py-1 px-4 flex gap-2">
          <div className="flex  gap-4 h-full">

            <div className="flex flex-col w-full gap-2 text-[10px] justify-between py-1">
              <div>Hours/day</div>
              <input
                name="hours"
                data-testid="hours"
                value={values.hours}
                onChange={onChange}
                type="number"
                min={0}
                max={24}
                className="w-full bg-transparent outline-none border-b text-lg border-black/40 focus:border-indigo-400"
              />

            </div>
            <div className="flex flex-col w-full gap-2 text-[10px] justify-between py-1">
              <div>Total Hours</div>
              <input
                name="totalHours"
                data-testid="totalHours"
                value={values.totalHours}
                onChange={onChange}
                type="number"
                className="w-full bg-transparent outline-none text-lg border-b border-black/40 focus:border-indigo-400"
              />

            </div>

          </div>

        </div>
        <div className="flex-[0.6] w-full py-1 px-4 flex flex-col gap-2">
          <div className="flex-[0.80] flex flex-col w-full gap-2 text-[10px] justify-between py-1">
            <div>
              Duration:
              {' '}
              {dateRange?.to ? moment(dateRange.to).diff(dateRange.from, 'days') + 1 : 1}
              {' '}
              days
            </div>
            <div className="flex justify-between pr-4 text-base w-full">
              <DateRangePicker
                DateRangeDrop={[]}
                showDateRange={false}
                defaultDateRange={dateRange}
                onRangeUpdate={rangeUpdate}
              />
            </div>
          </div>

        </div>

      </div>
      {(errors.hours || errors.date) && (
      <div className="mt-2 px-2">

        {errors.hours && <ErrorMessage error={errors.hours} />}
        {errors.date && <ErrorMessage error={errors.date} />}
      </div>
      )}
      <div className="flex flex-col px-2 gap-4 w-full mt-5">

        <div className="flex flex-col gap-1">
          <div className="text-[10px]">Projects</div>

          <Dropdown
            data={projectsData}
            defaultName="Select Project"
            dropSize="large"
            className="w-full flex justify-between px-2 py-2 text-sm border hover:border-indigo-700  border-black/20 rounded items-center"
            hasChevron
            icon={null}
            isSelect
            onSelection={projectUpdate}
            hoverContainer=""
            preSelected={preSelectedProject || undefined}
          />
          <div className="w-full flex justify-between text-[11px] tracking-wide">
            <div className="flex items-center">
              {!taskOpen && (
              <button
                type="button"
                data-testid="task-open"
                onClick={() => setTaskOpen(!!values.project)}
                className="p-1 text-indigo-800 hover:bg-indigo-200 rounded active:scale-95"
              >
                Task
              </button>
              )}
            </div>
            <div className="flex items-center ">
              <button type="button" className="p-1 text-indigo-800 hover:bg-indigo-200 rounded">Edit Project</button>
            </div>
          </div>
          {errors.project && <ErrorMessage error={errors.project} />}
        </div>
        <AnimatePresence>
          {taskOpen && selectedProject && (
          <TaskInput
            selectedTask={selectedTask}
            setSelectedTasks={setSelectedTasks}
            selectedProject={selectedProject}
          />
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          <div
            onClick={() => handleButtonSelect(TaskStatus.Completed)}
            className={`capitalize ${buttonCheck === TaskStatus.Completed ? 'bg-indigo-200/70 text-indigo-700' : 'hover:bg-gray-100  text-black/60  bg-gray-100/90 hover:text-black'} text-sm rounded  p-2 cursor-pointer`}
          >
            {TaskStatus.Completed}

          </div>
          <div
            onClick={() => handleButtonSelect(TaskStatus.Tentative)}
            className={` text-sm capitalize rounded  p-2 cursor-pointer ${buttonCheck === TaskStatus.Tentative ? 'bg-indigo-200/70 text-indigo-700' : 'hover:bg-gray-100  text-black/60  bg-gray-100/90 hover:text-black'} `}
          >
            {TaskStatus.Tentative}

          </div>
        </div>

        <div className="flex flex-col w-full gap-2 text-[10px] justify-between py-1">
          <div>Notes</div>
          <textarea
            value={values.notes}
            onChange={onChange}
            className="border border-black/30 rounded outline-none p-3 text-sm focus:border-indigo-700 hover:border-indigo-700"
            name="notes"
            placeholder="Add details specific to this allocation"
            id="notes"
            rows={3}
            maxLength={300}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[10px]">Assign to</div>

          <Dropdown
            data={personsData}
            defaultName="Assign"
            dropSize="large"
            className="w-full flex justify-between px-2 py-2 text-sm border hover:border-indigo-700  border-black/20 rounded items-center"
            hasChevron
            icon={null}
            isSelect
            multiSelect
            onMultiSelection={peopleUpdate}
            onMultiCancel={peopleUpdate}
            hoverContainer=""
            preSelected={preSelectedPeople.length > 0 ? preSelectedPeople : undefined}
          />
          {errors.people && <ErrorMessage error={errors.people} />}

        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            data-testid="submit-button"
            disabled={submitting}
            className={` hover:bg-indigo-700 bg-indigo-600 text-white flex gap-2 items-center justify-center text-sm rounded  p-2 cursor-pointer`}
          >
            <div>

              {!task ? 'Create' : 'Edit'}
              {' '}
              Allocation
            </div>
            {submitting && <div className="custom-loader" />}

          </button>
          <button
            type="button"
            onClick={() => { if (closeModal) { closeModal(); } }}
            className="hover:bg-gray-300  bg-gray-200/70 text-black text-sm rounded  p-2 cursor-pointer"
          >
            Cancel

          </button>
        </div>
      </div>

    </form>
  );
}

export default AllocationForm;
