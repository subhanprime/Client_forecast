import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskIcon from '../media/svg/crossIcon.svg';
import { Task } from './constant/bulkActions';

interface AddTaskProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function ProjectTasktab(
  {
    task,
    setTask,
    tasks,
    setTasks,
  }: AddTaskProps,
) {
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const existingTask = tasks.find((t) => t.name.toLowerCase() === task.toLowerCase());
      if (existingTask) {
        alert('Task with the same name already exists!');
        return;
      }

      const newTask: Task = {
        name: task,
        onlyMangersEdit: false,
        uuid: uuidv4(),
        isBillable: true,
      };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="p-2 h-[460px] overflow-scroll">
      <h2 className="text-lg font-semibold mb-4">Add Task</h2>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <input
          type="text"
          placeholder="Enter task"
          className="border rounded px-3 py-2 w-full focus:outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <label className="flex items-center mt-2" htmlFor="projectManagerCheckbox">
          <input type="checkbox" className="mr-2" id="projectManagerCheckbox" />
          <span className="text-sm">Only edit project managers</span>
        </label>

        <button
          type="button"
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mt-4"
        >
          Add
        </button>
      </div>
      <div>
        {tasks.map((item, index) => (
          <div key={index} className={`p-2 mb-2 flex justify-between items-center border-b ${index === 0 ? 'border-t' : ''}`}>
            <p>{item.name}</p>
            <button
              type="button"
              onClick={() => handleDeleteTask(index)}
              className="text-red-500 hover:text-red-600 focus:outline-none"
            >
              <img src={TaskIcon} alt="cross" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectTasktab;
