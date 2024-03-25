import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import { useSelector, Provider } from 'react-redux';
import MainPage from './pages/main';
// import { } from './redux/slice/clientSlice'
// import { } from './redux/store';
import { store, RootState } from './redux/store';

function ProjectApp() {
  return (
    // <BrowserRouter>
    //   <Provider store={store}>
    //     <Routes>
    //       <Route path="/" element={<MainPage />} />
    //     </Routes>
    //   </Provider>
    // </BrowserRouter>
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default ProjectApp;
