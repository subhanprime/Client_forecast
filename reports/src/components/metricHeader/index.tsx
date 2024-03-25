import React from 'react';

interface MetricHeaderProps {
  name: string,
  hour: string,
  percentage?: string,
}
function MetricHeader({
  name, hour, percentage,
}: MetricHeaderProps) {
  return (
    <div className="border-1 px-4 py-2 ">
      <div className="flex text-sm font-normal">
        {`${name}`}
        {'  '}
        <p className="px-3 font-light">
          {`${percentage}${percentage && '%'} `}
        </p>

      </div>
      <div className="flex text-4xl font-normal">
        {`${hour}`}
        <p className="text-[20px] font-medium pt-2">h</p>
      </div>
    </div>
  );
}

export default MetricHeader;
