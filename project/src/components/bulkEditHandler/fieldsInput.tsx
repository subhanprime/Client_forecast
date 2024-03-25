import React, { useEffect, useState } from 'react';

interface ISelectedOption {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

function InputFields({ selectedOption, setSelectedOption }: ISelectedOption) {
  const [options, setOptions] = useState(['tags', 'client', 'type', 'budget']);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const capitalizeEveryWord = (str: string) => str.replace(/\b\w/g, (char) => char.toUpperCase());
  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);
  return (
    <div className="container">
      <h2 className="text-xs font-semibold mb-2">Field</h2>
      <select
        id="input-dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        className="block w-full p-1 h-[45px] border rounded-md cursor-pointer"
      >
        {options.sort().map((el, index) => (
          <option key={index} value={el}>
            <div
              key={index}
              className="h-[35px] bg-red px-2 py-1 cursor-pointer bg-blue-500 hover:text-white"
              onClick={() => console.log('Selected:', el)}
            >
              {capitalizeEveryWord(el)}
            </div>
          </option>
        ))}

        {/* Add more options as needed */}
      </select>
    </div>
  );
}

export default InputFields;
