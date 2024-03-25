import React, { useState, useRef, useEffect } from 'react';
import clossIcon from '../media/svg/crossIcon.svg';

interface UserDetails {
  name: string;
  price: number;
}

interface ProjectTeamTabProps {
  isDifferentRate: string | number;
  setIsDifferentRate: React.Dispatch<React.SetStateAction<string>>;
  isTeamOpen: boolean,
  setIsTeamOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUsers: UserDetails[] | null;
  setSelectedUsers: React.Dispatch<React.SetStateAction<UserDetails[] | null>>;
  initialUserList: UserDetails[];
  filterTeamText: String;
  setFilterTeamText: React.Dispatch<React.SetStateAction<string>>;
}

function ProjectTeamTab({
  isDifferentRate,
  setIsDifferentRate,
  isTeamOpen,
  setIsTeamOpen,
  selectedUsers,
  setSelectedUsers,
  initialUserList,
  filterTeamText,
  setFilterTeamText,
}: ProjectTeamTabProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('isDifferentRate====>', isDifferentRate, typeof isDifferentRate);
  }, [isDifferentRate]);

  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsTeamOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsTeamOpen(!isTeamOpen);
  };

  const handleUserSelect = (user: any) => {
    if (selectedUsers) {
      setSelectedUsers([...selectedUsers, { name: user.name, price: 0 }]);
    }

    setIsTeamOpen(false);
  };

  const handleUserRemove = (user: string) => {
    if (selectedUsers) {
      const updatedUsers = selectedUsers.filter((selectedUser) => selectedUser.name !== user);
      setSelectedUsers(updatedUsers);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTeamText(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, userIndex: number) => {
    const { value } = e.target;
    if (selectedUsers) {
      const updatedUsers = [...selectedUsers];
      updatedUsers[userIndex].price = parseInt(value, 10);
      setSelectedUsers(updatedUsers);
    }
  };

  const filteredUsers = initialUserList.filter((user: UserDetails) => {
    if (selectedUsers) {
      return (
        !selectedUsers.map((u) => u.name).includes(user.name)
        && user.name.toLowerCase().includes(filterTeamText.toLowerCase())
      );
    }
    return user.name.toLowerCase().includes(filterTeamText.toLowerCase());
  });

  return (
    <div className="w-full flex flex-col justify-between min-h-[430px]">
      <div className="bg-gray-100 p-5 relative">
        <span className="text-xs font-medium text-gray-800 my-2 block">Assign a team member</span>
        <input
          type="text"
          placeholder="Select user"
          onClick={handleDropdownClick}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none w-full"
          onChange={handleFilterChange}
          ref={inputRef}
        />
        {isTeamOpen && (
          <div>
            <div className="absolute z-10 top-22 left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md w-[93%] mx-5">
              {filteredUsers.map((user: UserDetails) => (
                <div
                  key={user.name}
                  onClick={() => handleUserSelect(user)}
                  className="cursor-pointer hover:bg-gray-100 p-2 w-full"
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="my-5 h-[230px] overflow-y-scroll">
        {selectedUsers && selectedUsers.map((user, index) => (
          <div key={user.name} className={`p-1 border-gray-300 min-h-[45px] flex justify-start items-center border-b ${index === 0 ? 'border-t' : ''}`}>
            <div className="flex justify-between items-center w-full px-2">
              <div className="flex gap-5 items-center">
                <div className="bg-indigo-400 w-7 h-7 rounded-full flex justify-center items-center text-white text-xs uppercase ">
                  {user.name[0]}
                </div>
                <div className="truncate max-w-36">{user.name}</div>
              </div>

              <div className="flex">
                {isDifferentRate !== 'false' && (

                  <div className="flex items-center border rounded ps-2">
                    <span className="text-gray-400 text-xs">RS</span>
                    <input
                      type="number"
                      className="border-none outline-none px-2 w-16 h-8 rounded"
                      min={0}
                      max={10000}
                      value={user.price}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                )}
                <button type="button" onClick={() => handleUserRemove(user.name)} className="ml-2">
                  <img src={clossIcon} alt="cross" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div>
          <span className="text-xs text-gray-700 font-medium my-2 block">Project Owner</span>
          <div className="border h-12 rounded flex justify-start items-center px-2 py-1 gap-4 cursor-pointer">
            <div className="uppercase h-8 w-8 bg-red-900 rounded-full font-semibold text-white flex justify-center items-center shadow-lg">s</div>
            <div className="text-gray-800 font-semibold">Subahn ali</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectTeamTab;
