import React from 'react';

function BulkArchive({ closeModal, isModalOpen, selected } :any) {
  return (
    <div>
      {/* Main modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className={`${
            isModalOpen ? 'fixed flex' : 'hidden'
          } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-start w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white/40 bg-opacity-50`}
          onClick={closeModal}
        >
          <div
            className="relative p-4 w-full max-w-xl max-h-full "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-2xl pb-4
           mt-24"
            >
              <div className="px-4 text-2xl font-semibold py-4">
                Archive
                {' '}
                {selected && selected.length === 1 ? `${selected[0].name}` : `${selected.length} People`}
              </div>
              <div className="flex flex-col gap-3 py-3">
                <div className="mb-4 px-4 ">
                  <div className="font-normal">All historical data will be retained in Float</div>
                  <p className="font-normal mt-2">Any access is removed, so they will no longer be able to sign in</p>
                  <p className="mt-2">Anyone you archive can be restored from the People page.</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3 px-4">
                <button type="button" className="bg-red-600 text-neutral-100 px-2 h-10 rounded-md text-sm">
                  Archive
                  {' '}
                  {selected && selected.length === 1 ? `${selected[0].name}` : `${selected.length} People`}
                </button>
                <button type="button" onClick={closeModal} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BulkArchive;
