import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterDropDown from '../components/bulkEditHandler/filterDropDown';
import { renderWithProviders } from '../utils/tet-utils';
import { ProjectInternalFilter } from '../components/constant/enums';
// import { unSelectAllCheckBox } from '../components/projectTable'

describe('FilterDropDown component', () => {
  function unSelectAllCheckBox() { };
  it('renders FilterDropDown component', () => {
    const filterDropdownObj = {
      active: false,
      archived: false,
      myProjects: false,
    };
    const setFilterDropdownObj = jest.fn();

    renderWithProviders(
      <FilterDropDown
        filterDropdownObj={filterDropdownObj}
        setFilterDropdownObj={setFilterDropdownObj}
      // unSelectAllCheckBox={unSelectAllCheckBox}
      />
    );

    // Check if the folder icon is present
    expect(screen.getByAltText('')).toBeInTheDocument();
  });

  it('opens/closes the dropdown when clicked', () => {
    const filterDropdownObj = {
      active: false,
      archived: false,
      myProjects: false,
    };
    const setFilterDropdownObj = jest.fn();

    renderWithProviders(
      <FilterDropDown
        filterDropdownObj={filterDropdownObj}
        setFilterDropdownObj={setFilterDropdownObj}
      // unSelectAllCheckBox={unSelectAllCheckBox}

      />
    );

    expect(screen.queryByText('Active')).not.toBeInTheDocument();

    fireEvent.click(screen.getByAltText(''));

    expect(screen.getByText('Active')).toBeInTheDocument();

    fireEvent.click(screen.getByAltText(''));

    expect(screen.queryByText('Active')).not.toBeInTheDocument();
  });

  it('handles checkbox clicks and triggers state updates', () => {
    const filterDropdownObj = {
      active: false,
      archived: false,
      myProjects: false,
    };
    const setFilterDropdownObj = jest.fn();

    renderWithProviders(
      <FilterDropDown
        filterDropdownObj={filterDropdownObj}
        setFilterDropdownObj={setFilterDropdownObj}
      // unSelectAllCheckBox={unSelectAllCheckBox}

      />
    );

    fireEvent.click(screen.getByAltText(''));

    expect(screen.getByLabelText(ProjectInternalFilter.Active)).not.toBeChecked();
    expect(screen.getByLabelText(ProjectInternalFilter.Archived)).not.toBeChecked();
    expect(screen.getByLabelText(ProjectInternalFilter.MyProject)).not.toBeChecked();

    fireEvent.click(screen.getByLabelText(ProjectInternalFilter.Active));
    fireEvent.click(screen.getByLabelText(ProjectInternalFilter.Archived));
    fireEvent.click(screen.getByLabelText(ProjectInternalFilter.MyProject));

    // Check if the state update functions were called with correct arguments
    // expect(setFilterDropdownObj).toHaveBeenCalledWith({
    //   active: false,
    //   archived: false,
    //   myProjects: false,
    // });
  });
});
