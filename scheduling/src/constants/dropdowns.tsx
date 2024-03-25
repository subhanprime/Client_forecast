import {
  Layers, Layers2, Layers3, CalendarCheck2, AlarmClock, LayoutPanelLeft,
} from 'lucide-react';
import React from 'react';
import { DateRangeEnum } from './enums';

export interface DropdownData {
  id?:number | string;
  name: string ;
  icon: ((size:number) => JSX.Element) | null;
  symbol: string | null
}

export const SchedulerDropdown:DropdownData[] = [
  {
    name: 'Schedule',
    icon: null,
    symbol: null,
  },
  {
    name: 'Project Plan',
    icon: null,
    symbol: null,

  },
];
export const TimeSpanDropdown:DropdownData[] = [
  {
    name: 'Days',
    icon: null,
    symbol: null,

  },
  {
    name: 'Weeks',
    icon: null,
    symbol: null,

  },
  {
    name: 'Months',
    icon: null,
    symbol: null,

  },
];
export const GridDropdownData:DropdownData[] = [
  {
    name: 'Compact',
    icon: (size = 12) => <Layers size={size} />,
    symbol: null,

  },
  {
    name: 'Comfortable',
    icon: (size = 12) => <Layers3 size={size} />,
    symbol: null,

  },
  {
    name: 'Spacious',
    icon: (size = 12) => <Layers2 size={size} />,
    symbol: null,

  },
];
export const AddButtonDropData:DropdownData[] = [
  {
    name: 'Alocation Time',
    icon: (size = 12) => <LayoutPanelLeft size={size} />,
    symbol: 'T',

  },
  {
    name: 'Log Time',
    icon: (size = 12) => <AlarmClock size={size} />,
    symbol: 'G',

  },
  {
    name: 'Add Time Off',
    icon: (size = 12) => <CalendarCheck2 size={size} />,
    symbol: 'I',

  },
];
export const ExternalLinksData:DropdownData[] = [
  {
    name: 'Email this schedule',
    icon: null,
    symbol: null,

  },
  {
    name: 'Export (.CSV for Excel)',
    icon: null,
    symbol: null,

  },
  {
    name: 'Print',
    icon: null,
    symbol: null,
  },
];

export const SideBarSortItems:DropdownData[] = [
  {
    name: 'Name',
    icon: null,
    symbol: null,

  },
  {
    name: 'Role',
    icon: null,
    symbol: null,

  },
  {
    name: 'Department',
    icon: null,
    symbol: null,

  },
];
export const SideBarProjectSortItems:DropdownData[] = [
  {
    name: 'Name',
    icon: null,
    symbol: null,

  },

];
export const DateRangeDrop:DropdownData[] = [
  {
    name: DateRangeEnum.Week,
    icon: null,
    symbol: null,

  },
  {
    name: DateRangeEnum.Next,
    icon: null,
    symbol: null,

  },
  {
    name: DateRangeEnum.Next2,
    icon: null,
    symbol: null,

  },
];
export const DateRangeExportDrop:DropdownData[] = [
  {
    name: DateRangeEnum.Next12,
    icon: null,
    symbol: null,

  },
  {
    name: DateRangeEnum.Week,
    icon: null,
    symbol: null,

  },
  {
    name: DateRangeEnum.Month,
    icon: null,
    symbol: null,
  },
  {
    name: DateRangeEnum.Quarter,
    icon: null,
    symbol: null,
  },
  {
    name: DateRangeEnum.Year,
    icon: null,
    symbol: null,
  },
  {
    name: DateRangeEnum.LWeek,
    icon: null,
    symbol: null,

  },
  {
    name: DateRangeEnum.LMonth,
    icon: null,
    symbol: null,
  },
  {
    name: DateRangeEnum.LQuarter,
    icon: null,
    symbol: null,
  },
  {
    name: DateRangeEnum.LYear,
    icon: null,
    symbol: null,
  },
];
export const DateRangeHeaderDrop:DropdownData[] = [

  {
    name: DateRangeEnum.Week,
    icon: null,
    symbol: null,

  },
  {
    name: DateRangeEnum.LWeek,
    icon: null,
    symbol: null,

  },
  {
    name: DateRangeEnum.Month,
    icon: null,
    symbol: null,
  },

  {
    name: DateRangeEnum.LMonth,
    icon: null,
    symbol: null,
  },

];
