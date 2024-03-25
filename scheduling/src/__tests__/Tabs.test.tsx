import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tabs from '../components/tabs/Tabs';

const mockItems = [
  { title: 'Tab 1', content: () => <div>Tab 1 Content</div> },
  { title: 'Tab 2', content: () => <div>Tab 2 Content</div> },
  // Add more mock items if needed
];

describe('Tabs Component', () => {
  it('renders tabs correctly', () => {
    const { getByText } = render(<Tabs items={mockItems} active="Tab 1" />);

    mockItems.forEach((item) => {
      expect(getByText(item.title)).toBeInTheDocument();
    });
  });
  it('renders tabs and checked if active value is set', () => {
    const { getByText } = render(<Tabs items={mockItems} active="Tab 1dsad" />);

    mockItems.forEach((item) => {
      expect(getByText(item.title)).toBeInTheDocument();
    });
  });

  it('renders default tab content', () => {
    const { getByText } = render(<Tabs items={mockItems} active="Tab 1" />);

    expect(getByText('Tab 1 Content')).toBeInTheDocument();
  });

  it('changes active tab on click', () => {
    const { getByText } = render(<Tabs items={mockItems} active="Tab 1" />);

    fireEvent.click(getByText('Tab 2'));

    expect(getByText('Tab 1 Content')).toBeInTheDocument();
    expect(getByText('Tab 2 Content')).toBeInTheDocument();
  });
});
