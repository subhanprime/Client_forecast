import { fireEvent, render } from '@testing-library/react';
import { getHeaderNameSection } from '../constants/headerSectionName';

// ********************************** Heaer Table Configration  *****************************
describe('getHeaderNameSection', () => {
  it('calls the toggle sorting handler on Enter key press', () => {
    const mockGetToggleSortingHandler = jest.fn();

    // Mock header properties
    const headerProps = {
      header: {
        column: {
          getCanSort: () => true,
          getToggleSortingHandler: mockGetToggleSortingHandler,
        },
      },
    };

    // Render the component
    const { getByRole } = render(getHeaderNameSection(headerProps, 'Name'));

    // Find the div element
    const nameSection = getByRole('button', { name: 'Name' });

    // Trigger the key press event for 'Enter' on the div
    fireEvent.keyPress(nameSection, { key: 'Enter', code: 'Enter' });

    // Check if the toggle sorting handler is called
    expect(mockGetToggleSortingHandler).toHaveBeenCalled();
  });

  // it('does not call the toggle sorting handler on Enter key press when cannot sort', () => {
  //   const mockGetToggleSortingHandler = jest.fn();

  //   // Mock header properties
  //   const headerProps = {
  //     header: {
  //       column: {
  //         getCanSort: () => false,
  //         getToggleSortingHandler: mockGetToggleSortingHandler,
  //       },
  //     },
  //   };

  //   // Render the component
  //   const { getByRole } = render(getHeaderNameSection(headerProps));

  //   // Find the div element
  //   const nameSection = getByRole('button', { name: 'Name' });

  //   // Trigger the key press event for 'Enter' on the div
  //   fireEvent.keyPress(nameSection, { key: 'Enter', code: 'Enter' });

  //   // Check if the toggle sorting handler is NOT called
  //   expect(mockGetToggleSortingHandler).not.toHaveBeenCalled();
  // });
});

describe('getHeaderNameSection', () => {
  it('calls the toggle sorting handler on Enter key press', () => {
    const mockGetToggleSortingHandler = jest.fn();

    // Mock header properties
    const headerProps = {
      header: {
        column: {
          getCanSort: () => true,
          getToggleSortingHandler: mockGetToggleSortingHandler,
        },
      },
    };

    const testName = 'Name'; // Change this to the expected name

    // Render the component
    const { getByRole } = render(getHeaderNameSection(headerProps, testName));

    // Find the div element
    const nameSection = getByRole('button', { name: testName });

    // Trigger the key press event for 'Enter' on the div
    fireEvent.keyPress(nameSection, { key: 'Enter', code: 'Enter' });

    // Check if the toggle sorting handler is called
    expect(mockGetToggleSortingHandler).toHaveBeenCalled();
  });
});
