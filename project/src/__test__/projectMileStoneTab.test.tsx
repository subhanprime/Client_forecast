import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProjectMilestoneTab from '../components/projectMileStoneTab';
import { Milestone } from '../components/constant/bulkActions';
import { renderWithProviders } from '../utils/tet-utils';
describe('ProjectMilestoneTab component', () => {
    it('adds a milestone', () => {
        const mockMilestones: Milestone[] = [];
        const setMockMilestones = jest.fn();

        renderWithProviders(<ProjectMilestoneTab milestones={mockMilestones} setMilestones={setMockMilestones} />);

        const milestoneNameInput = screen.getByPlaceholderText('Milestone name');
        fireEvent.change(milestoneNameInput, { target: { value: 'New Milestone' } });

        const addMilestoneButton = screen.getByText('Add Milestone');
        fireEvent.click(addMilestoneButton);

        expect(setMockMilestones).toHaveBeenCalledWith([
            { name: 'New Milestone', from: expect.any(Date), to: expect.any(Date) },
        ]);
    });

    it('removes a milestone', () => {
        const mockMilestones: Milestone[] = [
            { name: 'Milestone 1', from: new Date(), to: new Date() },
            { name: 'Milestone 2', from: new Date(), to: new Date() },
        ];
        const setMockMilestones = jest.fn();

        const { getByPlaceholderText, getByText } = renderWithProviders(
            <ProjectMilestoneTab milestones={mockMilestones} setMilestones={jest.fn()} />
        );

        const removeMilestoneButton = screen.getAllByAltText('cross')[0];
        fireEvent.click(removeMilestoneButton);

        expect(setMockMilestones).toHaveBeenCalledWith([
            { name: 'Milestone 2', from: expect.any(Date), to: expect.any(Date) },
        ]);

        const milestoneNameInput = getByPlaceholderText('Milestone name');
        const addMilestoneButton = getByText('Add Milestone');
        fireEvent.change(milestoneNameInput, { target: { value: 'New Milestone' } });
        fireEvent.click(addMilestoneButton);

    });

});
