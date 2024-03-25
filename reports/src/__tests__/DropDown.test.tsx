import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import PeopleDropDownFilter from '../components/dropdown/peopleDropDown/index';
import AllocationsDropDownFilter from '../components/dropdown/allocationsDropDown';
import TimeoffDropDownFilter from '../components/dropdown/timeoffDropDown';
import Dropdown from '../components/dropdown';
// ********************************************People Dropdown**************************************

describe('Dropdown Test', () => {
  test('renders PeopleDropDownFilter component', () => {
    render(<PeopleDropDownFilter />);
    const dropdownButton = screen.getByRole('button', { name: /people:/i });
    expect(dropdownButton).toBeInTheDocument();
  });
  test('toggles dropdown when button is clicked', () => {
    render(<PeopleDropDownFilter />);
    const dropdownButton = screen.getByRole('button', { name: /people:/i });
    fireEvent.click(dropdownButton);
  });
  test('toggles checkbox state when checkbox is clicked active', () => {
    render(<PeopleDropDownFilter />);
    const activeCheckbox = screen.getByLabelText(/active/i);
    fireEvent.click(activeCheckbox);
    expect(activeCheckbox).not.toBeChecked();
  });
  test('toggles checkbox state when checkbox is clicked Archived', () => {
    render(<PeopleDropDownFilter />);
    const activeCheckbox = screen.getByTestId('checkbox-item-2');
    fireEvent.click(activeCheckbox);
    expect(activeCheckbox).toBeChecked();
  });
  test('toggles checkbox state when checkbox is clicked contractor', () => {
    render(<PeopleDropDownFilter />);
    const activeCheckbox = screen.getByTestId('checkbox-item-3');
    fireEvent.click(activeCheckbox);
    expect(activeCheckbox).toBeChecked();
  });
  test('toggles checkbox state when checkbox is clicked Employees', () => {
    render(<PeopleDropDownFilter />);
    const activeCheckbox = screen.getByTestId('checkbox-item-4');
    fireEvent.click(activeCheckbox);
    expect(activeCheckbox).toBeChecked();
  });
  test('toggles checkbox state when checkbox is clicked Placeholders', () => {
    render(<PeopleDropDownFilter />);
    const activeCheckbox = screen.getByTestId('checkbox-item-5');
    fireEvent.click(activeCheckbox);
    expect(activeCheckbox).toBeChecked();
  });

  // ***************************************Allocations Dropdown**************************************
  test('renders AllocationsDropDownFilter component', () => {
    render(<AllocationsDropDownFilter />);
    const dropdownButton = screen.getByRole('button', { name: /allocations:/i });
    expect(dropdownButton).toBeInTheDocument();
  });
  test('toggles dropdown when button is clicked', () => {
    render(<AllocationsDropDownFilter />);
    const dropdownButton = screen.getByRole('button', { name: /allocations:/i });
    fireEvent.click(dropdownButton);
    const dropdownContent = screen.getByTestId('dropdownDefaultCheckbox');
    expect(dropdownContent).toBeInTheDocument();
  });
  test('toggles checkbox state when checkbox is clicked Confirmed', () => {
    render(<AllocationsDropDownFilter />);
    const confirmedCheckbox = screen.getByTestId('checkbox-item-1');
    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).not.toBeChecked();
    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).toBeChecked();
  });
  test('toggles checkbox state when checkbox is clicked tentative', () => {
    render(<AllocationsDropDownFilter />);
    const confirmedCheckbox = screen.getByTestId('checkbox-item-2');
    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).toBeChecked();
    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).not.toBeChecked();
  });

  test('toggles checkbox state when checkbox is clicked tomeoff', () => {
    render(<AllocationsDropDownFilter />);
    const confirmedCheckbox = screen.getByTestId('checkbox-item-3');

    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).toBeChecked();

    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).not.toBeChecked();
  });

  test('renders TimeoffDropDownFilter component', () => {
    render(<TimeoffDropDownFilter />);
    const dropdownButton = screen.getByRole('button', { name: /time off:/i });
    expect(dropdownButton).toBeInTheDocument();
  });
  test('toggles dropdown when button is clicked', () => {
    render(<TimeoffDropDownFilter />);
    const dropdownButton = screen.getByRole('button', { name: /time off:/i });

    fireEvent.click(dropdownButton);
    const dropdownContent = screen.getByTestId('dropdownDefaultCheckbox');
    expect(dropdownContent).toBeInTheDocument();
  });
  test('toggles checkbox state when checkbox is clicked Approved', () => {
    render(<TimeoffDropDownFilter />);
    const confirmedCheckbox = screen.getByTestId('checkbox-item-1');

    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).not.toBeChecked();

    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).toBeChecked();
  });

  test('toggles checkbox state when checkbox is clicked tentative', () => {
    render(<TimeoffDropDownFilter />);
    const confirmedCheckbox = screen.getByTestId('checkbox-item-2');

    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).toBeChecked();

    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).not.toBeChecked();
  });
  test('toggles checkbox state when checkbox is clicked Declined', () => {
    render(<TimeoffDropDownFilter />);
    const confirmedCheckbox = screen.getByTestId('checkbox-item-3');

    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).toBeChecked();

    fireEvent.click(confirmedCheckbox);
    expect(confirmedCheckbox).not.toBeChecked();
  });
});

