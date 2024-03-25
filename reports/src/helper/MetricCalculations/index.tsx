import PeopleFilter from '../../interface/peopleFilterInterface';
import { getTotalCapacity, getTotalOvertime } from '../../services/metricServices';

export const calculateCapacityTotal = async (peopleFilter: PeopleFilter) => {
  let totalCapacity = 0;
  const capacity = await getTotalCapacity(peopleFilter);
  for (const entry of capacity) {
    const key = Object.keys(entry)[0];
    const value = entry[key];
    totalCapacity += value;
  }
  return totalCapacity;
};

export const calculateOvertimeTotal = async (peopleFilter: PeopleFilter) => {
  let totalOvertime = 0;
  const overtime = await getTotalOvertime(peopleFilter);
  for (const entry of overtime) {
    const key = Object.keys(entry)[0];
    const value = entry[key];
    totalOvertime += value.total;
  }
  return totalOvertime;
};
