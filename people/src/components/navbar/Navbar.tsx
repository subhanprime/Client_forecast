import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import ImportModal from './ImportModal';

function Navbar() {
  const { itemsCount } = useAppSelector((state) => state.nav);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const importModalOpener = () => {
    setIsImportModalOpen(!isImportModalOpen);
  };
  const onCloseImportModal = () => {
    setIsImportModalOpen(false);
  };

  return (
    <div>

      <ImportModal
        isModalOpen={isImportModalOpen}
        closeModal={onCloseImportModal}
      />
      <div data-testid="navbar" className="flex bg-gray-100 p-4 gap-2 items-center text-xl justify-between">
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold">{itemsCount}</h1>
          <h1>People</h1>

        </div>
        <div className="border bg-white rounded-md ">
          <button className="text-sm flex items-center gap-2 px-3" onClick={importModalOpener}>
            <Download size={16} />
            Import
          </button>
        </div>

      </div>
    </div>

  );
}

export default Navbar;
