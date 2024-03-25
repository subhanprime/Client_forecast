import React from 'react';
import {
  Building, Edit3, Eye, Globe, User, XCircle, Users, Folder,
} from 'lucide-react';
import { DropdownData } from '../components/dropdown/DynamicDropdown';

export interface FeatureItem {
  icon: JSX.Element;
  heading: string;
  substring: string;
  data: DropdownData[];
  isToggle?:boolean;
  text?:string;
}
export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const fieldOptions = [
  {
    name: 'Role', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Department', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Tags', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Type', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Hourly rate', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Public holidays', icon: null, symbol: null, subtext: '',
  },
];
export const roleOptions = [
  {
    name: 'CEO', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Developer', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Devops', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Director', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Manager', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'QA', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Senior Developer', icon: null, symbol: null, subtext: '',
  },
];
export const departmentOptions = [
  {
    name: 'Engineering', icon: null, symbol: null, subtext: '',
  },

];
export const typeOptions = [
  {
    name: 'Employee', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Contractor', icon: null, symbol: null, subtext: '',
  },
  {
    name: 'Placeholder', icon: null, symbol: null, subtext: '',
  },
];

export const ViewData:DropdownData[] = [
  {
    name: 'Everyone',
    icon: (size) => <Globe size={size || 15} />,
    symbol: null,
    subtext: 'All users',
  },
  {
    name: 'Departments',
    icon: (size) => <Building size={size || 15} />,
    symbol: null,
    subtext: 'Whole Dep',
  },
  {
    name: 'Themselves',
    icon: (size) => <User size={size || 15} />,
    symbol: null,
    subtext: 'Just Themselves',
  },
];
export const EditData:DropdownData[] = [
  {
    name: 'Themselves',
    icon: (size) => <User size={size || 15} />,
    symbol: null,
    subtext: 'Just Themselves',
  },
  {
    name: 'No One',
    icon: (size) => <XCircle size={size || 15} />,
    symbol: null,
    subtext: 'No other people',
  },
];

export const MemberOptions:FeatureItem[] = [
  {
    icon: <Eye />,
    heading: 'Can View',
    substring: 'Who they can see on the schedule',
    data: ViewData,
  },
  {
    icon: <Edit3 />,
    heading: 'Can edit',
    substring: 'Who they can edit on schedule!',
    data: EditData,

  },
];
export const Manager:FeatureItem[] = [
  {
    icon: <Eye />,
    heading: 'Can View',
    substring: 'Who they can see on the schedule',
    data: ViewData,
  },
  {
    icon: <Users />,
    heading: 'People Manager',
    substring: 'Can schedule and approve time off requests',
    data: [],
    isToggle: true,
  },
  {
    icon: <Folder />,
    heading: 'Project Manager',
    substring: 'Can schedule tasks and manage projects',
    data: [],
    isToggle: true,
  },
];
export const Admin:FeatureItem[] = [
  {
    icon: <Eye />,
    heading: 'Can View',
    substring: 'Who they can see on the schedule',
    data: [],
    text: 'EveryOne',
  },
  {
    icon: <Globe />,
    heading: 'Manages',
    substring: '',
    data: [],
    isToggle: true,
    text: 'All people, projects and settings',
  },
];
