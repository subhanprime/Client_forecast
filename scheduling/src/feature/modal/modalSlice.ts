import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Modals } from '../../constants';
import { SavedFilterType } from '../filter/filterSlice';

export interface TaskData {
  projectId?:number;
  peopleId:number;
  start:number;
  end:number;
}

interface Modal {
  name:Modals;
  isOpen:boolean;
  hasConfirmation?:boolean;
}

interface TaskModal extends Modal {
  task?:TaskSlot
}
interface SaveFilterModal extends Modal {
  filter?:SavedFilterType
}
interface DeleteConfirmModal extends Modal {
  type?:string,
  title?:string,
  onDelete?: ()=>void
}

interface AllocModal extends TaskModal {
  taskData?:TaskData;
}
type Payload = Modal | TaskModal | AllocModal | SaveFilterModal | DeleteConfirmModal;

interface ModalSlice {
  management:AllocModal;
  taskDetails:TaskModal;
  confirm:Modal;
  emailSchedule:Modal;
  exportCSV:Modal;
  saveFilter:SaveFilterModal;
  deleteConfirm:DeleteConfirmModal
}

const initialState :ModalSlice = {
  management: { name: Modals.Alloc, isOpen: false, hasConfirmation: true },
  confirm: { name: Modals.Confirm, isOpen: false, hasConfirmation: false },
  taskDetails: {
    name: Modals.Task, isOpen: false, task: undefined, hasConfirmation: false,
  },
  emailSchedule: { name: Modals.Email, isOpen: false },
  exportCSV: { name: Modals.Export, isOpen: false },
  saveFilter: { name: Modals.Filter, isOpen: false },
  deleteConfirm: { name: Modals.Delete, isOpen: false },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action:PayloadAction<Payload>) {
      Object.keys(state).forEach((modalName:string) => {
        const modName = modalName as Modals;
        if (modName !== action.payload.name) {
          state[modName] = { ...initialState[modName] };
        }
      });

      state[action.payload.name] = {
        ...state[action.payload.name],
        ...action.payload,
        isOpen: true,
      };
      state[action.payload.name].isOpen = true;
    },
    closeModal(state, action: PayloadAction<{ modal:Modals, skipCon?:boolean }>) {
      // Assuming action.payload is the modal name
      const modal = action.payload.modal;
      const skip = !!action.payload.skipCon;
      if (state[modal].hasConfirmation && !skip) {
        state.confirm.isOpen = true;
      } else {
        state[modal] = { ...initialState[modal] };
        if (modal === 'confirm') {
          Object.keys(state).forEach((modalName:string) => {
            const modName = modalName as Modals;
            if (modName !== modal) {
              state[modName] = { ...initialState[modName] };
            }
          });
        }
      }
    },
    cancelConfirm(state) {
      state.confirm.isOpen = false;
    },
  },
});

export const {
  openModal, closeModal, cancelConfirm,
} = modalSlice.actions;
export default modalSlice.reducer;
