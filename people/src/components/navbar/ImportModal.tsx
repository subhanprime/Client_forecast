import { FileDown, Paperclip } from 'lucide-react';
import React from 'react';

function ImportModal({ isModalOpen, closeModal }:any) {
  return (
    <div>

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className={`${
            isModalOpen ? 'fixed flex' : 'hidden'
          } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-40 justify-center items-start w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white/40 `}
          onClick={closeModal}
        >
          <div className="relative bg-white rounded-lg w-[550px] shadow-2xl  mt-9 ">

            <div className="flex items-center justify-between px-6 pt-4   rounded-t ">
              <h3 className="text-3xl font-semibold text-gray-900 dark:text-white py-2">
                Import People
              </h3>
            </div>
            <div className="flex flex-col px-6">
              <div className="font-bold py-2 text-lg">
                1. Build your list
                <p className="font-normal">
                  This template provides all the fields you’ll need.
                  {' '}
                  <span className="text-blue-400">See the guide</span>
                  {' '}
                  for help.
                </p>
              </div>
              <div className="flex flex-row items-center gap-3 py-2 pb-6">
                <input type="checkbox" />
                <div>Pre-populate with existing team to update people</div>
              </div>
              <div className=" bg-zinc-200 rounded-md w-[230px]">
                <div className="flex flex-row items-center gap-1 py-3 px-2">
                  <FileDown size={14} />
                  Download people template
                </div>
              </div>
              <div className="font-bold py-3 text-lg pt-9 ">
                2. Upload Your CSV
              </div>
              <div className=" bg-zinc-200 rounded-md w-[230px] mb-6">
                <div className="flex flex-row items-center gap-1 py-3 px-2 pb">
                  <Paperclip size={14} />
                  Upload CSV file
                </div>
              </div>

            </div>

          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default ImportModal;
