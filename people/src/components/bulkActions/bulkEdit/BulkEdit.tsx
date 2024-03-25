import React, { useEffect, useState } from 'react';
import DynamicDropdown, { DropdownData } from '../../dropdown/DynamicDropdown';
import {
  departmentOptions, fieldOptions, roleOptions, typeOptions,
} from '../../../constansts/accessForm';
import TagsField from '../tagField/TagsField';
// import { useAppSelector } from '../../../app/hooks';

function BulkEdit({ closeModal, isModalOpen, numberOfUsers }:any) {
  const [fieldFlag, setFieldFlag] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<DropdownData | null>(null);
  const [tags, setTags] = useState<string[] | null>([]);
  const [selectedRole, setSelectedRole] = useState<DropdownData | null>(null);
  const [selectedType, setSelectedType] = useState<DropdownData | null>(null);
  // const departments = useAppSelector((state) => state.data.departments);

  const handleSelectField = (data:DropdownData | null) => {
    if (data) {
      setSelectedField(data);
      setFieldFlag(data.name);
    }
  };

  const handleSelectRole = (data:DropdownData | null) => {
    if (data) {
      setSelectedRole(data);
    }
  };
  const handleSelectType = (data:DropdownData | null) => {
    if (data) {
      setSelectedType(data);
    }
  };
  // console.log('Triggered', departments);
  useEffect(() => {
    setFieldFlag('Role');
  }, []);
  return (
    <div>
      {/* Main modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className={`${
            isModalOpen ? 'fixed flex' : 'hidden'
          } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-start w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white/40 bg-opacity-50`}
          onClick={closeModal}
        >
          <div
            className="relative p-4 w-full max-w-xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-2xl  mt-24">
              <div className="px-4 text-2xl font-semibold py-4">
                Edit
                {' '}
                {numberOfUsers}
                {' '}
                Users
              </div>
              <div className="flex flex-col gap-3 py-3">
                <div className=" rounded flex flex-col gap-2 items-center p-4">
                  <div className="self-start">
                    Field
                  </div>
                  <div className="w-full">
                    <DynamicDropdown
                      data={fieldOptions}
                      defaultName="Select Field"
                      icon={null}
                      dropSize="large"
                      hasChevron
                      className="w-full flex items-center justify-between px-3 py-1 text-gray-700 bg-white rounded selection-none border"
                      containerStyle="w-full rounded-lg"
                      selected={selectedField}
                      setSelected={setSelectedField}
                      isCancelable
                      onSelection={handleSelectField}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 py-2">
                {fieldFlag === 'Role' && (
                  <div className=" rounded flex flex-col gap-2 items-center p-4">
                    <div className="self-start">
                      Role
                    </div>
                    <div className="w-full">
                      <DynamicDropdown
                        data={roleOptions}
                        defaultName="Select Role"
                        icon={null}
                        dropSize="large"
                        hasChevron
                        className="w-full flex items-center justify-between px-3 py-1 text-gray-700 bg-white rounded-md selection-none border"
                        containerStyle="w-full rounded-lg"
                        selected={selectedRole}
                        setSelected={setSelectedRole}
                        isCancelable
                        onSelection={handleSelectRole}
                      />
                    </div>
                  </div>
                )}
                {fieldFlag === 'Department' && (
                  <div className=" rounded flex flex-col gap-2 items-center p-4">
                    <div className="self-start">
                      Department
                    </div>
                    <div className="w-full">
                      <DynamicDropdown
                        data={departmentOptions}
                        defaultName="Select Department"
                        icon={null}
                        dropSize="large"
                        hasChevron
                        className="w-full flex items-center justify-between px-3 py-1 text-gray-700 bg-white rounded-md selection-none border"
                        containerStyle="w-full rounded-lg"
                        selected={selectedRole}
                        setSelected={setSelectedRole}
                        isCancelable
                        onSelection={handleSelectRole}
                      />
                    </div>
                  </div>
                )}
                {fieldFlag === 'Tags' && (
                  <div className=" rounded flex flex-col gap-2 items-center p-4">
                    <div className="self-start">
                      Tags
                    </div>
                    <div className="w-full">
                      <TagsField tags={tags} setTags={setTags} />
                    </div>

                  </div>
                )}
                {fieldFlag === 'Type' && (
                  <div className=" rounded flex flex-col gap-2 items-center p-4">
                    <div className="self-start">
                      Department
                    </div>
                    <div className="w-full">
                      <DynamicDropdown
                        data={typeOptions}
                        defaultName="Select Type"
                        icon={null}
                        dropSize="large"
                        hasChevron
                        className="w-full flex items-center justify-between px-3 py-1 text-gray-700 bg-white rounded-md selection-none border"
                        containerStyle="w-full rounded-lg"
                        selected={selectedType}
                        setSelected={setSelectedType}
                        isCancelable
                        onSelection={handleSelectType}
                      />
                    </div>
                  </div>
                )}
                {fieldFlag === 'Hourly rate' && (
                  <div className=" rounded flex flex-col gap-2 items-start p-4">
                    <div className="w-[100px] ">
                      <label className="block w-full mb-2 text-sm font-normal text-gray-900 dark:text-white">Hourly rate</label>
                      <input
                        type="text"
                        placeholder="RS. 0"
                        id="hourlyRate"
                        className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
                <div className="flex gap-2 mt-3 px-4">
                  <button type="button" className="bg-blue-600 text-neutral-100 px-2 h-10 rounded-md text-sm">Update</button>
                  <button type="button" onClick={closeModal} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BulkEdit;
