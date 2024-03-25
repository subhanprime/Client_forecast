import { ChevronsUpDown } from 'lucide-react';
import React from 'react';

interface TableHeaderProps {
  onSort: () => void;
  onIconClick: () => void;
  sortingOrder: 'asc' | 'desc';
  // new Additions for Checkboxes
  isChecked: boolean;
  onCheckboxChange: () => void;
}

const headers = [
  {
    name: 'Name',
    showSort: true,
  },
  {
    name: 'Role',
    showSort: false,
  },
  {
    name: 'Department',
    showSort: false,
  }, {
    name: 'Access',
    showSort: false,
  },
  {
    name: 'Managers',
    showSort: false,
  }, {
    name: 'Tags',
    showSort: false,
  }, {
    name: 'Type',
    showSort: false,
  },
];

function TableHeader({
  onSort, onIconClick, sortingOrder, isChecked, onCheckboxChange,
}: TableHeaderProps) {
  return (
    <thead
      className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th scope="col" className=" pl-4 py-3">
          <div className="flex items-center cursor-pointer" onClick={onCheckboxChange}>
            <input type="checkbox" className="w-4 h-4" checked={isChecked} onChange={() => {}} />
          </div>
        </th>
        {headers.map((head) => (
          <th key={head.name} scope="col" className=" py-3">
            <div
              className="flex items-center cursor-pointer"
              onClick={head.showSort ? onSort : undefined}
            >
              {head.name}
              {head.showSort && (
                <ChevronsUpDown
                  className={`ml-1 ${sortingOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onIconClick();
                  }}
                  aria-label="Sort"
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
