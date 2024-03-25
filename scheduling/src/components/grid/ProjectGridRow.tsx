import { Moment } from 'moment';
import React, { useState } from 'react';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import GridRow from './GridRow';
import { useAppSelector } from '../../app/hooks';
import { rowsViewConstants } from '../../constants';

interface Prop {
  daysArray : Moment[];
  project:ProjectTask;
  projects:ProjectsMap;
  scrolled:boolean;
  scrollPosition:{
    top:number, left:number
  }
}

function ProjectGridRow({
  scrollPosition, scrolled, project, daysArray, projects,
}:Prop) {
  const [isOpen, setIsOpen] = useState(true);
  const { rowsType } = useAppSelector((state) => state.calender);
  return (
    <div>
      <div
        style={{
          left: !scrolled ? scrollPosition.left : 0,
        }}
        className={`${scrolled ? 'fixed' : 'absolute'}  w-[250px] border-b custom-shadow border-black/20 bg-white select-none z-[999] group`}
      >

        <div style={{ borderLeft: `5px solid #${project.color}`, minHeight: `${rowsViewConstants[rowsType].full}px` }} className="w-[250px] bg-white  z-50 px-3 py-3">
          <div className="h-full w-full flex items-center">

            <div>{project.name}</div>

          </div>
          <div data-testid="toggle-button" onClick={() => setIsOpen(!isOpen)} className="group-hover:flex hidden text-xs  gap-1 cursor-pointer absolute right-1 bottom-3">
            <div>
              {project.people.length}
              {' '}
              People
            </div>
            {isOpen ? <ChevronsDownUp size={15} /> : <ChevronsUpDown size={15} /> }
          </div>
        </div>
      </div>

      <div
        style={{ display: 'flex', minHeight: `${rowsViewConstants[rowsType].full}px` }}
        className="grid-row-custom ml-[250px] w-[calc(100%-250px)] bg-gray-100"
      />
      {isOpen && project.people.map((person) => (
        <GridRow
          scrolled={scrolled}
          scrollPosition={scrollPosition}
          key={`${person.people_id}-${person.tasks.length}`}
          daysArray={daysArray}
          person={person}
          projects={projects}
          projectId={project.project_id}
          projectColor={project.color}
        />
      ))}

    </div>
  );
}

export default ProjectGridRow;
