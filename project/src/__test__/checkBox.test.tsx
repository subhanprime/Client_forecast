import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomCheckbox from '../components/checkBox/checkBox';

describe('CustomCheckbox component', () => {
    it('renders checkbox and checks its initial state', () => {
        render(<CustomCheckbox />);
        const checkbox = screen.getByRole('checkbox', { name: 'Checkbox' });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked();
    });
});
