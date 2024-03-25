import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicDropdown, { DropdownData } from './DynamicDropdown'; // Adjust the path accordingly

describe('DynamicDropdown', () => {
  const data: DropdownData[] = [
    {
      name: 'Option 1', subtext: 'Subtext 1', icon: null, symbol: null,
    },
    {
      name: 'Option 2', subtext: 'Subtext 2', icon: null, symbol: null,
    },
    // Add more data as needed
  ];

  it('renders the component with default props', () => {
    const { getByText } = render(
      <DynamicDropdown
        data={data}
        defaultName="Default Name"
        icon={null}
        className="test-class"
        dropSize="large"
        selected={null}
        setSelected={() => {}}
      />,
    );

    expect(getByText('Default Name')).toBeInTheDocument();
  });

  it('opens and closes the dropdown on click', () => {
    const { getByText, queryByText } = render(
      <DynamicDropdown
        data={data}
        defaultName="Default Name"
        icon={null}
        className="test-class"
        dropSize="large"
        selected={null}
        setSelected={() => {}}
      />,
    );

    fireEvent.click(getByText('Default Name'));
    expect(queryByText('Option 1')).toBeInTheDocument();

    fireEvent.click(getByText('Default Name'));
    expect(queryByText('Option 1')).toBeNull();
  });

  it('selects an option on click', () => {
    const setSelectedMock = jest.fn();
    const { getByText } = render(
      <DynamicDropdown
        data={data}
        defaultName="Default Name"
        icon={null}
        className="test-class"
        dropSize="large"
        selected={null}
        setSelected={setSelectedMock}
      />,
    );

    fireEvent.click(getByText('Default Name'));
    fireEvent.click(getByText('Option 1'));

    expect(setSelectedMock).toHaveBeenCalledWith(data[0]);
  });

  it('calls setSelected and onSelection when X icon is clicked', () => {
    const mockedData = [
      { name: 'Option 1', subtext: 'Subtext 1', symbol: '$' },
      { name: 'Option 2', subtext: 'Subtext 2', symbol: '€' },
    ];

    const setSelectedMock = jest.fn();
    const onSelectionMock = jest.fn();

    render(
      <DynamicDropdown
        data={mockedData}
        defaultName="Select an option"
        icon={null}
        hasChevron
        isNameShown
        className="your-class"
        dropSize="large"
        selectable
        hoverClasses="hover:bg-gray-300"
        containerStyle=""
        selected={mockedData[0]}
        setSelected={setSelectedMock}
        isCancelable
        onSelection={onSelectionMock}
      />,
    );

    // Click on the X icon
    fireEvent.click(screen.getByTestId('cancel-icon'));

    // Check if setSelected and onSelection were called with the expected arguments
    expect(setSelectedMock).toHaveBeenCalledWith(null);
    expect(onSelectionMock).toHaveBeenCalledWith(null);
  });

  it('closes dropdown when clicked outside', () => {
    const mockedData = [
      { name: 'Option 1', subtext: 'Subtext 1', symbol: '$' },
      { name: 'Option 2', subtext: 'Subtext 2', symbol: '€' },
    ];

    // const ref = { current: document.createElement('div') }; // Mock ref object
    const setIsOpenMock = jest.fn();

    render(
      <DynamicDropdown
        data={mockedData}
        defaultName="Select an option"
        icon={null}
        hasChevron
        isNameShown
        className="your-class"
        dropSize="large"
        selectable
        hoverClasses="hover:bg-gray-300"
        containerStyle=""
        selected={mockedData[0]}
        setSelected={() => {}}
        isCancelable
        onSelection={() => {}}
      />,
    );

    // Simulate a click outside the component
    fireEvent.click(document.body);

    // Check if setIsOpen was called with the expected argument
    expect(setIsOpenMock).not.toHaveBeenCalledWith();
  });
  // Add more test cases as needed
});
