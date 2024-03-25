import React from 'react';
import MetricDetails from '../metricDetail';
import MetricHeader from '../metricHeader';

function PastAndFutureMetric() {
  return (
    <div className="border-1 rounded-md flex h-[100px]">
      <div className="flex border-2 w-[15%] justify-between">
        <MetricHeader name="Capacity" percentage="" hour="2148" />
      </div>
      <div className="flex border-2 w-[50%] justify-between">
        <MetricHeader name="Past logged + Future scheduled" percentage="11" hour="264" />
        <div className="border-1 flex flex-col justify-end text-[15px] pb-3 pr-[10%]">
          <MetricDetails name="Billable" hour="264" percentage="100" color="#9B8CFF" />
          <MetricDetails name="Non-billable" hour="0" percentage="0" color="#9B8CFF" />
        </div>
      </div>
      <div className="flex border-2 w-[15%] justify-between">
        <MetricHeader name="Capacity" percentage="89" hour="2148" />
      </div>
      <div className="flex border-2 w-[10%] justify-between">
        <MetricHeader name="Time Off" percentage="" hour="0" />
      </div>
      <div className="flex border-2 w-[10%] justify-between">
        <MetricHeader name="Overtime" percentage="" hour="0" />
      </div>
    </div>
  );
}

export default PastAndFutureMetric;
