import { scheduledColor } from '../../constants/colors';
import PeopleFilter from '../../interface/peopleFilterInterface';

function formatDate(inputDate: string) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const [year, month, day] = inputDate.split('-');
  const formattedDate = `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]}`;
  const formattedMonth = `${months[parseInt(month, 10) - 1]}`;

  return { formattedDate, formattedMonth };
}

export const setDataDays = (
  peopleFilterData:PeopleFilter,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDataForChart: React.Dispatch<any>,
) => {
  const label: string[] = [];
  const dataSet: { labels: string; data: (string | number)[]; backgroundColor: string; }[] = [];
  const dataValues: number[] = [];
  const dataValuesMax: number[] = [];
  setLoading(true);
  const charts = peopleFilterData.chart;
  if (charts.datapoints.length > 0) {
    charts.datapoints.forEach((e: { date: string; billable: number; capacity: number; }) => {
      const formated = formatDate(e.date);
      label.push(formated.formattedDate);
      dataValues.push(e.billable);
      dataValuesMax.push(e.capacity);
    });
  }
  setDataForChart({
    labels: label,
    datasets: [
      {
        barPercentage: 5,
        barThickness: (900 / label.length),
        maxBarThickness: (900 / label.length),
        minBarLength: 2,
        data: dataValues,
        backgroundColor: scheduledColor,
      },
      {
        data: dataValuesMax,
        backgroundColor: '#FFFFFF',
        barPercentage: 5,
        barThickness: (900 / label.length),
        maxBarThickness: (900 / label.length),
        minBarLength: 2,
        borderColor: 'rgba(0,0,0,0.6)',
        borderWidth: {
          top: 3,
          right: 0.3,
          bottom: 0,
          left: 0.3,
        },
      },
    ],
  });
  setLoading(false);
};

export const setDataWeeks = (
  peopleFilterData:PeopleFilter,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDataForChartWeeks: React.Dispatch<any>,
) => {
  setLoading(true);
  const charts = peopleFilterData.chart;
  if (charts.datapoints.length > 0) {
    const setLabelWeek: string[] = [];
    const setBillableWeek: number[] = [];
    const setCapacityWeek: number[] = [];

    let currentWeek: number | null = null;
    let billable = 0;
    let capacity = 0;

    // WEEKS DATA
    charts.datapoints.forEach((datapoint: { week: number | null; date: string; billable: number; capacity: number; }, index: number) => {
      if (index === 0 || datapoint.week !== currentWeek) {
        const formatedDate = formatDate(datapoint.date);
        setLabelWeek.push(formatedDate.formattedDate);
        if (index !== 0) {
          setBillableWeek.push(billable);
          setCapacityWeek.push(capacity);
        }
        currentWeek = datapoint.week;
        billable = 0;
        capacity = 0;
      }

      billable += datapoint.billable;
      capacity += datapoint.capacity;

      if (index === charts.datapoints.length - 1) {
        setBillableWeek.push(billable);
        setCapacityWeek.push(capacity);
      }
    });
    setDataForChartWeeks({
      labels: setLabelWeek,
      datasets: [
        {
          barPercentage: 5,
          barThickness: (900 / setLabelWeek.length),
          maxBarThickness: (900 / setLabelWeek.length),
          minBarLength: 2,
          data: setBillableWeek,
          backgroundColor: scheduledColor,
        },
        {
          data: setCapacityWeek,
          backgroundColor: '#FFFFFF',
          //   barPercentage: 5,
          barThickness: (900 / setLabelWeek.length),
          maxBarThickness: (900 / setLabelWeek.length),
          minBarLength: 2,
          borderColor: 'rgba(0,0,0,0.6)',
          borderWidth: {
            top: 3,
            right: 0.3,
            bottom: 0,
            left: 0.3,
          },
        },
      ],
    });
  }
  setLoading(false);
};

export const setDataMonth = (
  peopleFilterData:PeopleFilter,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDataForChartMonths: React.Dispatch<any>,
) => {
  setLoading(true);
  const charts = peopleFilterData.chart;
  if (charts.datapoints.length > 0) {
    const setLabelMonth: string[] = [];
    const setBillableMonth: number[] = [];
    const setCapacityMonth: number[] = [];
    let currentMonth = 0;
    let billableMonth = 0;
    let capacityMonth = 0;
    for (let i = 0; i < charts.datapoints.length; i += 1) {
      if (currentMonth !== charts.datapoints[i].month) {
        currentMonth = charts.datapoints[i].month;
        const formated = formatDate(charts.datapoints[i].date);
        setLabelMonth.push(formated.formattedMonth);
      }
      if (charts.datapoints[i + 1] !== undefined) {
        if (charts.datapoints[i + 1].month === currentMonth) {
          billableMonth += charts.datapoints[i].billable;
          capacityMonth += charts.datapoints[i].capacity;
        } else {
          setBillableMonth.push(billableMonth);
          setCapacityMonth.push(capacityMonth);
          billableMonth = 0;
          capacityMonth = 0;
          billableMonth += charts.datapoints[i].billable;
          capacityMonth += charts.datapoints[i].capacity;
        }
      } else {
        setBillableMonth.push(billableMonth);
        setCapacityMonth.push(capacityMonth);
      }
    }
    setDataForChartMonths({
      labels: setLabelMonth,
      datasets: [
        {
          barPercentage: 5,
          barThickness: (900 / setLabelMonth.length),
          maxBarThickness: (900 / setLabelMonth.length),
          minBarLength: 2,
          data: setBillableMonth,
          backgroundColor: scheduledColor,
        },
        {
          data: setCapacityMonth,
          backgroundColor: '#FFFFFF',
          barPercentage: 5,
          barThickness: (900 / setLabelMonth.length),
          maxBarThickness: (900 / setLabelMonth.length),
          minBarLength: 2,
          borderColor: 'rgba(0,0,0,0.6)',
          borderWidth: {
            top: 3,
            right: 0.3,
            bottom: 0,
            left: 0.3,
          },
        },
      ],
    });
  }
  setLoading(false);
};

export const setDataDaysLine = (
  peopleFilterData:PeopleFilter,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDataForChartLine: React.Dispatch<any>,
) => {
  const label: string[] = [];
  const dataSet: { labels: string; data: (string | number)[]; backgroundColor: string; }[] = [];
  const dataValues: number[] = [];
  const dataValuesMax: number[] = [];
  setLoading(true);
  const charts = peopleFilterData.chart;
  if (charts.datapoints.length > 0) {
    let totalBillable = 0;
    charts.datapoints.forEach((e: { date: string; billable: number; capacity: number; }) => {
      const formated = formatDate(e.date);
      label.push(formated.formattedDate);
      totalBillable += e.billable;
      dataValues.push(totalBillable);
      dataValuesMax.push(e.capacity);
    });
  }
  // console.log('first', dataValues);
  setDataForChartLine({
    labels: label,
    datasets: [
      {
        barPercentage: 5,
        barThickness: (900 / label.length),
        maxBarThickness: (900 / label.length),
        minBarLength: 2,
        data: dataValues,
        backgroundColor: scheduledColor,
      },
    ],
  });
  setLoading(false);
};
