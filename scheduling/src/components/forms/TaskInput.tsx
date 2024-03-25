import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SelectedTask { isNew: Boolean, task: MetaTask }

interface TaskInputProps {
  selectedTask: SelectedTask | null;
  setSelectedTasks: React.Dispatch<React.SetStateAction<SelectedTask | null>>;
  selectedProject: Project ;

}

function TaskInput({
  selectedTask, setSelectedTasks, selectedProject,
}:TaskInputProps) {
  const [taskDropOpen, setTaskDropOpen] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTaskDropOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTaskChange = (e:any) => {
    const temp = selectedProject.metaTasks.filter((t) => t.name.toLowerCase() === e.target.value);

    setSelectedTasks({
      isNew: temp.length === 0,
      task: temp.length === 0 ? {
        isBillable: true,
        uuid: '',
        name: e.target.value,
      } : temp[0],
    });
  };
  const clearWritten = (e:any) => {
    if (!selectedTask?.isNew) {
      e.target.select();
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      ref={ref}
      className="flex flex-col gap-1 relative"
      data-testid="task-name-inp"
    >
      <div className="text-[10px]">Task</div>
      <div
        ref={ref}
        onClick={() => setTaskDropOpen(!taskDropOpen)}
        className=" w-full flex justify-between px-2 py-2 text-sm border focus-within:border-indigo-700 active:border-indigo-700 hover:border-indigo-700  border-black/20 rounded items-center"
      >

        <input
          type="text"
          data-testid="task-name-input"
          onClick={clearWritten}
          onChange={handleTaskChange}
          value={selectedTask ? selectedTask.task.name : ''}
          placeholder="Choose a task to allocate"
          className="h-full border-none outline-none w-full"
        />
        {selectedTask && (
        <div onClick={() => setSelectedTasks(null)} className="rounded-lg hover:text-black/60 p-1">
          <X size={15} />
        </div>
        )}
        <div className="rounded-lg hover:text-black/60 p-1">
          <ChevronDown size={15} />

        </div>

      </div>
      {taskDropOpen && (
      <div
        className="rounded  bg-white p-1 z-50 absolute text-sm select-none  shadow-2xl w-full max-h-56 overflow-auto scrollbar top-[60px]"
      >
        {selectedProject.metaTasks && selectedProject.metaTasks
          .filter((obj) => (selectedTask
            ? obj.name.toLowerCase().includes(selectedTask.task.name.toLowerCase()) : true))
          .map((check) => (
            <div
              key={check.name}
              onClick={() => {
                setSelectedTasks({
                  isNew: false,
                  task: check,
                }); setTaskDropOpen(false);
              }}
              className="large w-full py-2 rounded-md px-2 flex gap-2 items-center  hover:bg-gray-200"
            >
              <div className="flex justify-between items-center w-full ">
                {check.name}

              </div>

            </div>
          ))}
        {selectedTask && selectedTask.isNew && selectedTask.task.name !== '' && (
        <div
          onClick={() => setTaskDropOpen(false)}
          className="large w-full py-2 rounded-md px-2 flex gap-2 items-center  hover:bg-gray-200"
        >
          <div className="flex gap-2 items-center w-full ">
            <Plus size={15} />
            Add
            {` "`}
            {selectedTask?.task.name}
            {`"`}

          </div>

        </div>
        )}
      </div>
      )}
    </motion.div>
  );
}

export default TaskInput;
