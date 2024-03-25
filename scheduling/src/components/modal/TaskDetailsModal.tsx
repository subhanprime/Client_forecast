import React from 'react';
import moment from 'moment';
import { Zap } from 'lucide-react';
import Modal from './Modal';

interface ViewModalProps {
  visibility:boolean;
  closeModal: ()=>void;
  task?:TaskSlot
}

function TaskDetailsModal({ visibility, closeModal, task }:ViewModalProps) {
  if (!visibility || !task) {
    return null;
  }
  return (
    <Modal visibility={visibility} closeModal={closeModal}>
      <div className="flex flex-col gap-7 py-10 px-6">
        <div className="grid grid-cols-5">
          <div className="col-span-1 flex flex-col gap-3">
            <div className=" text-xs text-black/80">Hours/day</div>
            <div className="font-medium">{task.h}</div>
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <div className=" text-xs text-black/80">Total Hours</div>
            <div className="font-medium">{task.h * task.w}</div>
          </div>
          <div className="col-span-3 flex flex-col gap-3">
            <div className=" text-xs text-black/80">
              Duration:
              {' '}
              {task.w}
              {' '}
              days
            </div>
            <div className="flex gap-5 font-medium">
              <div>{moment(task.startDate).format('DD MMM YYYY')}</div>
              <div className="flex gap-2">
                <div>{'>'}</div>

                <div>{moment(task.endDate).format('DD MMM YYYY')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-3">
          <div className=" text-xs text-black/80">Project</div>
          <div data-testid="task-name" className="font-medium">{task.name}</div>

        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <div className=" text-xs text-black/80">Assigned to</div>
          <div className="font-medium">{task.personName}</div>

        </div>
        <div className="flex gap-2 font-light text-black/70 text-xs">
          <div className="text-black/60">

            <Zap size={12} />
          </div>
          <div>

            Add by
            {' '}
            {task.modifiedBy}
            {' '}
            {moment(task.modifiedDate).fromNow()}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TaskDetailsModal;
