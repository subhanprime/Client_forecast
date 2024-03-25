import React from 'react';
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react';
import BulkEditHandler from '../components/bulkEditHandler/bulkEditHandler';
import { renderWithProviders } from '../utils/tet-utils';

describe('BulkEditHandler component', () => {
  const mockProps: any
    = {
    isBulkEditOpen: true,
    onBulkEditClose: jest.fn(),
    selectedRowsIds: [8903637],
    selectedUuidIds: [
      {
        active: 1,
        all_pms_schedule: 0,
        archived: false,
        budget_per_phase: 0,
        budget_total: "0.0000",
        budget_type: 0,
        client: "Robert Louis Stevenson",
        color: "34861B",
        end_date: "2023-12-08",
        ext_calendar_count: 0,
        isBillable: true,
        isDifferentRate: "",
        isTentative: false,
        locked_task_list: 0,
        metaTasks: [{/* metaTasks object 1 */ }],
        milestones: [{/* milestones object 1 */ }],
        modified: "2023-12-05 13:10:18",
        name: "TickPlunge",
        non_billable: 0,
        note: "test note",
        people_ids: [18123927, 18123924],
        perHourRate: 25,
        project_id: 8903637,
        project_manager: 806829,
        rate_type: 1,
        selectedBudget: "Hours by project",
        selectedUsers: null,
        start_date: "2023-12-04",
        tags: ['random access', 'random', 'access'],
        tentative: 0,
        totalProjectHour: 0,
        uuid: "e2749151-600a-4ba8-b82d-73dcf905cff4"
      }
      // Add more objects to match the ProjectObject structure as needed
    ],
  }

  it.skip('renders BulkEditHandler component with all options', () => {
    const { getByText, getByLabelText, getByRole } = renderWithProviders(<BulkEditHandler {...mockProps} />);

    expect(getByRole("textbox")).toBeInTheDocument();

    // Trigger button clicks
    fireEvent.click(getByText('Update'));
    fireEvent.click(getByText('Close'));

    // Check if the functions are being called when buttons are clicked
    expect(mockProps.onBulkEditClose).toHaveBeenCalled();
  });

});
