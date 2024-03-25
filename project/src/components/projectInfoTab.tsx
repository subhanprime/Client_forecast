import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addClients } from '../redux/slice/clientSlice';
import crossIcon from '../media/svg/crossIcon.svg';

interface ProjectInfoTabProps {
  isDifferentRate: string | number;
  setIsDifferentRate: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagInputValue: string;
  setTagInputValue: React.Dispatch<React.SetStateAction<string>>;
  isBillable: boolean;
  setIsBillable: React.Dispatch<React.SetStateAction<boolean>>;
  isTentative: boolean;
  setIsTentative: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBudget: string;
  setSelectedBudget: React.Dispatch<React.SetStateAction<string>>;
  perHourRate: number;
  setPerHourRate: React.Dispatch<React.SetStateAction<number>>;
  totalProjectHour: number;
  setTotalProjectHour: React.Dispatch<React.SetStateAction<number>>;

}

function ProjectInfoTab({
  isDifferentRate,
  setIsDifferentRate,
  inputValue,
  setInputValue,
  isOpen,
  setIsOpen,
  note,
  setNote,
  tags,
  setTags,
  tagInputValue,
  setTagInputValue,
  isBillable,
  setIsBillable,
  isTentative,
  setIsTentative,
  selectedBudget,
  setSelectedBudget,
  perHourRate,
  setPerHourRate,
  totalProjectHour,
  setTotalProjectHour,
}: ProjectInfoTabProps) {
  const clients = useSelector((state: RootState) => state.clientSlice.clients.map((el) => el.name));
  const [options, setOptions] = useState<string[]>(clients);
  const inputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBudget(e.target.value);
  };

  useEffect(() => {
    setOptions(clients);
  }, []);
  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      const dropdown = document.querySelector('.client-dropdown');
      const input = document.querySelector('.client-input');

      if (dropdown && !dropdown.contains(event.target) && input !== event.target) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [setIsOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setInputValue(value);
    // Filter options based on the input value
    const filteredOptions = clients.filter(
      (option) => option.toLowerCase().includes(value.toLowerCase()),
    );
    setOptions(filteredOptions);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsDifferentRate(e.target.value);
  };

  const handleBillableClick = () => {
    setIsBillable(true);
  };

  const handleNonBillableClick = () => {
    setIsBillable(false);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInputValue.trim() !== '') {
      if (!tags.includes(tagInputValue)) {
        setTags([...tags, tagInputValue]);
        setTagInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        // setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePerHourRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rateValue = parseFloat(e.target.value);
    if (rateValue) {
      setPerHourRate(rateValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setOptions([...options, inputValue]);
      setInputValue('');
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
  };

  const handleDropdownClick = (e: any) => setIsOpen(true);
  const handleProjectHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalProjectHour(parseInt(e.target.value, 10));
  };

  return (
    <div className="h-[460px] overflow-scroll pb-4">
      <span className="text-xs my-2 block text-gray-700 font-medium">Client</span>
      <div className="relative inline-block w-full">
        <div className="flex items-center border border-gray-300 rounded-md outline-none">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Select or add new option"
            className="client-input p-2 rounded-l-md flex-1 rounded-none border-none w-full outline-none"
            ref={inputRef}
            onFocus={() => setIsOpen(true)}
          />
          <div
            aria-label="s"
            id="dropdownControl"
            className="p-2 cursor-pointer"
            onClick={(e) => handleDropdownClick(e)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDropdownClick(e);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {isOpen && (
          <div className="client-dropdown absolute z-10 top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md w-full max-h-[250px] overflow-x-scroll">
            {options
              .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
              .map((option, index) => (
                <div
                  key={option}
                  className="p-2 cursor-pointer hover:bg-gray-100 w-full"
                  onClick={() => handleOptionClick(option)} // Ensure this part is correct
                  role="button"
                  tabIndex={0}
                >
                  {option}
                </div>
              ))}
          </div>
        )}
      </div>

      { /* note div code is here  */}

      <div className="mt-4">
        <span className="text-xs my-2 block text-gray-700 font-medium">Note</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)} // Update note state on change
          placeholder="Add a note..."
          className="p-2 mt-1 border border-gray-300 rounded-md w-full h-20 outline-none"
        />
      </div>

      {/* tag input here */}

      <span className="text-xs my-2 block text-gray-700 font-medium">Tags</span>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md">

        {tags.map((tag, index) => (
          <div key={index} className="text-gray-800 font-medium bg-gray-200 rounded-md flex items-center p-2">
            <span className="mr-1 text-gray-900 font-medium">{tag}</span>
            <button type="button" onClick={() => removeTag(tag)} className="focus:outline-none">
              <img src={crossIcon} alt="cross" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={tagInputValue}
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyDown}
          placeholder="Type and press Enter to add tags"
          className="flex-1 outline-none"
          ref={tagInputRef}
        />
      </div>

      {/* billable and non-bilable buttons here */}
      <div className="my-5 flex gap-4">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleBillableClick}
            className={`px-4 py-2 focus:outline-none font-medium rounded-s ${isBillable ? 'bg-blue-200 text-gray-800' : 'bg-gray-100 text-gray-400'}`}
          >
            Billable
          </button>
          <button
            type="button"
            onClick={handleNonBillableClick}
            className={`px-4 py-2 focus:outline-none font-medium rounded-e ${!isBillable ? 'bg-blue-200 text-gray-800' : 'bg-gray-100 text-gray-400'}`}
          >
            Non-billable
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsTentative(!isTentative)}
          className={`px-4 py-2 focus:outline-none font-medium rounded ${isTentative ? 'bg-blue-200 text-gray-800' : 'bg-gray-100 text-gray-400'}`}
        >
          Tentable
        </button>
      </div>

      {/* Budget section here */}

      <div className="flex justify-between pe-2 items-centers">
        <div className="w-[330px] text-gray-700 font-medium">
          <span className="text-xs my-2 block">Budget</span>
          <select
            value={selectedBudget}
            onChange={handleBudgetChange}
            className="font-medium block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option selected value="" className="font-medium">Select Budget...</option>
            <option value="No budget" selected className="font-medium">No budget</option>
            <option value="Hour By Project" className="font-medium">Hour By Project</option>
            <option value="Fee by Project" className="font-medium">Fee by Project</option>
            <option value="Hourly Fee" className="font-medium">Hourly Fee</option>
          </select>
        </div>
        {selectedBudget === 'Hour By Project'
          && (
            <div className="">
              <div className="text-xs text-gray-700 font-medium mt-2 mb-2">Hours</div>
              <input onChange={handleProjectHourChange} value={totalProjectHour} type="number" min={0} className="text-gray-600 border h-[35px] w-[100px] rounded outline-none px-2" />
            </div>
          )}
      </div>
      {/* rate input start here */}

      {
        selectedBudget === 'Fee by Project' || selectedBudget === 'Hourly Fee'
          ? (
            <div className="mt-5 flex justify-between items-center">
              <div className="w-[330px] text-gray-700 font-medium">
                <span className="text-xs mt-5">Rate</span>
                <select
                  value={isDifferentRate}
                  onChange={handleRateChange}
                  className="font-medium block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option selected value="" className="font-medium">Select Rate</option>
                  <option value="true" className="font-medium">Different hourly rates per team member</option>
                  <option value="false" className="font-medium">Same Hourly rate for everyone</option>
                </select>
              </div>
              {
                isDifferentRate === 'false'
                && (
                  <div>
                    <div className="text-xs text-gray-700 font-medium">Per Hour</div>
                    <input value={perHourRate} type="number" min={0} className="text-gray-600 border h-[35px] w-[100px] rounded outline-none px-2" onChange={handlePerHourRate} />
                  </div>
                )
              }

            </div>
          ) : ''
      }

    </div>
  );
}

export default ProjectInfoTab;
