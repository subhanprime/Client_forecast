import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BudgetFields from '../components/bulkEditHandler/budgetFields';
import { renderWithProviders } from '../utils/tet-utils';

describe('BudgetFields component', () => {
    const mockProps = {
        hoursByProject: 0,
        setHoursByProject: jest.fn(),
        isDifferentRate: 'true',
        setIsDifferentRate: jest.fn(),
        selectedBudget: 'Hours by project',
        setSelectedBudget: jest.fn(),
        totalProjectHours: 0,
        setTotalProjectHours: jest.fn(),
    };

    it('renders BudgetFields component with select and input elements', () => {
        const { getByText, getByDisplayValue, getByPlaceholderText } = renderWithProviders(<BudgetFields {...mockProps} />);

        expect(getByText('Budget')).toBeInTheDocument();
        expect(getByText('Hours')).toBeInTheDocument();

        expect(getByDisplayValue('Hours by project')).toBeInTheDocument();

        expect(getByPlaceholderText('$000')).toBeInTheDocument();
    });

    it('handles change events for select and input elements', () => {
        const { getByDisplayValue, getByPlaceholderText } = renderWithProviders(<BudgetFields {...mockProps} />);

        fireEvent.change(getByDisplayValue('Hours by project'), { target: { value: 'Fee by project' } });

        expect(mockProps.setSelectedBudget).toHaveBeenCalledWith('Fee by project');

        fireEvent.change(getByPlaceholderText('$000'), { target: { value: '100' } });

        expect(mockProps.setTotalProjectHours).toHaveBeenCalledWith(100);
    });

});
