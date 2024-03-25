// __tests__/ModalHandler.test.js

import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils/testUtils';
import ModalHandler from '../components/modal/ModalHandler';
import { setupStore } from '../app/store';
import { openModal } from '../feature/modal/modalSlice';
import { Modals } from '../constants';

describe('ModalHandler component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = renderWithProviders(<ModalHandler />);
    expect(getByTestId('modal-handler')).toBeInTheDocument();
  });
  it('renders with management modal', async () => {
    const store = setupStore();
    store.dispatch(openModal({
      name: Modals.Alloc,
      isOpen: true,
      hasConfirmation: true,
    }));

    const { getByTestId } = renderWithProviders(<ModalHandler />, { store });
    expect(getByTestId('modal-handler')).toBeInTheDocument();

    await waitFor(() => {
      const modal = getByTestId('modal');
      expect(modal).toBeInTheDocument();
      fireEvent.click(modal);
    });
  });
  it('renders with confirm modal', async () => {
    const store = setupStore();
    store.dispatch(openModal({
      name: Modals.Confirm,
      isOpen: true,
    }));

    const { getByTestId } = renderWithProviders(<ModalHandler />, { store });
    expect(getByTestId('modal-handler')).toBeInTheDocument();

    await waitFor(() => {
      const modal = getByTestId('modal');
      expect(modal).toBeInTheDocument();
      fireEvent.click(modal);
    });
  });
  it('renders with email sched modal', async () => {
    const store = setupStore();
    store.dispatch(openModal({
      name: Modals.Email,
      isOpen: true,
    }));

    const { getByTestId } = renderWithProviders(<ModalHandler />, { store });
    expect(getByTestId('modal-handler')).toBeInTheDocument();

    await waitFor(() => {
      const modal = getByTestId('modal');
      expect(modal).toBeInTheDocument();
      fireEvent.click(modal);
    });
  });

  it('renders with export sched modal', async () => {
    const store = setupStore();
    store.dispatch(openModal({
      name: Modals.Export,
      isOpen: true,
    }));

    const { getByTestId } = renderWithProviders(<ModalHandler />, { store });
    expect(getByTestId('modal-handler')).toBeInTheDocument();

    await waitFor(() => {
      const modal = getByTestId('modal');
      expect(modal).toBeInTheDocument();
      fireEvent.click(modal);
    });
  });

  it('renders with save filter modal', async () => {
    const store = setupStore();
    store.dispatch(openModal({
      name: Modals.Filter,
      isOpen: true,
    }));

    const { getByTestId } = renderWithProviders(<ModalHandler />, { store });
    expect(getByTestId('modal-handler')).toBeInTheDocument();

    await waitFor(() => {
      const modal = getByTestId('modal');
      expect(modal).toBeInTheDocument();
      fireEvent.click(modal);
    });
  });

  it('renders with delete confirm modal', async () => {
    const store = setupStore();
    store.dispatch(openModal({
      name: Modals.Delete,
      isOpen: true,
      title: 'dsdf',
      type: 'dasd',
      onDelete: () => {},
    }));

    const { getByTestId } = renderWithProviders(<ModalHandler />, { store });
    expect(getByTestId('modal-handler')).toBeInTheDocument();

    await waitFor(() => {
      const modal = getByTestId('modal');
      expect(modal).toBeInTheDocument();
      fireEvent.click(modal);
    });
  });
  it('renders with task modal', async () => {
    const store = setupStore();
    store.dispatch(openModal({
      name: Modals.Task,
      isOpen: true,
      task: {
        id: 1,
        time: 3,
        name: 'Task Name',
        color: '#FF0000',
        x: 0,
        w: 1,
        h: 1,
        startDate: '2023-10-10',
        endDate: '2023-10-10',
        modifiedBy: 543543,
        modifiedDate: '2023-10-10',
        personName: 'Me',
      },
    }));

    const { getByTestId } = renderWithProviders(<ModalHandler />, { store });
    expect(getByTestId('modal-handler')).toBeInTheDocument();

    await waitFor(() => {
      const modal = getByTestId('modal');
      expect(modal).toBeInTheDocument();
      fireEvent.click(modal);
    });
  });
});
