import { Provider } from 'react-redux';
import React from 'react';
import People from './pages/people';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { store } from './app/store';

function PeopleApplication() {
  return (
    <Provider store={store}>
      <Navbar />
      <People />
    </Provider>
  );
}

export default PeopleApplication;
