import React from 'react';
// import { CalendarCheck, Scroll } from 'lucide-react';
import { getInitials, accountTypeDescription } from '../../utils/helper';
import line from '../../media/svgs/line.svg';
import reports from '../../media/svgs/reports.svg';

function TabeleRow({
  person, setSelectedPerson, setIsModalOpen, isSelected,
  onCheckboxChange,
}:any) {
  // const [showButtons, setShowButtons] = useState<boolean>(false);

  return (
    <tr
      data-testid={`table-row-${person.name.split(' ')[0]}`}
      onClick={() => {
        setSelectedPerson(person); setIsModalOpen(true);
      }}
      key={person.people_id}
      className="rounded-sm odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      <th scope="row" className=" pl-4 py-3">
        <div className="" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" className="w-4 h-4" checked={isSelected} onChange={() => onCheckboxChange(person)} />
        </div>
      </th>
      <th scope="row" className="flex justify-between py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white group rounded">
        <div className="flex items-center font-normal tracking-wide rounded text-black/70">
          {person.avatar_file ? <img src={person.avatar_file} alt="img" className="w-8 h-8 object-cover rounded-full mr-3" /> : (
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400 text-white mr-3">
              {getInitials(person.name)}
            </div>
          )}

          {person.name}
        </div>

        <div className="flex items-center gap-3  invisible group-hover:visible">
          {/* <CalendarCheck data-testid={`table-calender-${person.name.split(' ')[0]}`}
           className="p-2 hover:bg-gray-300 rounded" width={40} height={40}
            onClick={(e) => { e.stopPropagation(); }} /> */}
          <img src={line} alt="scheduling" data-testid={`table-calender-${person.name.split(' ')[0]}`} className="p-2 hover:bg-gray-300 rounded" width={40} height={40} onClick={(e) => { e.stopPropagation(); }} />
          <img src={reports} alt="reports" data-testid={`table-calender-${person.name.split(' ')[0]}`} className="p-2 hover:bg-gray-300 rounded" width={40} height={40} onClick={(e) => { e.stopPropagation(); }} />
          {/* <Scroll data-testid={`table-scroll-${person.name.split(' ')[0]}`}
           className="p-2 hover:bg-gray-300 rounded" width={40} height={40}
            onClick={(e) => { e.stopPropagation(); }} /> */}
        </div>
      </th>
      <td className="px-6 py-4">
        {person.job_title || '---'}
      </td>
      <td className="px-6 py-4">
        {person.department || '---'}
        {/* {person.department_id} */}
      </td>
      <td className="px-6 py-4">
        {accountTypeDescription(person.account_type)}
      </td>
      <td className="px-6 py-4">
        {person.manager}
      </td>
      <td className="px-6 py-4">
        {person.tags && person.tags.map((tag: any) => (
          <span key={tag.name} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 dark:bg-gray-600 dark:text-gray-200">
            {tag.name}
          </span>
        ))}
      </td>
      <td className="px-6 py-4">
        {person.type}
      </td>

    </tr>
  );
}

export default TabeleRow;
