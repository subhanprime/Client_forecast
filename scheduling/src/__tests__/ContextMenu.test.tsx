import React from 'react';
import {
  fireEvent, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import '@testing-library/jest-dom';
import ContextMenu from '../components/context-menu/ContextMenu';
import { renderWithProviders } from '../utils/testUtils';

describe('ContextMenu', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ContextMenu />);
  });

  it('opens context menu on right click', () => {
    const { getByTestId } = renderWithProviders(
      <div data-testid="grid" className="grid-stack">
        <ContextMenu />
      </div>,
    );
    const contextMenuButton = getByTestId('grid');

    fireEvent.contextMenu(contextMenuButton);

    const contextMenu = getByTestId('context-menu');
    expect(contextMenu).toBeInTheDocument();
  });

  it('closes context menu on outside click', async () => {
    const { getByTestId } = renderWithProviders(
      <div data-testid="grid" className="grid-stack">
        <ContextMenu />
      </div>,
    );
    const contextMenuButton = getByTestId('grid');

    fireEvent.contextMenu(contextMenuButton);

    const contextMenu = getByTestId('context-menu');
    expect(contextMenu).toBeInTheDocument();

    fireEvent.click(document.body); // Click outside the context menu

    await waitFor(() => {
      expect(contextMenu).not.toBeInTheDocument();
    });
  });

  it('handles button click and toggles visibility', () => {
    const { getByTestId } = renderWithProviders(<ContextMenu />);
    const contextMenuButton = getByTestId('context-menu-button');

    fireEvent.click(contextMenuButton);

    const contextMenu = getByTestId('context-menu');
    expect(contextMenu).toBeInTheDocument();

    fireEvent.click(contextMenuButton);

    expect(contextMenu).not.toBeInTheDocument();
  });

  it('handles context menu button click and toggles visibility', () => {
    const { getByTestId } = renderWithProviders(<ContextMenu />);
    const contextMenuButton = getByTestId('context-menu-button');

    fireEvent.click(contextMenuButton);

    const contextMenu = getByTestId('context-menu');
    expect(contextMenu).toBeInTheDocument();

    fireEvent.click(contextMenuButton);

    expect(contextMenu).not.toBeInTheDocument();
  });

  it('does not open context menu if clicked outside the grid-stack', () => {
    const { getByTestId } = renderWithProviders(
      <div data-testid="grid" className="grid-stack">
        <ContextMenu />
      </div>,
    );

    const contextMenuButton = getByTestId('grid');

    fireEvent.contextMenu(contextMenuButton);

    const contextMenu = getByTestId('context-menu');
    expect(contextMenu).toBeInTheDocument();

    fireEvent.click(document.body); // Click outside the context menu
    fireEvent.contextMenu(document.body);

    expect(contextMenu).not.toBeInTheDocument();
  });

  it('handles button click and sets correct position', () => {
    const { getByTestId } = renderWithProviders(<ContextMenu />);
    const contextMenuButton = getByTestId('context-menu-button');

    fireEvent.click(contextMenuButton, { clientX: 100, clientY: 200 });

    const contextMenu = getByTestId('context-menu');
    expect(contextMenu).toBeInTheDocument();
    expect(contextMenu).toHaveStyle('top: 200px; left: 100px;');
  });
  it('handles button click and sets correct position', () => {
    const { getByTestId } = renderWithProviders(<ContextMenu />);
    const contextMenuButton = getByTestId('context-menu-button');

    fireEvent.click(contextMenuButton, { clientX: 100, clientY: 200 });

    const contextMenu = getByTestId('context-menu');
    expect(contextMenu).toBeInTheDocument();
    const button = screen.getByText('Add/Edit');

    if (button) {
      fireEvent.click(button);
    }
  });
});
