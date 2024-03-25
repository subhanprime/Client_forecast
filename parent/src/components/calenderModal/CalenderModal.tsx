import React from 'react';
import googleCalender from '../../media/svgs/googleCalender.png';
import outlook from '../../media/svgs/outlook.png';

function CalenderModal({ closeModal, isModalOpen }:any) {
  const tokenValue = '  https://ical.float.com/c1/w304PEKrBiaLVmCKF00NsNvx%2FKX7YyUX%2Fesp7zxpKvY%3D/basic.ics';

  const redirectToLearnMore = () => {
    window.open('https://support.float.com/en/articles/55484-subscribe-to-ical', '_blank');
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
              <div className="flex flex-col gap-6 px-6 pt-4 rounded-t pb-4">
                <div className="text-xl font-semibold">
                  Calender integrations
                </div>
                <div className="font-semibold">
                  Which calendar do you want to sync with Float?
                </div>
                <div>
                  <div className="flex py-5 px-2 border-b justify-between items-center ">
                    <div className="flex gap-3   items-center">
                      <div className="h-10 w-10">

                        <img src={googleCalender} alt="img" />
                      </div>
                      <div className="flex gap-2 text-2xl text-gray-500/90 font-semibold">
                        Google
                        <span className="text-gray-500 font-normal">Calendar</span>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm cursor-pointer bg-blue-700 rounded py-2 px-3 font-semibold">
                      <div className="text-white flex items-center gap-3">Connect</div>
                    </div>
                  </div>
                  <div className="flex py-5 px-2 border-b justify-between items-center ">
                    <div className="flex gap-3   items-center">
                      <div className="h-10 w-10">

                        <img src={outlook} alt="img" />
                      </div>
                      <div className="flex gap-2 text-2xl text-blue-400 font-semibold">
                        Outlook
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm cursor-pointer bg-blue-700 rounded py-2 px-3 font-semibold">
                      <div className="text-white flex items-center gap-3">Connect</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 font-semibold">
                  Using another calendar?
                  <div className="flex flex-col font-normal">
                    Send your Float tasks to your favorite calendar app using iCal.
                    <span className="text-blue-400 underline" onClick={redirectToLearnMore}>
                      Learn more.
                    </span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-row items-center gap-6 mr-3">
                    <input type="text" value={tokenValue} className="w-full h-10 border rounded-md" />
                    <div className="flex items-center text-center text-blue-500 hover:bg-indigo-300 rounded-md w-14 h-10">Copy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalenderModal;
