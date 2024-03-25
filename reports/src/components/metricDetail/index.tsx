import React from 'react';

interface MetricDetailsProps {
  name: string,
  hour: string,
  percentage: string,
  color: string,
}

function MetricDetails({
  name, hour, percentage, color,
}: MetricDetailsProps) {
  return (
    <div className="flex items-center justify-between px-3">
      <div className="flex px-10">
        <div className="w-[15px] h-[15px] rounded-sm m-1" style={{ backgroundColor: color }} />
        <p>
          {`${name}`}
        </p>
      </div>
      <div className="flex justify-between w-[100px]">
        <p className="px-4">
          {`${hour}h`}
        </p>
        <p className="bg-slate-300px-2">
          {' '}
          {`${percentage}${percentage && '%'} `}
        </p>
      </div>
    </div>
  );
}

export default MetricDetails;
