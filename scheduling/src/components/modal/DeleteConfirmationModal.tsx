import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from './Modal';

interface DeleteModalProps {
  visibility:boolean;
  closeModal: ()=>void;
  type?:string,
  title?:string,
  onDelete?: ()=>void
}

function DeleteConfirmationModal({
  visibility, closeModal, type, title, onDelete,
}:DeleteModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (onDelete) {
        await onDelete();
      }
    } catch (error) {
      toast.error(`Error deleting ${type}`);
    }
    setLoading(false);
    closeModal();
  };
  return (
    <Modal visibility={visibility} closeModal={closeModal} place="top" width="large">
      <div className="flex flex-col gap-8 px-5 py-7">
        <div className="text-xl items-center w-full">
          Delete
          {' '}
          {type}
        </div>
        <div className="text-sm items-center w-full">
          Delete
          {' '}
          {type}
          {' '}
          {`"${title}"`}
        </div>

        <div className=" flex gap-3">
          <button
            data-testid="delete-btn"
            onClick={handleDelete}
            type="button"
            disabled={loading}
            className={` hover:bg-red-800 bg-red-500 text-white flex gap-2 items-center justify-center text-sm rounded  p-2 cursor-pointer`}
          >
            <div>

              Delete
              {' '}
              {type}
            </div>
            {loading && <div className="custom-loader" />}

          </button>
          <button
            type="button"
            onClick={closeModal}
            className="hover:bg-gray-300 bg-gray-200/60 text-black/60 text-sm rounded  p-2 cursor-pointer"
          >
            Cancel

          </button>
        </div>
      </div>

    </Modal>
  );
}

export default DeleteConfirmationModal;
