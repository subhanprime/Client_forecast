import React from 'react';
import MetricDetails from '../metricDetail';
import MetricHeader from '../metricHeader';
import { useAppSelector } from '../../redux/store/store';
import { scheduledColor } from '../../constants/colors';

function ScheduledMetric() {
  const totalCapacity = useAppSelector((state) => state?.metrics.totalCapacity);
  const totalScheduled = useAppSelector((state) => state?.metrics.totalScheduled);
  const totalBillable = useAppSelector((state) => state?.metrics.totalBillable);
  const totalNonBillable = useAppSelector((state) => state?.metrics.totalNonBillable);
  const totalTimeOff = useAppSelector((state) => state?.metrics.totalTimeOff);
  const totalOvertime = useAppSelector((state) => state?.metrics.totalOvertime);
  const totalTentative = useAppSelector((state) => state?.metrics.totalTentative);

  return (
    <div className="border-1 rounded-md flex h-[100px]">
      <div className="flex border-2 w-[15%] justify-between">
        <MetricHeader data-testid="metric-header" name="Capacity" percentage="" hour={`${totalCapacity}`} />
      </div>
      <div className="flex border-2 w-[50%] justify-between">
        <MetricHeader name="Scheduled" percentage={`${Math.round((totalScheduled / totalCapacity) * 100)}`} hour={`${totalScheduled}`} />
        <div className="border-1 flex flex-col justify-end text-[15px] pb-3 pr-[10%]">
          <MetricDetails name="Billable" hour={`${totalBillable}`} percentage="100" color={scheduledColor} />
          <MetricDetails name="Non-billable" hour={`${totalNonBillable}`} percentage="0" color="#60EDE5" />
          {totalTentative !== 0 && <MetricDetails name="Non-billable" hour={`${totalTentative}`} percentage="0" color="#60EDE5" />}

        </div>
      </div>
      <div className="flex border-2 w-[15%] justify-between">
        <MetricHeader data-testid="metric-header" name="Unscheduled" percentage={`${Math.round(((totalCapacity - totalScheduled) / totalCapacity) * 100)}`} hour={`${totalCapacity - totalScheduled}`} />
      </div>
      <div className="flex border-2 w-[10%] justify-between">
        <MetricHeader name="Time Off" percentage="" hour={`${totalTimeOff}`} />
      </div>
      <div className="flex border-2 w-[10%] justify-between">
        <MetricHeader name="Overtime" percentage="" hour={`${totalOvertime}`} />
      </div>
    </div>
  );
}

export default ScheduledMetric;
