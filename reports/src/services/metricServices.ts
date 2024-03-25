import axios from 'axios';
import { useAppSelector } from '../redux/store/store';
import PeopleFilter from '../interface/peopleFilterInterface';

export const getTotalCapacity = async (peopleFilterData: PeopleFilter) => {
  let legacyCapacityArray:any[] = [];
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/people_filter`);
    legacyCapacityArray = Object.entries(peopleFilterData['legacy.capacity']).map(([key, value]) => ({ [key]: value }));
    return legacyCapacityArray;
  } catch (e) {
    return [];
  }
};

export const getTotalScheduledHours = async (peopleFilterData: PeopleFilter) => {
  let totalScheduleHoursList:any[] = [];
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/people_filter`);
    totalScheduleHoursList = peopleFilterData['legacy.totals'];
    return totalScheduleHoursList;
  } catch (e) {
    return [];
  }
};

export const getTotalOvertime = async (peopleFilter: PeopleFilter) => {
  let legacyOvertimeArray:any[] = [];

  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/people_filter`);
    legacyOvertimeArray = Object.entries(peopleFilter['legacy.overtime']).map(([key, value]) => ({ [key]: value }));
    return legacyOvertimeArray;
  } catch (e) {
    return [];
  }
};

export const getTotalTimeOffHours = async (peopleFilter: PeopleFilter) => {
  let totalTimeOffHoursList:any[] = [];
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/people_filter`);
    totalTimeOffHoursList = peopleFilter['legacy.timeoff'];
    return totalTimeOffHoursList;
  } catch (e) {
    return [];
  }
};
