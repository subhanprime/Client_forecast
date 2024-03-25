import React from 'react';
import ManagementModal from './ManagementModal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { cancelConfirm, closeModal } from '../../feature/modal/modalSlice';
import TaskDetailsModal from './TaskDetailsModal';
import ConfirmationModal from './ConfirmationModal';
import { Modals } from '../../constants';
import EmailScheduleModal from './EmailScheduleModal';
import ExportCSVModal from './ExportCSVModal';
import SaveFilterModal from './SaveFilterModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function ModalHandler() {
  const {
    management, taskDetails, emailSchedule, confirm, exportCSV, saveFilter, deleteConfirm,
  } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleModalClose = (modal:Modals, skipCon?:boolean) => {
    dispatch(closeModal({ modal, skipCon }));
  };

  return (
    <div data-testid="modal-handler">
      <ManagementModal
        visibility={management.isOpen}
        closeModal={(skipCon = false) => handleModalClose(Modals.Alloc, skipCon)}
        task={management.task}
        taskData={management.taskData}
      />
      <TaskDetailsModal
        visibility={taskDetails.isOpen}
        closeModal={() => handleModalClose(Modals.Task)}
        task={taskDetails.task}
      />
      <EmailScheduleModal
        visibility={emailSchedule.isOpen}
        closeModal={() => handleModalClose(Modals.Email)}
      />
      <ExportCSVModal
        visibility={exportCSV.isOpen}
        closeModal={() => handleModalClose(Modals.Export)}
      />
      <SaveFilterModal
        visibility={saveFilter.isOpen}
        closeModal={() => handleModalClose(Modals.Filter)}
        filter={saveFilter.filter}
      />
      <DeleteConfirmationModal
        visibility={deleteConfirm.isOpen}
        closeModal={() => handleModalClose(Modals.Delete)}
        onDelete={deleteConfirm.onDelete}
        title={deleteConfirm.title}
        type={deleteConfirm.type}
      />
      <ConfirmationModal
        visibility={confirm.isOpen}
        closeModal={() => handleModalClose(Modals.Confirm)}
        cancelModal={() => dispatch(cancelConfirm())}
      />
    </div>
  );
}

export default ModalHandler;
