import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputFields from '../components/bulkEditHandler/fieldsInput';
import { renderWithProviders } from '../utils/tet-utils';

describe('InputFields component', () => {
    it.only('renders InputFields component', () => {
        const setSelectedOption = jest.fn();
        const { getByText, getByDisplayValue } = renderWithProviders(
            <InputFields selectedOption="tags" setSelectedOption={setSelectedOption} />
        );

        expect(getByText('Field')).toBeInTheDocument();
    });

    it('populates dropdown options correctly', () => {
        const setSelectedOption = jest.fn();
        const { getByTestId } = renderWithProviders(
            <InputFields selectedOption="tags" setSelectedOption={setSelectedOption} />
        );

        const dropdown = getByTestId('input-dropdown');

        expect(dropdown).toHaveTextContent('Budget');
        expect(dropdown).toHaveTextContent('Client');
        expect(dropdown).toHaveTextContent('Tags');
        expect(dropdown).toHaveTextContent('Type');
    });

    it('triggers change event on selecting an option', () => {
        const setSelectedOption = jest.fn();
        const { getByTestId } = renderWithProviders(
            <InputFields selectedOption="tags" setSelectedOption={setSelectedOption} />
        );

        const dropdown = getByTestId('input-dropdown');

        fireEvent.change(dropdown, { target: { value: 'Client' } });

        expect(setSelectedOption).toHaveBeenCalledWith('Client');
    });
});
