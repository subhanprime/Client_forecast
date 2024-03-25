import React, {
  RefObject, useEffect, useRef, useState,
} from 'react';
import helpIcon from '../../media/svgs/help.svg';

function HelpMenu() {
  const [isHelpActive, setIsHelpActive] = useState(false);

  const ref: RefObject<HTMLDivElement> = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsHelpActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleHelpClick = (event: any) => {
    event.stopPropagation();
    setIsHelpActive(!isHelpActive); // Reset the other icon's active state
  };
  return (
    <div ref={ref}>

      <div
        className="flex justify-center items-center mb-3"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={helpIcon}
          alt="Help"
          className={`p-1 cursor-pointer ${isHelpActive ? 'active' : ''}`}
          onClick={handleHelpClick}
        />
      </div>

      {isHelpActive && (
        <div className="bg-white absolute top-[350px] left-[60px] z-50 p-2 rounded-md shadow-2xl w-[300px]">
          <div className="cursor-pointer text-lg font-bold" onClick={() => setIsHelpActive(false)}>
            Help
          </div>
          <div className="cursor-pointer flex flex-col ">
            <div className="flex justify-between gap-4 items-center mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 shadow-md">
              <div>
                <div>
                  Help Center
                </div>
                <div className="text-gray-600 text-xs">Your Float questions answered</div>
              </div>
              <div>
                <svg fill="none" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24.67" height="23.67" x="40.834" y="27.835" fill="#F76808" stroke="#242C39" strokeWidth=".33" rx="1.335" transform="rotate(179.764 40.834 27.835)" />
                  <rect width="24.67" height="32.67" x="7.165" y="11.165" fill="#fff" stroke="#242C39" strokeWidth=".33" rx="1.335" />
                  <rect width="19.67" height="4.67" x="9.847" y="14.361" fill="#F9C6C6" stroke="#242C39" strokeWidth=".33" rx=".585" />
                  <path fill="#40C4AA" stroke="#000" strokeWidth=".33" d="M21.34 39.223c.21-.35.317-.737.323-1.155v-.005a2.236 2.236 0 0 0-.674-1.606c-.44-.442-.96-.67-1.55-.67-.617 0-1.148.226-1.585.671v.001c-.43.445-.644.984-.639 1.606a2.244 2.244 0 0 0 .638 1.623l.001.002c.437.445.968.67 1.585.67.396 0 .764-.102 1.099-.308l.002-.001c.33-.21.598-.486.8-.828Zm0 0-.142-.084.142.084Zm-3.698-4.352v.103c0 .202.163.365.365.365h2.851a.365.365 0 0 0 .365-.365v-.101c.006-.568.076-1.036.205-1.41.136-.375.338-.704.607-.99.28-.288.64-.57 1.083-.842a7.308 7.308 0 0 0 1.43-1.136h.001c.409-.43.726-.92.951-1.472.233-.562.347-1.2.347-1.91 0-1.062-.256-1.98-.775-2.746-.516-.762-1.227-1.34-2.128-1.736-.9-.402-1.93-.6-3.087-.6-1.056 0-2.025.196-2.906.59-.886.392-1.6.99-2.138 1.79-.242.362-.314.631-.292.835a.476.476 0 0 0 .203.356l.015.01.007.004 2.296 1.556a.408.408 0 0 0 .382.03.505.505 0 0 0 .27-.246c.054-.117.13-.236.207-.349.028-.042.059-.085.088-.126a5.12 5.12 0 0 0 .12-.175c.197-.308.446-.536.75-.687l.002-.001a2.1 2.1 0 0 1 .98-.24c.358 0 .68.078.969.23.294.153.527.369.7.65.17.28.258.607.258.989 0 .36-.077.682-.23.97-.155.29-.366.556-.634.798a7.954 7.954 0 0 1-.932.721 6.125 6.125 0 0 0-1.25 1.058c-.358.402-.625.923-.808 1.556v.001c-.177.636-.266 1.478-.272 2.52Z" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between gap-4 items-center mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 shadow-md">
              <div>
                <div>
                  Message support
                </div>
                <div className="text-gray-600 text-xs">Ask our experts for help</div>
              </div>
              <div>
                <svg fill="none" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#iconHelpCenterMask)">
                    <path fill="#F9B6A1" stroke="#242C39" strokeWidth=".385" d="m26.126 22.712 1.156.206a4.068 4.068 0 0 1 3.335 4.384l-.133 1.424a2.346 2.346 0 0 0 1.272 2.31.564.564 0 0 1 .155.89l-1.16 1.228a8.38 8.38 0 0 1-6.28 2.623 4.685 4.685 0 0 1-1.405-.25l-.678-.23a7.221 7.221 0 0 1-4.327-4.03l-.431-1.023a1.397 1.397 0 0 1 .86-1.872l.099-.032a4.509 4.509 0 0 0 2.9-2.87 4.124 4.124 0 0 1 4.637-2.758Z" />
                    <path fill="#fff" d="M27.68 34.167c-4.152.438-7.65-3.733-8.879-5.873-3.46.683-8.883 3.47-10.631 5.873-3.573 4.913-3.96 8.558-5.51 14.76h31.3V46.6c.633 1.116.954 1.55.954 2.325h9.777c0-4.263-4.716-13.53-5.673-14.759-.765-.983-6.01-2.96-7.923-3.825.592 1.093.738 3.388-3.415 3.825Z" />
                    <path stroke="#242C39" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".3" d="M33.96 46.601c.633 1.116.954 1.55.954 2.325h9.777c0-4.263-4.716-13.53-5.673-14.759-.765-.983-6.01-2.96-7.923-3.825.592 1.093.738 3.388-3.415 3.825-4.152.438-7.65-3.733-8.879-5.873-3.46.683-8.883 3.47-10.631 5.873-3.573 4.913-3.96 8.558-5.51 14.76h31.3V46.6Zm0 0c-1.867-1.548 1.311 1.42 0 0Z" />
                    <path stroke="#242C39" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".385" d="M17.862 37.3c0 .13 1.786 7.443 2.325 11.626m-13.177 0a16.087 16.087 0 0 1-.566-2.337" />
                    <path fill="#F9B6A1" stroke="#242C39" strokeWidth=".33" d="m30.766 10.235.031.008.033-.003c1.483-.148 2.847.785 3.749 2.528.9 1.739 1.32 4.255.915 7.179-.356 2.577-.929 4.549-2.047 5.862-1.107 1.3-2.775 1.984-5.401 1.927-2.093-.045-4.502-1.374-6.335-3.478-1.829-2.1-3.06-4.948-2.822-7.995.019-.244.068-.492.138-.732 1.015-3.449 2.722-5.101 4.759-5.739 2.056-.643 4.49-.267 6.98.443Z" />
                    <path fill="#471E15" stroke="#242C39" strokeWidth=".33" d="M21.325 20.353c1.25-.687 6.672-5.628 9.226-8.012.74-.687 1.038-2.671 1.095-3.577-1.668-1.67-8.262-4.646-13.392-.64-6.412 5.008 0 10.588-3.753 15.883-1.372 1.936-1.407 3.797 0 7.44.94 2.432-5.26 2.189-1.564 6.118 1.471 1.564 3.128 2.861 4.066 4.435 6.725-2.861.256-6.338 3.227-9.486 2.377-2.518 2.346-5.723 2.033-7.01-.834-1.431-2.19-4.464-.939-5.151Z" />
                    <path fill="#471E15" stroke="#242C39" strokeWidth=".33" d="M35.613 18.427c-.5-6.181-3.44-6.772-4.848-6.295.75-1.03.313-3.434 0-4.579 6.255 3.148 7.038 6.01 6.1 12.448-.94 6.438-2.19 7.583 2.97 12.447 4.129 3.892 2.346 7.026.939 8.981-1.303.334-3.722.801-2.971 0 .75-.801-.313-2.242-.939-2.861-.5 2.403-3.336 2.909-4.691 2.861.834-.858 2.001-1.798 0-5.69-2.002-3.892-1.773-7.058-1.408-8.155 3.628-1.488 4.744-6.725 4.848-9.157Z" />
                    <path fill="#242C39" stroke="#242C39" strokeWidth=".33" d="M17.457 18.13c.034.876.324 1.647.758 2.186.433.539 1 .837 1.598.8.597-.035 1.14-.4 1.529-.988.39-.588.619-1.39.585-2.267-.034-.876-.324-1.647-.758-2.186-.433-.538-1-.836-1.598-.8-.598.036-1.14.4-1.53.988-.389.589-.618 1.39-.584 2.267Z" />
                    <path stroke="#242C39" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".33" d="m18.775 20.398.617 2.73c1.05.567 6.4 1.153 9.384 1.044" />
                    <path fill="#93C4EC" stroke="#242C39" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".33" d="M25.635 8.348c-5.095 1.223-5.998 6.167-5.952 8.777l-.559 1.164-.687-1.45c-.281-4.753 1.449-9.428 7.265-9.911 4.652-.387 7.567 1.561 8.437 2.702-.732-.503-3.719-2.43-8.504-1.282Z" />
                    <path fill="#93C4EC" stroke="#242C39" strokeWidth=".33" d="M16.314 18.084c.034.877.324 1.648.757 2.186.434.54 1.001.837 1.599.801.597-.036 1.139-.4 1.529-.989.39-.588.618-1.39.584-2.266-.034-.876-.324-1.647-.757-2.186-.434-.539-1.001-.837-1.599-.8-.597.035-1.139.4-1.529.988-.39.588-.618 1.39-.584 2.266Z" />
                    <rect width="3.812" height="1.738" x="-.173" y=".158" fill="#242C39" stroke="#242C39" strokeWidth=".33" rx=".308" transform="matrix(-.99923 -.03917 -.04679 .9989 31.87 23.332)" />
                  </g>
                  <defs><clipPath id="iconHelpCenterMask"><path fill="#fff" d="M3 0h42v42H3z" /></clipPath></defs>
                </svg>
              </div>
            </div>
            <div className="flex justify-between gap-4 items-center mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 shadow-md">
              <div>
                <div>
                  Resources
                </div>
                <div className="text-gray-600 text-xs">Tips to get more out of Float</div>
              </div>
              <div>
                <svg fill="none" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#66AAE7" stroke="#242C39" strokeWidth=".33" d="M11.532 9.165h32.46a2.007 2.007 0 0 1 1.951 2.477L40.471 34.39a2.007 2.007 0 0 1-1.951 1.538H6.06a2.007 2.007 0 0 1-1.951-2.477l5.471-22.75a2.007 2.007 0 0 1 1.952-1.537Z" />
                  <path fill="#66AAE7" stroke="#242C39" strokeWidth=".33" d="M16.51 19.668h6.38c.34 0 .631.243.692.577l4.068 22.26a.704.704 0 0 1-.692.83h-6.38a.704.704 0 0 1-.692-.577l-4.068-22.26a.704.704 0 0 1 .692-.83Z" />
                  <path fill="#D9EDFF" stroke="#242C39" strokeWidth=".33" d="M15.636 19.668h6.38c.342 0 .634.245.694.581l3.947 22.26a.704.704 0 0 1-.694.826h-6.38a.704.704 0 0 1-.694-.581l-3.946-22.26a.704.704 0 0 1 .693-.826Z" />
                  <path fill="#D9EDFF" stroke="#242C39" strokeWidth=".33" d="M10.228 9.165h32.46a2.007 2.007 0 0 1 1.951 2.477L39.168 34.39a2.007 2.007 0 0 1-1.952 1.538H4.756a2.007 2.007 0 0 1-1.95-2.477l5.47-22.75a2.007 2.007 0 0 1 1.952-1.537Z" />
                  <path fill="#EEF7FF" stroke="#242C39" strokeWidth=".33" d="M10.522 10.24h31.641c.736 0 1.279.687 1.107 1.403l-4.263 17.803c-.123.512-.58.873-1.107.873H6.26a1.138 1.138 0 0 1-1.108-1.403l4.263-17.803c.123-.513.58-.874 1.107-.874Z" />
                  <path fill="#EAFDDB" stroke="#242C39" strokeWidth=".33" d="M10.331 16.165h18.113a.27.27 0 0 1 .261.335L25.93 27.63a.27.27 0 0 1-.261.205H7.556a.27.27 0 0 1-.261-.335l2.775-11.13a.27.27 0 0 1 .261-.205Z" />
                  <path fill="#E8D7FF" stroke="#242C39" strokeWidth=".33" d="M29.34 24.119h8.306a.27.27 0 0 1 .258.348l-.968 3.177a.27.27 0 0 1-.258.191h-8.123a.27.27 0 0 1-.262-.334l.786-3.177a.27.27 0 0 1 .261-.205Z" />
                  <path fill="#E5484D" stroke="#242C39" strokeWidth=".33" d="M10.84 12.165h1.341a.27.27 0 0 1 .262.335l-.283 1.13a.27.27 0 0 1-.261.205h-1.343a.27.27 0 0 1-.261-.335l.283-1.13a.27.27 0 0 1 .261-.205Z" />
                  <path fill="#9CE8D9" stroke="#242C39" strokeWidth=".33" d="M13.34 12.165h1.341a.27.27 0 0 1 .262.335l-.283 1.13a.27.27 0 0 1-.261.205h-1.343a.27.27 0 0 1-.261-.335l.283-1.13a.27.27 0 0 1 .261-.205Z" />
                  <path fill="#fff" stroke="#242C39" strokeWidth=".33" d="M16.652 12.165H39.79a.835.835 0 0 1 0 1.67H16.243a.666.666 0 0 1-.654-.792c.098-.51.543-.878 1.063-.878Z" />
                  <path stroke="#242C39" strokeLinecap="round" strokeWidth=".5" d="M30.5 16h9.402M30 18h9.5m-10 2H39m-10 2h9" />
                  <path fill="#66AAE7" stroke="#242C39" strokeWidth=".33" d="M26.363 41.778h3.527c1.11 0 2.008.899 2.008 2.007v.05h-5.535v-2.057Z" />
                  <path fill="#D9EDFF" stroke="#242C39" strokeWidth=".33" d="M17.423 41.778h11.513c1.108 0 2.007.899 2.007 2.007v.05H15.416v-.05c0-1.108.898-2.007 2.007-2.007Z" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between gap-4 items-center mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 shadow-md">
              <div>
                <div>
                  Float Slack Community
                </div>
                <div className="text-gray-600 text-xs">Network and knowledge share</div>
              </div>
              <div>
                <svg fill="none" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <rect width="6.026" height="13.767" x="24.791" y="9.213" fill="#96C7F2" stroke="#242C39" strokeWidth=".33" rx="2.906" />
                  <rect width="6.026" height="13.767" x="16.906" y="24.982" fill="#96C7F2" stroke="#242C39" strokeWidth=".33" rx="2.906" />
                  <rect width="6.026" height="13.767" x="9.165" y="22.98" fill="#96C7F2" stroke="#242C39" strokeWidth=".33" rx="2.906" transform="rotate(-90 9.165 22.98)" />
                  <rect width="6.026" height="13.767" x="24.791" y="31.008" fill="#96C7F2" stroke="#242C39" strokeWidth=".33" rx="2.906" transform="rotate(-90 24.791 31.008)" />
                  <path fill="#96C7F2" stroke="#242C39" strokeWidth=".33" d="M32.724 22.98v-3.12a2.916 2.916 0 0 1 2.917-2.906 2.916 2.916 0 0 1 2.917 2.906v.214a2.906 2.906 0 0 1-2.906 2.906h-2.928Zm-9.888-7.79v-3.12a2.916 2.916 0 0 0-2.917-2.905 2.916 2.916 0 0 0-2.917 2.906v.214a2.906 2.906 0 0 0 2.906 2.905h2.928ZM15 24.982v3.12a2.916 2.916 0 0 1-2.918 2.906 2.915 2.915 0 0 1-2.917-2.906v-.214a2.906 2.906 0 0 1 2.906-2.906h2.928Zm9.934 7.838v3.119a2.916 2.916 0 0 0 2.918 2.906 2.916 2.916 0 0 0 2.917-2.906v-.214a2.906 2.906 0 0 0-2.906-2.906h-2.929Z" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between gap-4 items-center mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 shadow-md">
              <div>
                <div>
                  Product Tour
                </div>
                <div className="text-gray-600 text-xs">Highlight key menu items</div>
              </div>
              <div>
                <svg fill="none" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <rect width="31.1" height="20.3" x="8.4" y="13.1" fill="#D0E8FF" stroke="#242C39" strokeWidth=".3" rx="1.8" />
                  <rect width="31.2" height="20.7" x="8.4" y="12.9" fill="#fff" stroke="#242C39" strokeWidth=".3" rx="1.3" />
                  <path fill="#A5E4D4" stroke="#242C39" strokeWidth=".3" d="M9.8 13H15c.7 0 1.3.5 1.3 1.3v19.3H9.7c-.7 0-1.3-.6-1.3-1.4v-18c0-.7.6-1.3 1.3-1.3Z" />
                  <circle cx="8.9" cy="29.1" r="3.5" fill="#2E5FE8" stroke="#242C39" strokeWidth=".3" />
                  <circle cx="31.4" cy="33.6" r="3.5" fill="#2E5FE8" stroke="#242C39" strokeWidth=".3" />
                  <circle cx="16.5" cy="13.4" r="3.5" fill="#2E5FE8" stroke="#242C39" strokeWidth=".3" />
                  <path stroke="#242C39" strokeWidth=".3" d="M19.5 18.8h15.8M19.5 21h15.8m-15.8 2.3h15.8m-15.8 2.2h15.8m-15.8 2.3h15.8" />
                  <circle cx="41.1" cy="23.1" r="3.5" fill="#2E5FE8" stroke="#242C39" strokeWidth=".3" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between gap-4 items-center mt-2 mb-2 hover:bg-slate-300 rounded-md px-1 py-1 shadow-md">
              <div>
                <div>
                  Keyboard shortcuts
                </div>
                <div className="text-gray-600 text-xs">Faster way to schedule</div>
              </div>
              <div>
                <svg fill="none" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#96C7F2" stroke="#242C39" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".3" d="M40.5 13.1c0-2.7-2.2-4.8-4.9-4.8H20a4.9 4.9 0 0 0-5 4.7v16a5 5 0 0 0 4.9 4.9h15.7a5 5 0 0 0 4.9-5V13.2Z" />
                  <path fill="#E1F0FF" stroke="#242C39" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".3" d="M35.3 20.6a5 5 0 0 0-5-4.9H14.7a4.9 4.9 0 0 0-4.8 5v15.7c0 2.7 2.1 4.9 4.8 4.9h15.8a5 5 0 0 0 4.9-5V20.7Z" />
                  <path stroke="#242C39" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".3" d="M26.9 21a2.4 2.4 0 0 0-2.4 2.4v9.5a2.4 2.4 0 1 0 2.4-2.4h-9.5a2.4 2.4 0 1 0 2.4 2.4v-9.5a2.4 2.4 0 1 0-2.4 2.4h9.5a2.4 2.4 0 1 0 0-4.8Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}

export default HelpMenu;
