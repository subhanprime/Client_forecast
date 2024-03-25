import React from 'react';
import Modal from './Modal';
import AllocationForm from '../forms/AllocationForm';
import { TaskData } from '../../feature/modal/modalSlice';

interface ManageModalProps {
  visibility:boolean;
  closeModal: (skipCon?:boolean)=>void;
  task?:TaskSlot;
  taskData?:TaskData;
}

function ManagementModal({
  visibility, closeModal, task, taskData,
}:ManageModalProps) {
  return (
    <Modal visibility={visibility} closeModal={closeModal}>
      <div className="p-3 w-full min-h-[80vh]">
        <div className=" flex justify-center items-center  w-full pb-4">
          <div className=" flex flex-col gap-y-2 w-full">
            <div>
              <div className="inline-flex items-center text-xs hover:bg-gray-100 rounded-xl transition-colors group">
                <div
                  className="outline-none select-none  p-2 hover:text-black  rounded-lg text-center text-black/70"
                >
                  Allocation
                </div>

              </div>
            </div>
            <div>
              <AllocationForm
                closeModal={(skipCon = false) => closeModal(skipCon)}
                task={task}
                taskData={taskData}
              />
            </div>
          </div>

        </div>

      </div>
    </Modal>
  );
}

export default ManagementModal;