describe('Dropdown Component', () => {
  const dropdownListDays = ['Days', 'Weeks', 'Month'];
  const defaultSelectedDays = 'Days';
  const setSelectedStateDays = jest.fn();

  it('handles dropdown click days', async () => {
    render(<Dropdown
      width="w-64"
      dropdownList={dropdownListDays}
      defaultSelected={defaultSelectedDays}
      setSelectedState={setSelectedStateDays}
    />);
    const dropdwonBtn = screen.getByTestId('dropdown-days');
    fireEvent.click(dropdwonBtn);
    expect(dropdwonBtn).toBeInTheDocument();
  });

  it('toggles dropdown visibility when button is clicked', () => {
    render(<Dropdown
      width="w-64"
      dropdownList={dropdownListDays}
      defaultSelected={defaultSelectedDays}
      setSelectedState={setSelectedStateDays}
    />);
    const dropdownButton = screen.getByTestId('dropdown-days');
    fireEvent.click(dropdownButton);
    const dropdownContent = screen.getByRole('menu');
    expect(dropdownContent).toBeInTheDocument();
  });

  it('closes dropdown when an option is clicked', () => {
    render(
      <Dropdown
        width="w-64"
        dropdownList={dropdownListDays}
        defaultSelected={defaultSelectedDays}
        setSelectedState={setSelectedStateDays}
      />,
    );

    const button = screen.getByTestId('dropdown-days');
    fireEvent.click(button);

    const option = screen.getByText('Weeks');
    fireEvent.click(option);

    const dropdownContent = screen.queryByRole('menu');
    expect(dropdownContent).not.toBeInTheDocument();
  });

  it('selects an option when clicked', () => {
    render(
      <Dropdown
        width="w-64"
        dropdownList={dropdownListDays}
        defaultSelected={defaultSelectedDays}
        setSelectedState={setSelectedStateDays}
      />,
    );

    const button = screen.getByTestId('dropdown-days');
    fireEvent.click(button);

    const option = screen.getByText('Weeks');
    fireEvent.click(option);

    expect(setSelectedStateDays).toHaveBeenCalledWith('Weeks');
  });

  const dropdownListSchedule = ['Logged vs Scheduled', 'Past logged + Future scheduled', 'Logged', 'Scheduled'];
  const defaultSelectedSchedule = 'Logged vs Scheduled';
  const setSelectedStateSchedule = jest.fn();

  it('handles dropdown click schedule', async () => {
    render(<Dropdown
      width="w-64"
      dropdownList={dropdownListSchedule}
      defaultSelected={defaultSelectedSchedule}
      setSelectedState={setSelectedStateSchedule}
    />);
    const dropdwonBtn = screen.getByTestId('dropdown-days');
    fireEvent.click(dropdwonBtn);
    expect(dropdwonBtn).toBeInTheDocument();
  });

  // it('initially renders with default selected value', () => {
  //   const wrapper = mount(
  //     <Dropdown dropdownList={dropdownList} defaultSelected={defaultSelected}
  // setSelectedState={setSelectedState} />,
  //   );
  //   expect(wrapper.find('span').text()).toBe(defaultSelected);
  // });

  // it('toggles dropdown when button is clicked', () => {
  //   const wrapper = mount(
  //     <Dropdown dropdownList={dropdownList} defaultSelected={defaultSelected}
  // setSelectedState={setSelectedState} />,
  //   );

  //   wrapper.find('button').simulate('click');
  //   expect(wrapper.state('isOpen')).toBe(true);

  //   wrapper.find('button').simulate('click');
  //   expect(wrapper.state('isOpen')).toBe(false);
  // });

  // it('closes dropdown when an option is clicked', () => {
  //   const wrapper = mount(
  //     <Dropdown dropdownList={dropdownList}
  // defaultSelected={defaultSelected} setSelectedState={setSelectedState} />,
  //   );

  //   wrapper.find('button').simulate('click');
  //   wrapper.find('li button').at(0).simulate('click');
  //   expect(wrapper.state('isOpen')).toBe(false);
  // });

  // it('calls setSelectedState when an option is clicked', () => {
  //   const wrapper = mount(
  //     <Dropdown dropdownList={dropdownList}
  // defaultSelected={defaultSelected} setSelectedState={setSelectedState} />,
  //   );

  //   wrapper.find('button').simulate('click');
  //   wrapper.find('li button').at(0).simulate('click');
  //   expect(setSelectedState).toHaveBeenCalledWith('Option 1');
  // });

  // it('closes dropdown when clicking outside the dropdown', () => {
  //   const wrapper = mount(
  //     <Dropdown dropdownList={dropdownList}
  // defaultSelected={defaultSelected} setSelectedState={setSelectedState} />,
  //   );

  //   wrapper.find('button').simulate('click');
  //   document.dispatchEvent(new MouseEvent('click'));
  //   expect(wrapper.state('isOpen')).toBe(false);
  // });
});
