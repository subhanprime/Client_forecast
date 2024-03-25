import React from 'react';
import { render } from '@testing-library/react';
import {
  SchedulerDropdown,
  TimeSpanDropdown,
  GridDropdownData,
  AddButtonDropData,
  ExternalLinksData,
  DropdownData,
} from '../constants'; // Replace with the correct file path

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
  const { getByText } = render(renderDropdown(SchedulerDropdown));
  expect(getByText('Schedule')).toBeInTheDocument();
});

test('renders TimeSpanDropdown correctly', () => {
  const { getByText } = render(renderDropdown(TimeSpanDropdown));
  expect(getByText('Days')).toBeInTheDocument();
});

test('renders GridDropdownData correctly', () => {
  const { getByText, getByTestId } = render(renderDropdown(GridDropdownData));
  expect(getByText('Compact')).toBeInTheDocument();
  expect(getByTestId('Compact-icon')).toBeInTheDocument(); // Add assertions for icon
});

test('renders AddButtonDropData correctly', () => {
  const { getByText, getByTestId } = render(renderDropdown(AddButtonDropData));
  expect(getByText('Alocation Time')).toBeInTheDocument();
  expect(getByTestId('Alocation Time-icon')).toBeInTheDocument(); // Add assertions for icon
});

test('renders ExternalLinksData correctly', () => {
  const { getByText } = render(renderDropdown(ExternalLinksData));
  expect(getByText('Email this schedule')).toBeInTheDocument();
});
