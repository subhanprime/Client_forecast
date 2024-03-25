import React, { useEffect, useState } from 'react';
import DynamicDropdown, { DropdownData } from '../../dropdown/DynamicDropdown';
import Options from '../../options/Options';
import { Admin, Manager, MemberOptions } from '../../../constansts/accessForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setPeopleManager } from '../../../features/data/dataSlice';

function Access({ onClose }:any) {
  const [selected, setSelected] = useState<DropdownData | null>(null);
  const [selectFlag, setSelectFlag] = useState<DropdownData | null>(null);
  const [selectDep, setSelectDep] = useState<DropdownData | null>(null);
  const [departmentsDrop, setDepartmentsDrop] = useState<DropdownData[] | null>(null);
  const [enableDepDrop, setEnableDepDrop] = useState(false);
  const departments = useAppSelector((state) => state.data.departments);
  const dispatch = useAppDispatch();

  const onDropdownSelect = (data:DropdownData | null) => {
    // console.log('YOLO', data?.name);
    setSelectFlag(data);
  };

  const handleOptionSelect = (data:DropdownData | null) => {
    if (!data) {
      setEnableDepDrop(false);
      return;
    }
    if (data.name === 'Departments') {
      setEnableDepDrop(true);
      return;
    }
    setEnableDepDrop(false);
  };
  useEffect(() => {
    if (departments.length > 0) {
      const temp:DropdownData[] = departments.map((pro) => ({
        id: pro.department_id,
        name: pro.name,
        subtext: null,
        symbol: null,
        icon: null,
      }));
      setDepartmentsDrop(temp);
    }
  }, [departments]);
  useEffect(() => {
    if (selectFlag?.name === 'Admin') {
      dispatch(setPeopleManager(true));
    } else {
      dispatch(setPeopleManager(false));
    }
  }, [selectFlag]);

  const accessOptions = [

    {
      name: 'Member', icon: null, symbol: null, subtext: 'Can view schedule and optionally manage their own tasks and/or time off',
    },
    {
      name: 'Manager', icon: null, symbol: null, subtext: 'Can manage specific departments, people and/or projects',
    },
    {
      name: 'Admin', icon: null, symbol: null, subtext: 'Can manage all people, projects and team settings',
    },
  ];

  const handleToggle = (name:string, toggle:boolean) => {
    if (name === 'People Manager') {
      dispatch(setPeopleManager(toggle));
    }
  };
  return (
    <div data-testid="mock-select" className="flex flex-col gap-3 py-3">
      <div className="bg-gray-100 rounded flex flex-col gap-2 items-center  p-4">
        <div className="self-start">
          Access
        </div>

        <DynamicDropdown
          data={accessOptions}
          defaultName="No access right"
          icon={null}
          dropSize="large"
          hasChevron
          className="w-full flex items-center justify-between px-4 py-2 text-gray-700 bg-white rounded selection-none"
          containerStyle="w-full rounded-lg"
          selected={selected}
          setSelected={setSelected}
          onSelection={onDropdownSelect}
          isCancelable
        />

      </div>
      {selectFlag?.name === 'Member' && (
        <div className="flex gap-2 flex-col">
          {MemberOptions.map((opt, index) => (
            <div key={opt.heading} className={`${index + 1 !== MemberOptions.length ? 'border-b border-black/20' : ''} pb-1`}>

              <Options
                icon={opt.icon}
                heading={opt.heading}
                substring={opt.substring}
                data={opt.data}
                onSelect={opt.heading === 'Can View' ? handleOptionSelect : undefined}
              />

              {opt.heading === 'Can View' && departmentsDrop && enableDepDrop && (
                <div className="w-full mt-4 border border-black/30 rounded mb-6">
                  <DynamicDropdown
                    data={departmentsDrop}
                    defaultName="Select Department"
                    icon={null}
                    dropSize="large"
                    hasChevron
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-700 bg-white rounded selection-none"
                    containerStyle="w-full rounded-lg"
                    selected={selectDep}
                    setSelected={setSelectDep}
                    isCancelable

                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {selectFlag?.name === 'Manager' && (
        <div className="flex gap-2 flex-col">
          {Manager.map((opt, index) => (
            <div key={opt.heading} className={`${index + 1 !== MemberOptions.length ? 'border-b border-black/20' : ''} pb-1`}>

              <Options
                icon={opt.icon}
                heading={opt.heading}
                substring={opt.substring}
                data={opt.data}
                onSelect={opt.heading === 'Can View' ? handleOptionSelect : undefined}
                isToggle={opt.isToggle !== undefined}
                onToggleChange={opt.isToggle !== undefined ? handleToggle : undefined}
              />

              {opt.heading === 'Can View' && departmentsDrop && enableDepDrop && (
                <div className="w-full mt-4 border border-black/30 rounded mb-6">
                  <DynamicDropdown
                    data={departmentsDrop}
                    defaultName="Select Department"
                    icon={null}
                    dropSize="large"
                    hasChevron
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-700 bg-white rounded selection-none"
                    containerStyle="w-full rounded-lg"
                    selected={selectDep}
                    setSelected={setSelectDep}
                    isCancelable

                  />
                </div>
              )}
            </div>
          ))}
          <div className="ml-3">
            <div className=" text-lg font-bold mt-3">
              Additional persmissions
            </div>
            <div className="flex items-center gap-5 mt-2">
              <div className="flex items-center">
                <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>Create and edit people</div>
            </div>
            <div className="flex items-center gap-5 mt-2">
              <div className="flex items-center">
                <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>View everyone`s rates and their project budgets</div>
            </div>
          </div>
        </div>
      )}
      {selectFlag?.name === 'Admin' && (

        <div className="flex gap-2 flex-col">
          {Admin.map((opt, index) => (
            <div key={opt.heading} className={`${index + 1 !== MemberOptions.length ? 'border-b border-black/20' : ''} pb-1`}>

              <Options
                icon={opt.icon}
                heading={opt.heading}
                substring={opt.substring}
                data={opt.data}
                text={opt.text}
                // onSelect={opt.heading === 'Can View' ? handleOptionSelect : undefined}
              />

            </div>
          ))}
        </div>
      )}
      {selectFlag === null && (
        <div>
          Once access rights are selected, your teammate will receive an email invitation to
          join your team.
        </div>
      )}

      <div className="flex gap-2 mt-4 mb-4">
        <button type="button" className="bg-blue-500 text-neutral-100 px-2 h-10 rounded-md text-sm">Add & Invite Person</button>
        <button type="button" onClick={onClose} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
      </div>
    </div>
  );
}

export default Access;
