import { Search } from 'lucide-react';
import React from 'react';

interface SearchProps {
  getLength: () => string;
  searchValue:string,
  onChange: (e:any)=>void
}

function FilterSearch({ getLength, searchValue, onChange }:SearchProps) {
  return (
    <div data-testid="Search" className="flex flex-row-reverse gap-2 border-b  border-black/20 justify-center items-center text-sm cursor-text">
      <input
        type="search"
        placeholder={`Search ${getLength()}`}
        id="filter"
        value={searchValue}
        onChange={onChange}
        className=" w-full h-full py-2 px-1 outline-none peer focus:text-black"
      />
      <div className="text-black/30 peer-focus:text-black">
        <Search size={15} />
      </div>
    </div>
  );
}

export default FilterSearch;
