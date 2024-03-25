import React from 'react';
import Modal from './Modal';

interface ConfirmProps {
  visibility:boolean;
  closeModal: ()=>void;
  cancelModal: ()=>void;
}
function ConfirmationModal({ visibility, closeModal, cancelModal }:ConfirmProps) {
  return (
    <Modal visibility={visibility} closeModal={closeModal} place="top" position={2} width="large">
      <div className="flex flex-col gap-6 px-5 py-7">
        <div className="text-2xl font-semibold">
          You have unsaved changes.
        </div>
        <div>Are you sure you want to leave?</div>
        <div className="flex gap-3 text-base select-none ">
          <button onClick={closeModal} type="button" className="py-2 px-3 rounded bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 active:scale-95 transition-all cursor-pointer">Leave</button>
          <button onClick={cancelModal} type="button" className="py-2 px-3 rounded bg-gray-200  hover:bg-gray-300 active:bg-gray-400 active:scale-95 transition-all cursor-pointer">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
