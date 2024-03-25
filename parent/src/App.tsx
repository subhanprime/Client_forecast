import React from 'react';
import './App.css';
import PeopleApplication from '@tuomo/people';
import Reports from '@tuomo/reports';
import ProjectApp from '@tuomo/project';
import Scheduling from '@tuomo/scheduling';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Sidebar from './components/sidebar';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';

function App() {
  return (
    <div>
      <Router>
        <div className="flex w-full h-full fixed">
          <Sidebar />
          <div className="w-full relative overflow-y-scroll">
            <Routes>
              <Route path="/" element={<Navigate to="/scheduling" />} />
              <Route path="/people" element={<PeopleApplication />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/project" element={<ProjectApp />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
