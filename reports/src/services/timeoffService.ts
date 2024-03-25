import axios from 'axios';
import PeopleTableInterface from '../components/tables/tableComponent/propleInterface';
import { ProjectData } from '../components/tables/tableComponent/projectInterface';
import { useAppSelector } from '../redux/store/store';
import HolidayInterface from '../interface/timeOffInterface';
import People from '../interface/peopleListInterface';
import PeopleFilter from '../interface/peopleFilterInterface';

// export const getTimeOffDataMockoon = async (): Promise<any[]> => new Promise(async (resolve, reject) => {
//   try {
//     const { data } = await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/timeoff_table_data`);
//     resolve(data);
//   } catch (e) {
//     reject(e);
//   }
// });

export const getTimeOffDataManually = (peopleData:People[], peopleFilterData:PeopleFilter): Promise<any[]> => new Promise(async (resolve, reject) => {
  // const peopleData = useAppSelector((state) => state?.apiSlice.peopleData);
  const timeOffData: HolidayInterface[] = [];
  try {
    // const { data } = await axios
    //   .get(`${process.env.REACT_APP_BACKEND_URL}/people_filter`);

    const timeOffList = peopleFilterData['legacy.timeoff'];
    timeOffList.forEach((e: any) => {
      let totalHours = 0;
      let totalDays = 0;
      const parentObject = {
        ...e, name: e.name, hours: 0, day: 0, people: [],
      };
      const dataArray = Object.entries(e.people);
      const peopleList: any[] = [];
      peopleData[0].forEach((pd:any) => {
        const updatedPeople = { ...pd, hours: 0, days: 0 };
        dataArray.forEach((da:any) => {
          if (parseInt(da[0], 10) === parseInt(pd.people_id, 10)) {
            Object.assign(updatedPeople, { hours: da[1].hours, days: da[1].days });
          }
        });
        peopleList.push(updatedPeople);
      });
      parentObject.people = peopleList;
      parentObject.people.forEach((po:any) => {
        totalHours += po.hours;
        totalDays += po.days;
      });
      parentObject.hours = totalHours;
      parentObject.days = totalDays;
      timeOffData.push(parentObject);
      // setTableData(timeOffData);
      // return timeOffData;
    });
    resolve(timeOffData);
  } catch (e) { /* empty */ }
  // return timeOffData;
});
