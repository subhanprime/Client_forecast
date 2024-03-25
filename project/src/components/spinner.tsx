import React from 'react';

function Spinner({ width, height, border }: any) {
  return (
    <div
      className={`inline-block ${width} ${height} animate-spin rounded-full border-2 ${border} border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate- [spin_1.5s_linear_infinite]`}
      role="status"
    />
  );
}

export default Spinner;
