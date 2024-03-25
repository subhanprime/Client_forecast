import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useAppSelector } from '../../redux/store/store';
import {
  setDataDays, setDataDaysLine, setDataMonth, setDataWeeks,
} from '../../helper/CalculationsChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Chart(props: { selectedType: any; }) {
  const { isPeopleSelected } = useAppSelector((state) => state.metrics);
  const { isProjectSelected } = useAppSelector((state) => state.metrics);

  const { selectedType } = props;
  const [dataForChart, setDataForChart] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [dataForChartLine, setDataForChartLine] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [dataForChartWeeks, setDataForChartWeeks] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [dataForChartMonths, setDataForChartMonths] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);

  const peopleFilterData = useAppSelector((state) => state?.apiSlice.peopleFilterData);

  function setChartType() {
    if (selectedType === 'Days' && isProjectSelected === false) {
      return dataForChart;
    }
    if (selectedType === 'Days' && isProjectSelected === true && isPeopleSelected === false) {
      return dataForChartLine;
    }
    if (selectedType === 'Month') {
      return dataForChartMonths;
    }
    if (selectedType === 'Weeks') {
      return dataForChartWeeks;
    }

    return '';
  }
  useEffect(() => {
    if (Object.keys(peopleFilterData['legacy.capacity']).length > 0) {
      setDataDays(peopleFilterData, setLoading, setDataForChart);
      setDataDaysLine(peopleFilterData, setLoading, setDataForChartLine);
      setDataWeeks(peopleFilterData, setLoading, setDataForChartWeeks);
      setDataMonth(peopleFilterData, setLoading, setDataForChartMonths);
    }
  }, [peopleFilterData, isPeopleSelected]);

  return (
    loading ? 'LOADING'
      : (
        <div className="h-full" data-testid="mock-chart">
          {(dataForChart !== undefined && isPeopleSelected) || (isPeopleSelected === false && isProjectSelected === false) ? (
            <Bar
              width="100%"
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                  },
                },
              }}
              data={setChartType()}
            />
          ) : (
            // <p>No data available</p>
            <Line
              width="100%"
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                responsive: true,
                scales: {
                  x: {
                    stacked: true,
                  },
                },
              }}
              data={setChartType()}
            />
          )}
        </div>
      )
  );
}

export default Chart;
