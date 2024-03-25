import React from 'react';
import { Provider } from 'react-redux';
import ReportsScreen from './screen/report';
import { store } from './redux/store/store';
import 'react-day-picker/dist/style.css';

function ReportApp() {
  return (
    <Provider store={store}>
      <ReportsScreen />
    </Provider>
  );
}

export default ReportApp;
