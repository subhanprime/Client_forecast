import { MoreVertical } from 'lucide-react';
import React, {
  RefObject, useEffect, useRef, useState,
} from 'react';
import bellSvg from '../../media/svgs/bell.svg';

function NotificationModal({ onClose }:any) {
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const ref: RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsNotificationActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleNotificationClick = (event: any) => {
    event.stopPropagation();
    // setIsBellActive(true);
    setIsNotificationActive(!isNotificationActive);
  };

  return (

    <div ref={ref}>

      <div
        className="flex justify-center items-center mb-3"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={bellSvg}
          alt="Bell"
          className={`p-1 cursor-pointer ${isNotificationActive ? 'active' : ''}`}
          onClick={handleNotificationClick}
        />
      </div>
      {isNotificationActive && (
        <div className="bg-white absolute top-[450px] left-[60px] z-50 p-2 rounded-md shadow-2xl w-[350px]">
          <div data-testid="notifications">
            <div className="flex items-center justify-between cursor-pointer text-lg font-bold" onClick={onClose}>
              Notifications
              <MoreVertical />
            </div>
            <div className="cursor-pointer" onClick={onClose}>
              <div className="flex flex-col items-center">
                <svg className="_1fg47ed5" xmlns="http://www.w3.org/2000/svg" width="248" height="314" viewBox="0 0 248 314" fill="none">
                  <path fill="#99491C" stroke="#242C39" strokeMiterlimit="10" strokeWidth=".6" d="M116.187 71.656C103.507 106.506 118.5 102.5 88 114.5c-.757 4.082 5.381 20.723 28.322 22.526 15.235 1.198 38.481-4.059 35.678-26.526-19.5-7.5-15.193-5.134-6.079-31.484-8.865-1.3-21.716-4.69-29.734-7.36Z" />
                  <path fill="#99491C" stroke="#242C39" strokeMiterlimit="10" strokeWidth=".6" d="M108.32 52.738c5.253-7.956 25.353-8.07 33.706-3.258C146.184 51.82 153.4 59.2 149 70c.833 8-.4 24.9-12 28.5-4.904.952-17.39.421-28.106-9.322-7.885-11.009-8.105-25.027-.574-36.44Z" />
                  <path fill="#99491C" d="m125.328 95.694-2.42 4.837c-2.084-.547-9.529-3.682-11.844-6.08l.435-4.59 13.829 5.833Z" />
                  <path fill="#99491C" stroke="#242C39" strokeMiterlimit="10" strokeWidth=".6" d="M104.398 71.55 101.5 61.5c.581-2.139 11.626 1.392 14.5 2.5 2.875 1.107 4.351 6.866 3.762 9l-2.046 4.03c-.58 2.138-3.381 2.974-6.256 1.867-2.865-1.105-7.643-5.21-7.062-7.348Z" />
                  <path fill="#99491C" d="m123.233 85.427 8.141-7.643-9.855-8.036L110.5 75.5l-1 5.5 13.733 4.427Z" />
                  <path stroke="#242C39" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".6" d="M111.633 70.213c1.087.596 3.213 2.53 2.788 4.609-.043-.473-1.332-2.481-3.949-2.674" />
                  <path fill="#242C39" stroke="#242C39" strokeWidth=".6" d="M161 60.5c0 4.8-6.333 4.667-10.5 4 .8-5.6-2.333-9.667-4-11-2.667 2-9.2 4.8-14 0-6-6-10 .5-8.5 8 1.2 6-2.5 8.667-4 9.5-1.6-3.6-6.833-6.667-8.5-6.5-8-.4-7.167 7-5 11-1.6 4.4-6.333 4.5-10.5 4.5 3.5-2 7.437-8.613 3.5-11.5-7.5-5.5-1-9.333.5-10.5-.833-.167-4.5-3-4.5-8 0-5.6 5-7.167 7.5-8-2-.667-3-3-2-5 1.6-3.2 6-2.833 9-1.5-.167-1.667 2.808-5.297 7-3.5 1.93.827 2.036 3.705 1.449 4.96C120.163 35.077 123.625 33 128 33c4.8 0 8.167 3.167 9 5.5 3.5-1.833 10.8-1.9 16 2.5 5.2 4.4 2.167 9.167 0 12 3 .667 8 2.7 8 7.5Z" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M167.28 286.565c1.717 0 5.73.386 8.048 1.931 2.318 1.545 4.4 1.288 5.151.966" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M174.681 288.174c.108-1.287.837-3.605 2.898-2.575 2.06 1.03 1.502 3.005.966 3.863m-9.334.644c.966.107 3.477.515 5.795 1.287 2.318.773 4.829.322 5.795 0" />
                  <path fill="#fff" stroke="#242C39" strokeWidth=".6" d="M125.253 151.067a1.322 1.322 0 1 0 0-2.644 1.322 1.322 0 0 0 0 2.644Z" />
                  <path fill="#96C7F2" stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="m89.37 290.935.643-2.254 2.575-1.931 50.947-41.778c-2.06 12.362 2.066 23.856 4.427 28.578 4.121-1.03 15.024-.429 19.96 0 4.829 0 18.672-.708 35.413-3.541 20.926-3.542 48.935-22.536 28.009-46.359-16.741-19.059-49.257-7.942-63.422 0-12.878 2.253-49.787 10.288-91.109 1.931-57.305-11.59-64.387-2.897-70.504 3.541-6.117 6.439-13.2 30.585 13.2 44.428 21.119 11.075 55.373 16.848 69.86 17.385Z" />
                  <path fill="#99491C" stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M174.683 289.969c4.378.515 5.688-1.288 5.795-2.253 1.03-.773.429-1.825 0-2.254.536-.537 1.159-2.382-.644-5.473-2.254-3.863-4.507-3.541-9.98-5.795-4.378-1.803-16.634-1.824-22.214-1.61-4.378-8.756-4.4-22.535-3.863-28.33-6.868 3.005-22.021 8.306-27.687 5.473-7.083-3.542-10.302-2.254-17.385-.644-7.082 1.61-8.692-2.254-16.74-3.541-6.439-1.031-11.698.858-13.522 1.931l28.01 12.878c-.259 9.787-4.4 22.75-6.44 28.008 4.722.108 17.449.515 30.584 1.288 16.419.966 32.516-1.288 41.53-1.931 9.015-.644 7.083 1.609 12.556 2.253Z" />
                  <path fill="#A5E4D4" d="m55.096 185.331 9.476-53.557a20.001 20.001 0 0 1 12.295-15.097l27.852-11.091v5.37c0 10.32 8.365 18.685 18.684 18.685 10.32 0 18.685-8.365 18.685-18.685v-5.37l29.195 11.378a20 20 0 0 1 12.222 14.126l12.106 52.317 33.482 20.282-18.351 10.624-27.216-1.038a16.89 16.89 0 0 1-16.096-14.625l-1.185-8.804 1.239 12.234v21.706c-26.587 17.785-60.936 19.035-88.746 3.231l-2.443-1.388 2.048-14.808a112.668 112.668 0 0 1 2.137-11.222l-.783 2.755a16.89 16.89 0 0 1-15.832 12.264l-26.97.661-18.672-9.98 35.823-18.54a1.999 1.999 0 0 0 1.05-1.428Z" />
                  <path stroke="#242C39" strokeWidth=".6" d="m195.611 183.407-12.106-52.317a20 20 0 0 0-12.222-14.126l-29.195-11.378v5.37c0 10.32-8.365 18.685-18.685 18.685-10.319 0-18.684-8.365-18.684-18.685v-5.37l-27.852 11.091a20.001 20.001 0 0 0-12.295 15.097l-9.476 53.557a1.999 1.999 0 0 1-1.05 1.428l-35.823 18.54 18.672 9.98 26.97-.661a16.89 16.89 0 0 0 15.832-12.264l3.558-12.508m112.356-6.439 33.482 20.282-18.351 10.624-27.216-1.038a16.89 16.89 0 0 1-16.096-14.625l-1.185-8.804-2.184-21.57 3.423 33.804v21.706c-26.587 17.785-60.936 19.035-88.746 3.231l-2.443-1.388 2.048-14.808a112.665 112.665 0 0 1 3.765-17.188l1.147-3.787m112.356-6.439c-2.788-.302-9.588.093-14.487 4.093m-97.87 2.346v-21.57" />
                  <path stroke="#242C39" strokeWidth=".6" d="M55 186.5c2.667-.167 9.5.2 15.5 3m93.836-33.78c.235 1.293.466 4.57-.493 7.335-.959 2.765-.071 5.383.493 6.347M83.14 155.077c-.235 1.292-.465 4.57.494 7.334.959 2.765.071 5.384-.494 6.347" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M96.772 261.317c2.897 1.18 9.4 3.928 12.233 5.473 3.541 1.932 6.117 2.575 15.775 3.219 7.726.515 18.458 1.717 22.858 2.254" />
                  <path fill="#99491C" stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M213 217.769c-1.2-1.625-2-2.269-2-3.542-1.545-2.833 10.641-7.726 16.865-10.302h6.761c0-2.833 1.717-3.541 2.575-3.541.322-.751 1.417-2.06 3.22-1.288 1.803.773.751 3.971 0 5.473l1.287 13.2c.322-.859.902-3.22.644-5.795-.322-3.22-.965-6.761 1.932-6.761s2.897 3.219 3.219 9.014c.322 5.795.322 5.151-4.829 8.371-4.121 2.575-5.151 1.931-5.151 1.287-2.318 3.606-5.043 3.22-6.117 2.576-1.03 1.03-2.79.429-3.541 0-1.61 1.932-4.829 0-9.658-3.863-2.207-1.766-4.416-3.758-5.207-4.829Z" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M223.355 223.242c1.181-2.254 4.057-6.632 6.117-6.117 2.575.644.644 3.863 0 5.795a20.16 20.16 0 0 1-1.61 3.541" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M230.765 217.769c.322-.537.966-2.254.966-4.829 0-3.22-.322-8.693 2.897-8.693 3.22 0 1.61 3.22 1.932 9.014.322 5.795 0 6.761-1.288 8.693-1.03 1.545-3.005 3.648-3.863 4.507" />
                  <path fill="#99491C" stroke="#242C39" strokeWidth=".6" d="M235.191 203.903h-.486a1.39 1.39 0 0 0-1.389 1.389v1.773a1.39 1.39 0 0 0 1.389 1.389h.486a1.39 1.39 0 0 0 1.389-1.389v-1.773a1.39 1.39 0 0 0-1.389-1.389Zm-4.874 13.624-.454-.171a1.39 1.39 0 0 0-1.79.811l-.624 1.659a1.39 1.39 0 0 0 .811 1.79l.455.17a1.389 1.389 0 0 0 1.789-.811l.624-1.659a1.389 1.389 0 0 0-.811-1.789Z" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M221.748 208.754c.965 1.18 3.67 3.992 6.76 5.795m-4.505-5.795c1.18 1.18 4.314 3.928 7.405 5.473m-10.948 5.795c.751-.751 3.219-2.254 7.083-2.254" />
                  <path fill="#99491C" stroke="#242C39" strokeWidth=".6" d="M238.41 200.684h-.485a1.39 1.39 0 0 0-1.389 1.389v1.773a1.39 1.39 0 0 0 1.389 1.389h.485a1.39 1.39 0 0 0 1.389-1.389v-1.773a1.39 1.39 0 0 0-1.389-1.389Zm6.438 4.507h-.485a1.39 1.39 0 0 0-1.389 1.389v1.773a1.39 1.39 0 0 0 1.389 1.389h.485a1.39 1.39 0 0 0 1.389-1.389v-1.773a1.39 1.39 0 0 0-1.389-1.389Z" />
                  <path fill="#99491C" stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M34.5 218.5c1.552-1.634 2-2.376 2.508-3.307 1.545-2.833-10.517-8.692-16.741-11.268h-6.76c0-2.833-1.718-3.541-2.576-3.541-.322-.751-1.417-2.06-3.22-1.288-1.803.773-.75 3.971 0 5.473l-1.288 13.2c-.321-.859-.9-3.22-.643-5.795.322-3.22.965-6.761-1.932-6.761s-2.898 3.22-3.22 9.014c-.321 5.795-.321 5.151 4.83 8.371 4.12 2.575 5.15 1.931 5.15 1.288 2.319 3.605 5.044 3.219 6.118 2.575 1.03 1.03 2.79.429 3.54 0 1.61 1.932 4.83 0 9.659-3.863 1.997-1.598 3.024-2.464 4.575-4.098Z" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M24.777 223.242c-1.18-2.254-4.056-6.632-6.117-6.117-2.576.644-.644 3.863 0 5.795a20.179 20.179 0 0 0 1.61 3.541" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M17.366 217.769c-.322-.537-.965-2.254-.965-4.829 0-3.22.322-8.693-2.898-8.693s-1.61 3.22-1.931 9.014c-.322 5.795 0 6.761 1.287 8.693 1.03 1.545 3.005 3.648 3.864 4.507" />
                  <path fill="#99491C" stroke="#242C39" strokeWidth=".6" d="M12.941 203.903h.485a1.39 1.39 0 0 1 1.39 1.389v1.773a1.39 1.39 0 0 1-1.39 1.389h-.485a1.39 1.39 0 0 1-1.389-1.389v-1.773a1.39 1.39 0 0 1 1.39-1.389Zm4.873 13.624.454-.171a1.39 1.39 0 0 1 1.79.811l.623 1.66a1.389 1.389 0 0 1-.81 1.789l-.455.17a1.388 1.388 0 0 1-1.789-.811l-.624-1.659a1.389 1.389 0 0 1 .811-1.789Z" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".6" d="M26.385 208.754c-.966 1.18-3.67 3.992-6.761 5.795m4.506-5.795c-1.181 1.18-4.315 3.928-7.405 5.473m10.947 5.795c-.75-.751-3.219-2.254-7.082-2.254" />
                  <path fill="#99491C" stroke="#242C39" strokeWidth=".6" d="M9.722 200.684h.486a1.39 1.39 0 0 1 1.389 1.389v1.773a1.39 1.39 0 0 1-1.39 1.389h-.485a1.39 1.39 0 0 1-1.389-1.389v-1.773a1.39 1.39 0 0 1 1.39-1.389Zm-6.438 4.507h.485a1.39 1.39 0 0 1 1.39 1.389v1.773a1.39 1.39 0 0 1-1.39 1.389h-.485a1.39 1.39 0 0 1-1.39-1.389v-1.773a1.39 1.39 0 0 1 1.39-1.389Z" />
                  <path fill="#fff" d="M150.593 298.085C81.5 266 33 269.5 5 269.5l20 22c90.67 10.374 193.127 40.692 125.593 6.585Z" />
                  <path stroke="#242C39" strokeWidth=".8" d="M5.5 270c13 0 77.559-6.023 145.092 28.085" />
                  <path stroke="#242C39" strokeWidth=".6" d="M68.925 247.735c-8.29-3.224-27.08-17.04-35.922-17.04M144.5 251c5.333-2 19.7-7.9 36.5-15.5s27.667-9.5 31-9.5" />
                </svg>
                <div>
                  <div className="flex flex-col items-center font-semibold">
                    You currently have no notifications.
                    <div className="text-xs">We hope you enjoy this peace and quiet</div>
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

export default NotificationModal;
