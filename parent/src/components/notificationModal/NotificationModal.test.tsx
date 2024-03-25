import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotificationModal from './NotificationModal';

describe('NotificationModal', () => {
//   it('renders NotificationModal component correctly', () => {
//     const { getByAltText, getByTestId } = render(<NotificationModal onClose={() => {}} />);

  //     // Check if the bell icon is rendered
  //     const bellIcon = getByAltText('Bell');
  //     expect(bellIcon).toBeInTheDocument();

  //     // Check if the "Notifications" text is rendered
  //     const notificationsText = getByTestId('notifications');
  //     expect(notificationsText).not.toBeInTheDocument();
  //   });
  it('renders NotificationModal component correctly', () => {
    const {
      getByAltText,
      queryByText, getByTestId,
      getByText,
    } = render(<NotificationModal onClose={() => {}} />);

    // Check if the bell icon is rendered
    const bellIcon = getByAltText('Bell');
    expect(bellIcon).toBeInTheDocument();

    // Check if the "Notifications" text is not initially rendered
    const notificationsText = queryByText('Notifications');
    expect(notificationsText).not.toBeInTheDocument();

    // Simulate clicking the bell icon to open the modal
    fireEvent.click(bellIcon);

    // Check if the "Notifications" text is now rendered
    const notificationsTextAfterClick = getByText('Notifications');
    expect(notificationsTextAfterClick).toBeInTheDocument();

    // Check if the "notifications" data-testid is present in the modal
    const notificationsContainer = getByTestId('notifications');
    expect(notificationsContainer).toBeInTheDocument();
  });

  it('opens and closes NotificationModal on bell icon click', () => {
    const {
      getByAltText, queryByText,
      getByText,
    } = render(<NotificationModal onClose={() => {}} />);

    // Check if the modal is initially closed
    const notificationsText = queryByText('notifications');
    expect(notificationsText).not.toBeInTheDocument();

    // Simulate clicking the bell icon to open the modal
    const bellIcon = getByAltText('Bell');
    fireEvent.click(bellIcon);

    // Check if the modal is now open
    const notificationsTextAfterClick = getByText('Notifications');
    expect(notificationsTextAfterClick).toBeInTheDocument();
  });
});
