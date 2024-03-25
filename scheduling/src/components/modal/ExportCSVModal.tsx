import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import _ from 'lodash';
import Modal from './Modal';
import DateRangePicker from '../datapicker/DateRangePicker';
import { DateRangeExportDrop } from '../../constants';
import { useAppSelector } from '../../app/hooks';
import helpers from '../../utils/helpers';

interface ExportModalProps {
  visibility:boolean;
  closeModal: ()=>void;

}

function ExportCSVModal({ visibility, closeModal }:ExportModalProps) {
  const { peopleTasks, projects } = useAppSelector((state) => state.sheduler);
  const [isDaySelected, setIsDaySelected] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);

  const handleDateRangeChange = (range:DateRange | undefined) => {
    setSelectedDateRange(range);
  };

  const createCSV = () => {
    if (selectedDateRange && selectedDateRange.from && peopleTasks && projects) {
      const dates = helpers.generateDateRange(
        selectedDateRange?.from,
        selectedDateRange.to ? selectedDateRange.to : selectedDateRange.from,
        isDaySelected ? 'days' : 'weeks',
      );
      const data = [['Name', 'Role', 'Department', 'Project', 'Client', 'Notes'].concat(dates.map((date) => date.format('DD-MMM-YY')))];
      data.push([]);

      // console.log(getIntersectionCount('2023-12-13', '2023-12-13', moment('2023-12-11')));
      peopleTasks.forEach((person) => {
        const grouped = _.groupBy(person.tasks, 'project_id');
        const keys = Object.keys(grouped);
        const sched = ['SCHEDULED', '', '', '', '', ''].concat(dates.map(() => '0'));
        const capa = ['CAPACITY', '', '', '', '', ''].concat(dates.map(() => (isDaySelected ? '8' : '40')));
        if (keys.length === 0) {
          const tempData = [person.name, person.job_title
            ? person.job_title : '', person.department ? person.department : '', '', '', ''].concat(dates.map(() => '0'));
          data.push(tempData);
        }
        const times = _.zipObject(
          dates.map((date) => date.format('DD-MMM-YY')),
          dates.map(() => ({ sched: 0, cap: isDaySelected ? 8 : 40 })),
        );
        const headersDiff = sched.length - dates.length;
        keys.forEach((key) => {
          const proj = projects.get(+key);
          const tempData = [person.name, person.job_title ? person.job_title : '', person.department ? person.department : '', proj ? proj.name : '', '', ''];
          dates.forEach((date, index) => {
            let time = 0;
            grouped[key].forEach((task) => {
              if (!isDaySelected) {
                const count = helpers.getIntersectionCount(task.start_date, task.end_date, date);
                time += count * task.hours;
              } else if (date.isSameOrAfter(task.start_date)
              && date.isSameOrBefore(task.end_date)) {
                time = task.hours;
              }
            });
            times[date.format('DD-MMM-YY')].sched += time;
            times[date.format('DD-MMM-YY')].cap -= time;
            sched[headersDiff + index] = `${times[date.format('DD-MMM-YY')].sched}`;
            capa[headersDiff + index] = `${times[date.format('DD-MMM-YY')].cap}`;
            tempData.push(`${time}`);
          });
          data.push(tempData);
        });

        data.push(sched, capa, []);
      });
      helpers.handleDownload(data.map((row) => row.join(',')).join('\n'));
    }
  };

  return (
    <Modal visibility={visibility} closeModal={closeModal} place="top">
      <div className="flex flex-col gap-8 px-5 py-7">
        <div className="flex  w-full justify-between ">
          <div className="text-2xl font-medium text-black/70">
            Export .CSV
          </div>

        </div>
        <div className="w-full rounded-md flex flex-col gap-2">
          <div className="text-xs font-semibold text-black/60">Date range</div>

          <DateRangePicker
            DateRangeDrop={DateRangeExportDrop}
            onRangeUpdate={handleDateRangeChange}
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div className="text-xs font-semibold text-black/60">View By</div>
          <div className="flex   bg-gray-200/50 text-black/50 rounded cursor-pointer">
            <div
              onClick={() => setIsDaySelected(true)}
              className={`rounded-l px-4 py-2 hover:bg-gray-200 ${isDaySelected ? 'bg-indigo-200 text-indigo-500 hover:bg-indigo-300' : ''}`}
            >
              Day

            </div>
            <div
              onClick={() => setIsDaySelected(false)}
              className={`rounded-r px-4 py-2 hover:bg-gray-200 ${!isDaySelected ? 'bg-indigo-200 text-indigo-500 hover:bg-indigo-300' : ''}`}
            >
              Week

            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => createCSV()} type="button" className="px-3 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 rounded text-white transition-all duration-200">
            Export

          </button>
          <button onClick={() => closeModal()} type="button" className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded ">Cancel</button>
        </div>

      </div>

    </Modal>
  );
}

export default ExportCSVModal;
