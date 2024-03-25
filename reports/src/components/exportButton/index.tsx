import React, { useEffect, useRef, useState } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import button from '@material-tailwind/react/theme/components/button';
import { type } from '@testing-library/user-event/dist/type';
import { text } from 'stream/consumers';
import { prepareChartCSV, preparePeopleCSV } from '../../helper/peopleCSVPreperation';
import { ExportSvg } from '../../constants/svg';
import { useAppSelector } from '../../redux/store/store';

function ExportButton(props: { dropdownList: any; defaultSelected:string;
  setSelectedState: React.Dispatch<React.SetStateAction<string>> }) {
  const {
    dropdownList, defaultSelected, setSelectedState,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelectedValue, setcurrentSelectedValue] = useState('');
  const [peopleCSV, setpeopleCSV] = useState([]);
  const [chartCSV, setChartCSV] = useState([]);
  const [dataCSV, setDataCSV] = useState([]);
  const [commonCSV, setCommonCSV] = useState([]);
  const csvLinkRef = useRef<
  CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);
  const catMenu = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // setcurrentSelectedValue('');
  };
  const peopleFilterData = useAppSelector((state) => state?.apiSlice.peopleFilterData);

  const exportChartData = async () => {
    setCommonCSV([]);
    prepareChartCSV(setCommonCSV, peopleFilterData);
    if (commonCSV.length > 0 && currentSelectedValue === 'Export chart data') {
      csvLinkRef?.current?.link.click();
      setCommonCSV([]);
    }
    // prepareChartCSV().then((chartArrayCSV:any) => {
    //   // Use chartArrayCSV as needed
    //   setDataCSV(chartArrayCSV);
    //   csvLinkRef?.current?.link.click();
    // }).catch((error) => {
    //   // Handle errors if any
    // });
  };

  const exportTableData = async () => {
    setCommonCSV([]);
    preparePeopleCSV(setCommonCSV, peopleFilterData);
    if (commonCSV.length > 0 && currentSelectedValue === 'Export table data') {
      csvLinkRef?.current?.link.click();
      setCommonCSV([]);
    }
  };

type OptionKey = 'Export table data' | 'Export chart data';

const optionToFunctionMap: Record<OptionKey, () => void> = {
  'Export chart data': exportChartData,
  'Export table data': exportTableData,
};
const closeDropdown = () => {
  setIsOpen(false);
};

const handleOptionClick = (value: OptionKey) => {
  setcurrentSelectedValue(value);
  setSelectedState(value);
  if (optionToFunctionMap[value]) {
    optionToFunctionMap[value](); // Call the associated function
  }
  closeDropdown();
};

const closeOpenMenus = (e: MouseEvent) => {
  if (catMenu.current && isOpen && !catMenu.current.contains(e.target as Node)) {
    setIsOpen(false);
  }
};

useEffect(() => {
  // Add event listener when component mounts
  document.addEventListener('click', closeOpenMenus);
  // Clean up the event listener when component unmounts
  return () => {
    document.removeEventListener('click', closeOpenMenus);
  };
}, [isOpen]);
// const checkSelectedType = (selectedValue:string) => {
//   if(selectedValue==='Export chart data' && selectedValue)
// };
return (
  <div ref={catMenu} className="relative rounded-md z-50 pr-12">
    <button
      type="button"
      data-testid="dropdown-days"
      className="border-slate-300 text-#4E575F hover:border-blue-500
        focus:ring-1 focus:outline-none focus:ring-blue-300
        border-2 px-2.5 py-0.5 border-gray
        font-small rounded-md text-sm inline-flex"
      onClick={toggleDropdown}
    >
      <div className="flex gap-2 justify-between items-center">
        <ExportSvg height="16" width="16" />
        <span className="text-sm">Export</span>
      </div>

    </button>
    {isOpen && (
      <div data-testid="dropdown-menu" className="w-[220px] z-10 origin-top-right absolute transform -translate-x-40 mt-2 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <ul className="p-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {dropdownList.map((name:OptionKey) => (
            <li>
              <CSVLink
                // data={currentSelectedValue === 'Export chart data' ? dataCSV : peopleCSV}
                data={commonCSV}
                // data={dataCSV}
                filename="file.csv"
                ref={csvLinkRef}
                data-testid={`csv-link-${name}`}
              />
              <button
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full flex justify-start"
                type="button"
                color="primary"
                onClick={() => {
                  handleOptionClick(name);
                }}
                data-testid={`csv-link-${name}`}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
}

export default ExportButton;
