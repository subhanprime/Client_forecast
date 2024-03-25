import React, { useState } from 'react';
import { lowerCase, size } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  collection,
  updateDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import firestore from '../../firebase/index';
import InputFields from './fieldsInput';
import ClientFields from './clientFields';
import TagsField from './tagsFields';
import TypeFields from './typeFields';
import BudgetFields from './budgetFields';
import { updateBulkProjects } from '../../redux/slice/createProjectSlice';
import { ProjectObject, BulkEditorModalProps } from '../constant/bulkActions';
import { BulkField } from '../constant/enums';
import Spinner from '../spinner';

function BulkEditHandler(
  {
    isBulkEditOpen,
    onBulkEditClose,
    selectedRowsIds,
    selectedUuidIds,
  }: BulkEditorModalProps,
) {
  const [selectedOption, setSelectedOption] = useState('client');
  const [client, setClient] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [hoursByProject, setHoursByProject] = useState<number>();
  const [isBillable, setIsBillable] = useState<boolean | undefined>(undefined);
  const [isTentative, setIsTentative] = useState<boolean | undefined>(undefined);
  const [selectedBudget, setSelectedBudget] = useState<string | undefined>(undefined);
  const [isDifferentRate, setIsDifferentRate] = useState<string | undefined>(undefined);
  const [totalProjectHours, setTotalProjectHours] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const updateBulkOptions = () => {
    setLoading(true);
    const createFilteredObject = (...args: [any, any][]) => {
      const filteredObject: { [key: string]: any } = {};

      args.forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (key === 'tags' && value.length === 0) return;
          filteredObject[key] = value;
        }
      });
      // console.log('selectedRowsIds', selectedRowsIds);

      return filteredObject;
    };

    const filteredObject = createFilteredObject(
      ['client', client],
      ['tags', tags],
      ['isBillable', isBillable],
      ['isTentative', isTentative],
      ['totalProjectHour', hoursByProject],
      ['isDifferentRate', isDifferentRate],
      ['selectedBudget', selectedBudget],

    );

    const updateMultipleRecords = async (recordUpdates: ProjectObject[]) => {
      const batch = writeBatch(firestore);

      recordUpdates.forEach((update) => {
        // const { uuid, project_id } = update;
        if (update.project_id) {
          const docRef = doc(firestore, 'projects', `${update.project_id}`);
          // const docRef = collection(firestore, 'projects', uuid)
          batch.update(docRef, { ...update, ...filteredObject });
        }
      });

      try {
        await batch.commit();
        setLoading(false);
        onBulkEditClose();
        console.log('Multiple records updated successfully');
      } catch (error) {
        setLoading(false);
        onBulkEditClose();
        console.error('Error updating multiple records:', error);
      }
    };

    updateMultipleRecords(selectedUuidIds);

    dispatch(updateBulkProjects({ filteredObject, selectedRowsIds } as any));
    // console.log('filteredObject', filteredObject);
  };

  return (
    <div>
      {isBulkEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="fixed inset-0 transition-opacity" onClick={onBulkEditClose}>
            {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
          </div>
          <div className="z-50 relative bg-white p-5 rounded-lg shadow-2xl min-w-[500px]">
            <div className="text-gray-900">
              <div className="text-xl font-semibold mb-5">{`Edit ${size(selectedRowsIds)} projects`}</div>
              <InputFields
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              {
                selectedOption === lowerCase(BulkField.Client)
                && <ClientFields client={client} setClient={setClient} />
              }
              {
                selectedOption === lowerCase(BulkField.Tags)
                && <TagsField tags={tags} setTags={setTags} />
              }
              {
                selectedOption === lowerCase(BulkField.Type)
                && (
                  <TypeFields
                    isTentative={isTentative}
                    setIsTentative={setIsTentative}
                    isBillable={isBillable}
                    setIsBillable={setIsBillable}
                  />
                )
              }
              {
                selectedOption === 'budget' && (
                  <BudgetFields
                    hoursByProject={hoursByProject}
                    setHoursByProject={setHoursByProject}
                    isDifferentRate={isDifferentRate}
                    setIsDifferentRate={setIsDifferentRate}
                    selectedBudget={selectedBudget}
                    setSelectedBudget={setSelectedBudget}
                    totalProjectHours={totalProjectHours}
                    setTotalProjectHours={setTotalProjectHours}
                  />
                )
              }
              <button
                type="button"
                onClick={updateBulkOptions}
                className="mt-4 px-4 py-2 bg-blue-500 rounded focus:outline-none text-base font-medium text-white me-2"
              >
                {loading && <Spinner width="w-4 me-1" height="h-4" />}
                Update
              </button>

              <button
                type="button"
                onClick={onBulkEditClose}
                className="mt-4 px-4 py-2 bg-gray-400 rounded focus:outline-none text-base font-medium text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BulkEditHandler;
