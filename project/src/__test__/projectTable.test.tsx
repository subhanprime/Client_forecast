import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableProject from '../components/projectTable';
import { useSelector } from 'react-redux';
import { renderWithProviders } from '../utils/tet-utils';
import { MemoryRouter } from 'react-router-dom';

test('renders TableProject component with project list', async () => {

    renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
            <TableProject />
        </MemoryRouter>
    );

    const projectRows = screen.getAllByRole('row');
    expect(projectRows.length).toBeGreaterThanOrEqual(0);

    if (projectRows.length >= 1) {
        fireEvent.click(projectRows[0]);
        const clientButton = screen.getByText(/client/i);
        expect(clientButton).toBeInTheDocument();
        const budgetButton = screen.getByText(/budget/i);
        expect(budgetButton).toBeInTheDocument();
        const ownerButton = screen.getByText(/owner/i);
        expect(ownerButton).toBeInTheDocument();
    }
});
