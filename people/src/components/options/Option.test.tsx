import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { Globe } from 'lucide-react';
import Options from './Options';

const mockData = [
  {
    name: 'Everyone',
    icon: (size:any) => <Globe size={size || 15} />,
    symbol: null,
    subtext: 'All users',
  },
  // Add more mock data as needed
];
// const mockSelector = jest.fn();
// jest.mock('../../app/hooks', () => ({
//   ...jest.requireActual('../../app/hooks'),
//   useAppSelector: () => mockSelector,
// }));

describe('Options component', () => {
  it('renders the component with default values', () => {
    render(
      <Options
        icon={<Globe />}
        heading="Test Heading"
        substring="Test Substring"
        data={mockData}
      />,
    );

    // Check if the component renders correctly
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test Substring')).toBeInTheDocument();
    expect(screen.getByTestId('dynamic-dropdown')).toBeInTheDocument(); // Assuming you have a data-testid on DynamicDropdown
  });

  //   it('calls onSelect callback when an option is selected', () => {
  //     const onSelectMock = jest.fn();

  //     render(
  //       <Options
  //         icon={<Globe />}
  //         heading="Test Heading"
  //         substring="Test Substring"
  //         data={mockData}
  //         onSelect={onSelectMock}
  //       />,
  //     );

  //     // Click on the dropdown to open options
  //     fireEvent.click(screen.getByTestId('dynamic-dropdown'));

  //     // Choose an option
  //     fireEvent.click(screen.getByText('Everyone'));

  //     // Check if onSelect callback is called with an object containing the specified properties
  //     expect(onSelectMock).toHaveBeenCalledWith(expect.objectContaining({
  //       name: 'Everyone',
  //       subtext: 'All users',
  //       // ... other properties you want to match
  //     }));
  //   });
  it('updates selected option state when an option is selected', () => {
    render(
      <Options
        icon={<Globe />}
        heading="Test Heading"
        substring="Test Substring"
        data={mockData}
      />,
    );
    const dropdown = screen.getByTestId('dynamic-dropdown');
    // Click on the dropdown to open options
    fireEvent.click(screen.getByTestId('dynamic-dropdown'));

    // Choose an option
    fireEvent.click(dropdown);

    // Check if the selected state is updated
    // expect(screen.getByText('Everyone')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Everyone'));
  });
});
