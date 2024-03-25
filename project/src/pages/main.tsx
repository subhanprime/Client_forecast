import React from 'react';
import ProjectTable from '../components/projectTable';

export default function MainPage() {
  return (
    <div data-testid="main-page" className="">
      <div className="bg-white h-full">
        <ProjectTable />
      </div>
    </div>
  );
}
