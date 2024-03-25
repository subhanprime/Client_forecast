import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import ProjectApp from './App';
import { store } from './redux/store';
import './index.css';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement,
// );

// root.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <ProjectApp />
//   </Provider>,
//   // </React.StrictMode>,
// );
export default ProjectApp;
