import React from 'react';

export const getHeaderNameSection = (props:any, name:string) => (
  <div
    role="button"
    className={`px-1 ${props.header.column.getCanSort() ? 'cursor-pointer' : ''} justify-start flex`}
    tabIndex={0}
    onClick={props.header.column.getToggleSortingHandler()}
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        props?.header?.column?.getToggleSortingHandler();
      }
    }}
  >
    {name}
  </div>
);
