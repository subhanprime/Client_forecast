import React from 'react';
import MetricDetails from '../metricDetail';
import MetricHeader from '../metricHeader';
import { scheduledColor } from '../../constants/colors';
import { useAppSelector } from '../../redux/store/store';

function LoggedScheduledMetric() {
  const { isPeopleSelected } = useAppSelector((state) => state.metrics);
  const { isProjectSelected } = useAppSelector((state) => state.metrics);

  const totalScheduled = useAppSelector((state) => state?.metrics.totalScheduled);
  const totalBillable = useAppSelector((state) => state?.metrics.totalBillable);
  const totalNonBillable = useAppSelector((state) => state?.metrics.totalNonBillable);
  return (
    <div className="border-1 rounded-md justify-between flex h-[110px]">
      <div className="flex border-2 w-[100%] justify-between">
        <MetricHeader name={!isProjectSelected ? 'Scheduled' : 'Budget'} percentage="" hour={!isProjectSelected ? `${totalScheduled}` : 'No Budget'} />
        {!isProjectSelected && (
          <div className="border-1 flex flex-col justify-end text-[15px] pb-3 pr-[10%]">
            <MetricDetails name="Billable" hour={`${totalBillable}`} percentage="" color={scheduledColor} />
            <MetricDetails name="Non-billable" hour={`${totalNonBillable}`} percentage="" color={scheduledColor} />
          </div>
        )}

      </div>
      <div className="flex border-2 w-[100%] justify-between">
        <MetricHeader name={!isProjectSelected ? 'Logged' : 'Billable'} percentage="" hour={`${totalScheduled}`} />
        <div className="border-1 flex flex-col justify-end text-[15px] pb-3 pr-[10%]">
          {
            !isProjectSelected && (
              <>
                <MetricDetails data-testid="billable" name="Billable" hour="0" percentage="" color="#9B8CFF" />
                <MetricDetails name="Non-billable" hour={`${totalNonBillable}`} percentage="" color="#D6D1F8" />
              </>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default LoggedScheduledMetric;
