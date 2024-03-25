import React from 'react';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './app/store';
import Schedule from './pages/Schedule/Schedule';

function Scheduling() {
  return (
    <Provider store={store}>
      <div className="App w-full h-screen">

        <Schedule />

      </div>
    </Provider>
  );
}

export default Scheduling;
