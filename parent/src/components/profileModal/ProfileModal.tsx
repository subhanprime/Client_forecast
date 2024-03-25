import React, { useState } from 'react';

function ProfileSettings({ closeModal, isModalOpen, onToggleChange }:any) {
  const [toggle12Hour, setToggle12Hour] = useState(false);
  const [toggle24Hour, setToggle24Hour] = useState(false);
  const handle12HourToggled = (t:boolean) => {
    setToggle12Hour(t);
    if (onToggleChange) {
      onToggleChange(t);
    }
  };
  const handle24HourToggled = (t:boolean) => {
    setToggle24Hour(t);
    if (onToggleChange) {
      onToggleChange(t);
    }
  };
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
            className="relative p-4 w-full max-w-xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-lg shadow-2xl  mt-24">
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 pt-4   rounded-t ">
                <div>
                  Sameed Atta Khan
                </div>
                <div>
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-indigo-700 font-semibold text-2xl " />
                </div>
              </div>
              {/* Modal body */}
              <div className="px-4 md:px-5 pt-2 space-y-4 pb-5 ">
                <div>
                  <div className="mb-2">Email *</div>
                  <div className="w-50 mb-2">
                    <input type="text" placeholder="   sameed.atta@txend.com" className="w-full h-10 border rounded-md" />
                  </div>
                  <div className="text-xs">You are connected to your Google account (sameed.atta@txend.com)</div>
                </div>
                <div className="text-right text-sm ">
                  Forgot your password?
                  <a className="text-blue-400 hover:underline" href="/">
                    {' '}
                    {' '}
                    Reset
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-600 font-semibold">Access</p>
                  <p className="font-semibold text-black/80">Admin</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-600 font-semibold">Time Format</p>
                  <div className="flex text-black/30 items-center w-[47%] cursor-pointer select-none bg-gray-100 h-12 rounded-lg justify-center p-1 shadow-inner transition-colors duration-500">
                    <div onClick={() => handle12HourToggled(false)} className={`flex-[0.5] flex items-center  justify-center rounded-lg h-full ${!toggle12Hour ? 'text-black shadow-md bg-white/80' : ''}`}>12-hour clock</div>
                    <div onClick={() => handle12HourToggled(true)} className={`flex-[0.5] flex items-center  justify-center  rounded-lg h-full ${toggle12Hour ? 'text-black shadow-md bg-white/80' : ''}`}>24-hour clock</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-600 font-semibold">Log time display format</p>
                  <div className="flex text-black/30 items-center w-[47%] cursor-pointer select-none bg-gray-100 h-12 rounded-lg justify-center p-1 shadow-inner transition-colors duration-500">
                    <div onClick={() => handle24HourToggled(false)} className={`flex-[0.5] flex items-center  justify-center rounded-lg h-full ${!toggle24Hour ? 'text-black shadow-md bg-white/80' : ''}`}>HH:MM</div>
                    <div onClick={() => handle24HourToggled(true)} className={`flex-[0.5] flex items-center  justify-center  rounded-lg h-full ${toggle24Hour ? 'text-black shadow-md bg-white/80' : ''}`}>Decimal</div>
                  </div>
                </div>
              </div>

              <div />
              {/* Modal footer */}
              <div className=" ml-5 flex flex-row gap-3 pb-3 pt-4">
                <button type="button" className="bg-blue-500 text-neutral-100 px-2 h-10 rounded-md text-sm">Save Settings</button>
                <button type="button" onClick={closeModal} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSettings;
