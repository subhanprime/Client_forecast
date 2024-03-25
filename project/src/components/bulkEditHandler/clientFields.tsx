import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BulkField } from '../constant/enums';

interface IClient {
  client: string;
  setClient: React.Dispatch<React.SetStateAction<string>>;
}

function ClientFields({ client, setClient }: IClient) {
  const clients = useSelector((state: RootState) => state.clientSlice.clients.map((el) => el.name));
  const [options, setOptions] = useState<string[]>(clients);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClient(event.target.value);
    // console.log('event.target.value', event.target.value);
  };
  const capitalizeEveryWord = (str: string) => str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="container my-3">
      <h2 className="text-xs font-semibold my-2">{BulkField.Client}</h2>
      <select
        value={client}
        onChange={handleSelectChange}
        className="block w-full p-1 h-[45px] border rounded-md"
      >
        {/* <div className="max-h-[300px]"> */}
        <option value={undefined}>Choose one ...</option>

        {options.map((el, index) => (
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
        {/* </div> */}

        {/* Add more options as needed */}
      </select>
    </div>
  );
}

export default ClientFields;
