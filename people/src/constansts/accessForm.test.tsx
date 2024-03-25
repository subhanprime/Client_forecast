// import { DropdownData } from '../components/dropdown/DynamicDropdown';
// import {
//   ViewData,
//   MemberOptions,
//   EditData,
// } from './accessForm'; // Assuming your constants file is in the same directory

// describe('Constants', () => {
//   describe('ViewData', () => {
//     it('should contain valid data', () => {
//       ViewData.forEach((item) => {
//         expect(item).toHaveProperty('name');
//         expect(item).toHaveProperty('icon');
//         expect(item).toHaveProperty('subtext');
//       });
//     });
//   });

//   describe('EditData', () => {
//     it('should contain valid data', () => {
//       EditData.forEach((item) => {
//         expect(item).toHaveProperty('name');
//         expect(item).toHaveProperty('icon');
//         expect(item).toHaveProperty('subtext');
//       });
//     });
//   });

//   describe('MemberOptions', () => {
//     it('should contain valid data', () => {
//       MemberOptions.forEach((item) => {
//         expect(item).toHaveProperty('icon');
//         expect(item).toHaveProperty('heading');
//         expect(item).toHaveProperty('substring');
//         expect(item).toHaveProperty('data');

//         // Validate data property
//         item.data.forEach((dataItem: DropdownData) => {
//           expect(dataItem).toHaveProperty('name');
//           expect(dataItem).toHaveProperty('icon');
//           expect(dataItem).toHaveProperty('subtext');
//         });
//       });
//     });
//   });
// });

import React from 'react';
import { render } from '@testing-library/react';
import { ViewData, EditData } from './accessForm';
import { DropdownData } from '../components/dropdown/DynamicDropdown';
// Replace with the correct file path

const renderDropdown = (dropdownData: DropdownData[]) => (
  <ul>
    {dropdownData.map((item) => (
      <li key={item.name}>
        {item.icon && <div data-testid={`${item.name}-icon`}>{item.icon(12)}</div>}
        {item.symbol && <div data-testid={`${item.name}-symbol`}>{item.symbol}</div>}
        <div data-testid={`${item.name}-name`}>{item.name}</div>
      </li>
    ))}
  </ul>
);

test('renders SchedulerDropdown correctly', () => {
  const { getByText } = render(renderDropdown(ViewData));
  expect(getByText('Everyone')).toBeInTheDocument();
});

test('renders TimeSpanDropdown correctly', () => {
  const { getByText } = render(renderDropdown(EditData));
  expect(getByText('Themselves')).toBeInTheDocument();
});
