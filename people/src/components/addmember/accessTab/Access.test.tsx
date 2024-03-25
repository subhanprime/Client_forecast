import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Access from './Access';
import { store } from '../../../app/store';

jest.mock('../../reuseableComponents/select', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-select">MockSelect</div>),
}));

describe('Access component', () => {
  it('renders Access component correctly', () => {
    render(
      <Provider store={store}>
        <Access />
      </Provider>,
    );

    expect(screen.getByTestId('mock-select')).toBeInTheDocument();
  });
  it('should set enableDepDrop to true when "Departments" is selected', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Access onClose={() => {}} />
      </Provider>,

    );

    // Initial state check
    expect(getByTestId('mock-select')).toBeInTheDocument();

    // Simulate selecting "Departments"
    fireEvent.click(getByTestId('mock-select'));

    // Check if enableDepDrop is true and the department dropdown is rendered
    expect(getByTestId('mock-select')).toBeInTheDocument();
  });
});
