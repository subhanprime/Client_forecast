import React, { useEffect, useState } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { makeTabs } from '../../constants/tabIndex';
import { useAppSelector } from '../../redux/store/store';
import TableComponent from '../tables/tableComponent';

function UnderlineTabs() {
  const [activeTab, setActiveTab] = React.useState('people');
  const selectedFilterType = useAppSelector((state) => state?.tableSlice.filterSelectedType);
  const [tabIndexes, setTabindexes] = useState(makeTabs(true, selectedFilterType.type));
  const { isPeopleSelected } = useAppSelector((state) => state.metrics);

  useEffect(() => {
    const tabs = makeTabs(isPeopleSelected, selectedFilterType.type);
    setTabindexes(tabs);
    setActiveTab(tabs[0].value);
  }, [isPeopleSelected, selectedFilterType]);

  return (
    <div className="flex items-center justify-center">
      <Tabs className="w-[100%]">
        <TabsHeader
          className="flex justify-between w-[60%] font-medium text-[#868B90] text-[16px]"
          indicatorProps={{
            className:
          'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
          }}
        >
          {tabIndexes.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`${
                activeTab === value
                  ? 'font-semibold border-b-[3px] text-gray-800 border-[#363D46] pb-1 h-9 text-[13px] '
                  : ' pb-3 h-10 text-[13px]'
              } cursor-pointer font-semibold`}
            >
              {label}

            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabIndexes.map(({ value, component }) => (
            <TabPanel
              key={value}
              value={value}
              data-testid={`tab-panel-${value}`}
            >
              {/* {component} */}
              {React.cloneElement(component, { activeTab })}
              ,
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>

  );
}

export default UnderlineTabs;
