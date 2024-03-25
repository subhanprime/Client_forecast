import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckBoxBar from '../components/checkBox/checkBoxBar';
import { renderWithProviders } from '../utils/tet-utils';

describe('CheckBoxBar component', () => {
    const mockProps = {
        selectedRowsIds: [8903635, 8903634, 8903563],
        howManySelected: 3,
        handleBulkEditFn: jest.fn(),
        unSelectAllCheckBox: jest.fn(),
        deleteAllProjects: jest.fn(),
        ArchiveAllProjects: jest.fn(),
    };

    it('renders all buttons and displays the number of selected items', () => {
        const { getByText, getByAltText } = renderWithProviders(<CheckBoxBar {...mockProps} />);

        expect(getByText(/Edit/i)).toBeInTheDocument();
        expect(getByText(/Archive/i)).toBeInTheDocument();
        expect(getByText(/Delete/i)).toBeInTheDocument();
        expect(getByText(/clear/i)).toBeInTheDocument();
        expect(getByText(/3 Selected/i)).toBeInTheDocument();
    });

    it('calls the appropriate function on button clicks', () => {
        const { getByText } = renderWithProviders(<CheckBoxBar {...mockProps} />);

        fireEvent.click(getByText('Edit'));
        fireEvent.click(getByText('Archive'));
        fireEvent.click(getByText('Delete'));
        fireEvent.click(getByText('clear'));

        expect(mockProps.handleBulkEditFn).toHaveBeenCalled();
        expect(mockProps.ArchiveAllProjects).toHaveBeenCalled();
        expect(mockProps.deleteAllProjects).toHaveBeenCalled();
        expect(mockProps.unSelectAllCheckBox).toHaveBeenCalled();
    });
});
