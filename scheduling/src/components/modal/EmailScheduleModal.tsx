import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import _ from 'lodash';
import Modal from './Modal';
import DateRangePicker from '../datapicker/DateRangePicker';
import { useAppSelector } from '../../app/hooks';
import { DateRangeDrop, DropdownData } from '../../constants';
import Dropdown from '../dropdown/Dropdown';

interface EmailModalProps {
  visibility:boolean;
  closeModal: ()=>void;

}

function InitialIcon({ name }:{ name:string }) {
  return (
    <div
      className="w-8 h-8 flex items-center
          justify-center rounded-full bg-blue-400 text-white mr-3"
    >
      {name}
    </div>
  );
}

function getInitials(name:string) {
  const nameArray = name.split(' ');
  return nameArray.map((word:any) => word[0]).join('').toUpperCase();
}
function EmailScheduleModal({ visibility, closeModal }:EmailModalProps) {
  const { peopleTasks, people } = useAppSelector((state) => state.sheduler);
  const [selectedPeople, setSelectedPeople] = useState<DropdownData[]>([]);
  const [dropData, setDropdata] = useState<DropdownData[]>([]);

  useEffect(() => {
    if (peopleTasks) {
      const data:DropdownData[] = _.compact(peopleTasks.map((person) => {
        if (person.email) {
          return {
            id: person.people_id,
            name: person.name,
            symbol: null,
            icon: () => <InitialIcon name={getInitials(person.name)} />,
          };
        }
        return undefined;
      }));
      setDropdata(data);
    }
  }, [peopleTasks]);
  useEffect(() => {
    setSelectedPeople([]);
  }, [visibility]);

  const handleSelect = (data:DropdownData) => {
    setDropdata(dropData.filter((drop) => drop?.id !== data?.id));
    setSelectedPeople([...selectedPeople, data]);
  };
  const handleRemoveSelected = (data:DropdownData) => {
    setSelectedPeople(selectedPeople.filter((drop) => drop?.id !== data?.id));
    setDropdata([...dropData, data]);
  };

  const getEmail = (person:DropdownData) => {
    const temp = people?.get(person?.id as number);
    if (temp) {
      return temp.email;
    }
    return '';
  };

  return (
    <Modal visibility={visibility} closeModal={closeModal} place="top">
      <div className="flex flex-col gap-6 px-5 py-7">
        <div className="flex px-3 w-full justify-between ">
          <div className="text-2xl font-medium text-black/70">
            Email their schedule
          </div>
          <button
            type="button"
            className="px-3 py-2 font-medium text-xs text-indigo-700 border-indigo-700 hover:bg-indigo-200 border rounded"
          >
            See example
          </button>
        </div>
        <div className="bg-gray-200/60 w-full rounded-md px-3 py-5">
          <div className="text-xs font-semibold text-black/60">Timeframe</div>

          <DateRangePicker DateRangeDrop={DateRangeDrop} />
        </div>
        <div>
          <Dropdown
            data={dropData}
            defaultName="Select People"
            dropSize="large"
            className="w-full flex justify-between px-2 py-2 text-sm border hover:bg-indigo-100/80 hover:border-indigo-700  border-black/20 rounded items-center"
            hasChevron
            icon={null}
            isSelect
            isNameShown={false}
            defaultNameShown
            selectable={false}
            hoverContainer=""
            onSelection={handleSelect}
          />
        </div>
        <div className="min-h-[130px]">
          {selectedPeople.map((person) => (
            <div key={person.id} className="flex justify-between items-center p-2 border-b rounded text-sm">
              <div className="flex items-center">
                <InitialIcon name={getInitials(person.name)} />
                <div>{person.name}</div>
              </div>
              <div>
                {getEmail(person)}
              </div>
              <div data-testid="remove-person" onClick={() => handleRemoveSelected(person)} className="hover:bg-gray-300/70 rounded p-2 active:bg-gray-300">
                <X size={15} />
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm flex flex-col gap-2">
          <div>Message (Optional)</div>
          <input type="text" name="message" id="message" className="w-full px-3 py-2 rounded border-gray-200 hover:border-indigo-500 focus:border-indigo-400 outline-none border" />
        </div>
        <div className="flex gap-3">
          <button data-testid="email-button" type="button" className="px-3 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 rounded text-white transition-all duration-200">
            Email schedule
            {' '}
            {selectedPeople.length > 0 ? `to ${selectedPeople.length} person` : ''}
          </button>
          <button data-testid="cancel-button" onClick={() => closeModal()} type="button" className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded ">Cancel</button>
        </div>

      </div>

    </Modal>
  );
}

export default EmailScheduleModal;
