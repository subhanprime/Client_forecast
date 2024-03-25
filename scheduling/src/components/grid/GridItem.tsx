import React, { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openModal } from '../../feature/modal/modalSlice';
import { ContextSelectedType, Modals } from '../../constants';

interface GridRowItemProps {
  task:TaskSlot,
  handleMouseEnter:(id:string)=>void;
  handleMouseLeave:(id:string)=>void;
  handleDelete: (item: TaskSlot) => void;
}

function GridItem({
  task, handleMouseEnter, handleMouseLeave, handleDelete,
}: GridRowItemProps) {
  const item = useRef<HTMLDivElement>(null);
  const {
    id, name, time, color,
  } = task;
  const dispatch = useAppDispatch();
  const { selectedContext } = useAppSelector((state) => state.calender);

  useEffect(() => {
    if (item && item.current) {
      item.current.addEventListener('mouseenter', () => {
        handleMouseEnter(id);
      });
      item.current.addEventListener('mouseleave', () => {
        handleMouseLeave(id);
      });
    }
  }, [item]);

  const handleModalOpen = (e:any) => {
    e.stopPropagation();
    if (selectedContext === ContextSelectedType.Add) {
      dispatch(openModal({ isOpen: true, name: Modals.Alloc, task }));
    }
    if (selectedContext === ContextSelectedType.View) {
      dispatch(openModal({ isOpen: true, name: Modals.Task, task }));
    }
    if (selectedContext === ContextSelectedType.Delete) {
      dispatch(openModal({
        isOpen: true,
        name: Modals.Delete,
        onDelete: () => handleDelete(task),
        title: `${task.name}'s task`,
        type: 'Task',
      }));
    }
  };
  // console.log(x);
  return (
    <div
      ref={item}
      gs-id={`${id}`}
      className="grid-stack-item sub overflow-hidden p-10"
    >

      <div
        onClick={handleModalOpen}
        data-testid="gridItemContent"
        style={{
          backgroundColor: task.status === 'tentative' ? '#fff' : `#${color}`,
          overflowY: 'hidden',
          fontSize: `${time > 4 ? '12px' : time > 2 ? '8px' : '6px'}`,
          color: task.status === 'tentative' ? `#${color}` : `#fff`,
          border: `2px solid ${task.status === 'tentative' ? `#${color}` : `transparent`}`,
        }}
        className={`grid-stack-item-content font-medium rounded-md shadow overflow-hidden flex justify-between ${time >= 4 ? 'p-1 px-2  h-[80%]' : 'p-0  h-full'}  z-10 `}
      >
        <div className={`flex ${time > 4 ? 'flex-col' : 'flex-row gap-1'}`}>
          {task.taskName !== '' && (
          <div className={`text-[10px] ${time > 4 ? '' : 'after:content-["/"]'}`}>
            {task.taskName}
            {' '}
          </div>
          )}
          <div>{name}</div>
        </div>
        <div className={`flex justify-between ${time > 4 ? 'flex-col' : 'flex-row-reverse gap-3'}`}>
          <div>

            {task.status === 'completed' && (
            <div className={`bg-black/30 rounded-full flex justify-center items-center ${time > 4 ? ' h-4 w-4' : 'h-3 w-3'}`}>
              <Check size={time > 4 ? 12 : 8} />
            </div>
            )}
          </div>
          <div className="item-hours">
            {time}
            h
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridItem;
