import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Toggle from '../components/toggleButton/index';
import { store, useAppDispatch, useAppSelector } from '../redux/store/store';
import { setIsPeopleSelected } from '../redux/store/features/metricSlice';

// // Mock useAppSelector
// jest.mock('../redux/store/store', () => ({
//   useAppSelector: jest.fn(),
// }));

// describe('Toggle Component', () => {
//   // it('renders without crashing', () => {
//   //   // Mock the necessary data for the test
//   //   const mockUseAppSelector = jest.requireMock('../redux/store/store').useAppSelector;
//   //   mockUseAppSelector.mockReturnValue({
//   //     apiSlice: {
//   //       projectData: [[]],
//   //       peopleData: [[]],
//   //     },
//   //   });

//   //   const { getByTestId } = render(<Toggle isPeople setIsPeople={jest.fn()} />);

//   //   expect(getByTestId('people-toggle')).toBeInTheDocument();
//   //   expect(getByTestId('projects-toggle')).toBeInTheDocument();
//   // });

//   beforeEach(() => {
//     // Mock the Redux store selector and dispatch
//     (useAppSelector as jest.Mock).mockReturnValue({
//       apiSlice: {
//         projectData: [[]], // Mock an array to avoid 'Cannot read properties of undefined' error
//         peopleData: [[]], // Mock an array to avoid 'Cannot read properties of undefined' error
//       },
//     });

//     (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
//   });

//   it('triggers setIsPeople and dispatches setIsPeopleSelected when clicking on People', () => {
//     const { getByTestId } = render(<Toggle isPeople setIsPeople={jest.fn()} />);
//     const mockSetIsPeople = jest.fn();

//     fireEvent.click(getByTestId('people-toggle'));

//     expect(mockSetIsPeople).toHaveBeenCalledWith(true);

//     // Mock dispatch function
//     const mockDispatch = jest.fn();
//     (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

//     // Click on People again to trigger setIsPeopleSelected dispatch
//     fireEvent.click(getByTestId('people-toggle'));

//     expect(mockDispatch).toHaveBeenCalledWith(setIsPeopleSelected(true));
//   });

//   // it('triggers setIsPeople correctly', () => {
//   //   // Mock the necessary data for the test
//   //   const mockUseAppSelector = jest.requireMock('../redux/store/store').useAppSelector;
//   //   mockUseAppSelector.mockReturnValue({
//   //     apiSlice: {
//   //       projectData: [[]], // Mock an array to avoid 'Cannot read properties of undefined' error
//   //       peopleData: [[]], // Mock an array to avoid 'Cannot read properties of undefined' error
//   //     },
//   //   });

//   //   const mockSetIsPeople = jest.fn();

//   //   const { getByTestId } = render(
//   //     <Toggle isPeople setIsPeople={mockSetIsPeople} />,
//   //   );

//   //   fireEvent.click(getByTestId('projects-toggle'));
//   //   expect(mockSetIsPeople).toHaveBeenCalledWith(false);

//   //   fireEvent.click(getByTestId('people-toggle'));
//   //   expect(mockSetIsPeople).toHaveBeenCalledWith(true);
//   // });
// });

jest.mock('../redux/store/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('Toggle Component', () => {
  const mockedDis = jest.fn();
  beforeEach(() => {
    // Mock the Redux store selector and dispatch
    (useAppSelector as jest.Mock).mockReturnValue({
      apiSlice: {
        projectData: [[]], // Mock an array to avoid 'Cannot read properties of undefined' error
        peopleData: [[]], // Mock an array to avoid 'Cannot read properties of undefined' error
      },
    });

    (useAppDispatch as jest.Mock).mockReturnValue(mockedDis);
  });

  it('triggers setIsPeople and dispatches setIsPeopleSelected when clicking on People', () => {
    const { getByTestId } = render(<Toggle isPeople setIsPeople={jest.fn()} />);

    fireEvent.click(getByTestId('people-toggle'));

    expect(mockedDis).toHaveBeenCalledWith({ payload: true, type: 'metricState/setIsPeopleSelected' });

    // Mock dispatch function

    // Click on People again to trigger setIsPeopleSelected dispatch
    fireEvent.click(getByTestId('people-toggle'));

    expect(mockedDis).toHaveBeenCalledWith(setIsPeopleSelected(true));
  });
});
