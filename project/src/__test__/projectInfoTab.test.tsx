import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectInfoTab from '../components/projectInfoTab';
import { useSelector } from 'react-redux';
import { renderWithProviders } from '../utils/tet-utils';
import { MemoryRouter } from 'react-router-dom';

describe('ProjectInfoTab component', () => {
    const setNoteMock = jest.fn();
    const setTagsMock = jest.fn();
    const handleTagInputChangeMock = jest.fn();
    const setIsBillableMock = jest.fn();
    // const handleTagKeyDownMock = jest.fn();

    const defaultProps = {
        isDifferentRate: 'someValue',
        setIsDifferentRate: jest.fn(),
        inputValue: 'someInputValue',
        setInputValue: jest.fn(),
        isOpen: false,
        setIsOpen: jest.fn(),
        note: 'someNote',
        setNote: setNoteMock,
        tags: ['tag1', 'tag2'],
        setTags: setTagsMock,
        tagInputValue: 'tagInput',
        setTagInputValue: handleTagInputChangeMock,
        isBillable: true,
        setIsBillable: setIsBillableMock,
        isTentative: false,
        setIsTentative: jest.fn(),
        selectedBudget: 'hourly',
        setSelectedBudget: jest.fn(),
        perHourRate: 20,
        setPerHourRate: jest.fn(),
        totalProjectHour: 40,
        setTotalProjectHour: jest.fn(),

    };

    it('renders ProjectInfoTab component with default props', () => {
        renderWithProviders(<ProjectInfoTab {...defaultProps} />);
        expect(screen.getByText('Client')).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        const { getByPlaceholderText, getByText } = renderWithProviders(<ProjectInfoTab {...defaultProps} />);
        screen.getByText(/client/i);

        const input = screen.getByPlaceholderText('Select or add new option') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New Value' } });

        const textarea = getByPlaceholderText('Add a note...');

        fireEvent.change(textarea, { target: { value: 'New note value' } });
        expect(setNoteMock).toHaveBeenCalledWith('New note value');

        const tagInput = getByPlaceholderText('Type and press Enter to add tags');
        fireEvent.change(tagInput, { target: { value: 'New Tag' } });
        fireEvent.keyDown(tagInput, { key: 'Enter', code: 'Enter' });

        expect(handleTagInputChangeMock).toHaveBeenCalledWith('New Tag');

        const billableButton = getByText('Billable');
        const nonBillableButton = getByText('Non-billable');
        fireEvent.click(billableButton);
        expect(setIsBillableMock).toHaveBeenCalledWith(true); // Assert that setIsBillable was called with true

        fireEvent.click(nonBillableButton);
        expect(setIsBillableMock).toHaveBeenCalledWith(false);
    });

});
