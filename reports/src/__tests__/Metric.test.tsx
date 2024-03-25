import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import PastAndFutureMetric from '../components/pastAndFutureMetric';
import LoggedScheduledMetric from '../components/loggedScheduledMetric';
import LoggedMetric from '../components/loggedMetric';
import MetricDetails from '../components/metricDetail';
import MetricHeader from '../components/metricHeader';
import ScheduledMetric from '../components/scheduleMetric';
import { store } from '../redux/store/store';
// ********************************************People Dropdown**************************************

describe('Metric Test', () => {
// ********************************************Metric Detail***************************************
  const mockPropsMetricDetails = {
    name: 'Billable',
    hour: '264',
    percentage: '100',
    color: '#9B8CFF',
  };

  test('renders MetricDetails component with correct content', () => {
    // Render the component with mock props
    render(<MetricDetails {...mockPropsMetricDetails} />);

    // Check that the component renders the name, hour, and percentage correctly
    expect(screen.getByText('Billable')).toBeInTheDocument();
    expect(screen.getByText('264h')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
  // ********************************************Metric Header **************************************

  const mockPropsMetricHeader = {
    name: 'Capacity',
    hour: '2148',
    percentage: '89',
  };

  test('renders MetricHeader component with correct content', () => {
    // Render the component with mock props
    render(<MetricHeader {...mockPropsMetricHeader} />);

    // Check that the component renders the name, hour, and percentage correctly
    expect(screen.getByText('Capacity')).toBeInTheDocument();
    expect(screen.getByText('2148')).toBeInTheDocument(); // Adjust based on the actual structure
    expect(screen.getByText('89%')).toBeInTheDocument();

    // Check that the component renders the percentage only if it's provided
    render(<MetricHeader name="Capacity" hour="2148" percentage="" />);
    expect(screen.queryByText('%')).toBeNull();
  });

  // ******************************************** LoggedMetric Component *****************************

  test('renders LoggedMetric component with metric details', () => {
    // Render the component
    render(<LoggedMetric />);

    // Check that the metric headers are rendered
    // expect(screen.getByText('Capacity', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Past logged + Future scheduled')).toBeInTheDocument();
    expect(screen.getByText('Time Off')).toBeInTheDocument();
    expect(screen.getByText('Overtime')).toBeInTheDocument();

    // Check that the metric details are rendered
    expect(screen.getByText('Billable')).toBeInTheDocument();
    expect(screen.getByText('Non-billable')).toBeInTheDocument();
  });

  // ********************************** LoggedScheduledMetric Component *****************************

  test('renders LoggedScheduledMetric component', () => {
    render(
      <Provider store={store}>
        <LoggedScheduledMetric />
      </Provider>,
    );
    const loggedScheduledMetric = screen.getByText(/Logged/i);
    expect(loggedScheduledMetric).toBeInTheDocument();
  });

  test('renders metric details and headers correctly', () => {
    render(
      <Provider store={store}>
        <LoggedScheduledMetric />
      </Provider>,
    );
    const loggedHeader = screen.getByText(/Logged/i);
    const scheduledHeader = screen.getByText(/Scheduled/i);

    expect(loggedHeader).toBeInTheDocument();
    expect(scheduledHeader).toBeInTheDocument();

    // You can add more assertions based on your component's structure
    // For example, check if MetricDetails and MetricHeader components are rendered correctly
    // const billableDetails = screen.getByTestId('billable');
    // expect(billableDetails).toBeInTheDocument();

    // Add more assertions based on your component's structure
  });

  // ********************************** Past And Future Metric Component *****************************

  test('renders PassedAndFutureMetric component', () => {
    render(<PastAndFutureMetric />);
    const pastAndFutureMetric = screen.getByText(/Logged/i);
    expect(pastAndFutureMetric).toBeInTheDocument();
  });
});

describe('ScheduledMetric component', () => {
  it('renders with mock data', () => {
    // Mock data
    const mockData = {
      metrics: {
        totalCapacity: 100,
        totalScheduled: 50,
        totalBillable: 30,
        totalNonBillable: 20,
        totalTimeOff: 10,
        totalOvertime: 5,
        totalTentative: 5,
      },
    };

    render(
      <Provider store={store}>
        <ScheduledMetric />
      </Provider>,
    );

    const capacityHeader = screen.getByText('Capacity');
    expect(capacityHeader).toBeInTheDocument();
  });
});
