import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Provider } from 'react-redux';
import UnderlineTabs from '../components/tabs';
import tabIndexes from '../constants/tabIndex';
import { store } from '../redux/store/store';

describe('tabIndexes', () => {
  it('contains the correct number of tabs', () => {
    expect(tabIndexes).toHaveLength(7); // Modify the number based on the actual number of tabs
  });

  it('has the expected structure for each tab', () => {
    tabIndexes.forEach((tab) => {
      expect(tab).toHaveProperty('label');
      expect(tab).toHaveProperty('value');
      expect(tab).toHaveProperty('component');
    });
  });

  // it('contains specific tabs with correct properties', () => {
  //   // Replace the values below with your expected label, value, and component
  //   const expectedTabs = [
  //     { label: 'People', value: 'people', component: expect.any(Object) },
  //     { label: 'Roles', value: 'roles', component: expect.any(Object) },
  //     { label: 'Department', value: 'department', component: expect.any(Object) },
  //     // Add other tabs as needed
  //   ];

  //   expectedTabs.forEach((expectedTab) => {
  //     expect(tabIndexes).toContainEqual(expectedTab);
  //   });
  // });

  // Add more specific tests as needed for your use case
});

// ********************************** Tabs component *****************************
describe('Tabs component', () => {
  test('renders tab labels', () => {
    const { getByText } = render(
      <Provider store={store}>
        <UnderlineTabs />
      </Provider>,
    );

    const peopleTab = getByText('People');
    expect(peopleTab).toBeInTheDocument();
  });
  test('changes active tab on click', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <UnderlineTabs />
      </Provider>,
    );

    const initialTabContent = getByTestId('tab-panel-people');
    expect(initialTabContent).toBeInTheDocument();

    const otherTab = getByText('People'); // Replace 'AnotherTabLabel' with the actual label
    fireEvent.click(otherTab);
  });
});
