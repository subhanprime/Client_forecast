import { screen, render, fireEvent } from "@testing-library/react";
import ProjectTeamTab from '../components/projectTeamTab';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/tet-utils";
import { UserDetails } from "../components/constant/bulkActions";

describe('Project team tab section one', () => {
  it('test team tab ui', () => {

    const initialUserList: any = [
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
    ]

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <ProjectTeamTab
          isDifferentRate="someValue"
          setIsDifferentRate={jest.fn()}
          isTeamOpen={false}
          setIsTeamOpen={jest.fn()}
          selectedUsers={[]}
          setSelectedUsers={jest.fn()}
          initialUserList={initialUserList}
          filterTeamText=""
          setFilterTeamText={jest.fn()}
        />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('Select user');
    expect(inputElement).toBeInTheDocument();

    const userToSelect = screen.getByText('Assign a team member');
    expect(userToSelect).toBeInTheDocument();

    const ProjectSelect = screen.getByText('Project Owner');
    expect(ProjectSelect).toBeInTheDocument();

    const inputItem = screen.getByRole('textbox');
    expect(inputItem).toBeInTheDocument();
    expect(inputItem).toHaveValue('');

  });
});

