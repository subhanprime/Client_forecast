import { AppDispatch } from '../app/store';
import { ContextSelectedType, Modals } from '../constants';
import { HoverInfoType } from '../feature/calender/calenderSlice';
import { openModal } from '../feature/modal/modalSlice';

interface PlaceholderInfo {
  start: number;
  end: number;
}

// Function to handle long press
export function handleLongPress(
  e:any,
  isLongPress:React.MutableRefObject<boolean>,
  placeHolderRef:React.MutableRefObject<HTMLDivElement | null>,
  placeholderInfo: React.MutableRefObject<PlaceholderInfo>,
  calenderTypeRef: React.MutableRefObject<number>,
) {
  isLongPress.current = true;

  if (placeHolderRef.current) {
    placeHolderRef.current.classList.add('grid-stack-placeholder');
    placeHolderRef.current.classList.add('grid-stack-item');
    placeHolderRef.current.classList.add('sub');
    placeholderInfo.current = {
      start: Math.floor(e.layerX / calenderTypeRef.current),
      end: Math.floor(e.layerX / calenderTypeRef.current),
    };
    placeHolderRef.current.setAttribute('gs-x', `${placeholderInfo.current.start}`);
    placeHolderRef.current.setAttribute('gs-w', `${placeholderInfo.current.end - placeholderInfo.current.start + 1}`);
  }
}

// Function to handle mouse move
export function handleMouseMove(
  e:any,
  isLongPress:React.MutableRefObject<boolean>,
  placeHolderRef:React.MutableRefObject<HTMLDivElement | null>,
  placeholderInfo: React.MutableRefObject<PlaceholderInfo>,
  calenderTypeRef: React.MutableRefObject<number>,
) {
  if (isLongPress.current && placeholderInfo.current.start) {
    // Calculate the distance moved
    const newEnd = Math.floor(e.layerX / calenderTypeRef.current);

    const oldStart = placeholderInfo.current.start;

    if (placeHolderRef.current) {
      placeholderInfo.current = {
        start: newEnd <= oldStart ? newEnd : oldStart,
        end: newEnd <= oldStart ? placeholderInfo.current.end : newEnd,
      };

      placeHolderRef.current.setAttribute('gs-x', `${placeholderInfo.current.start}`);
      placeHolderRef.current.setAttribute('gs-w', `${placeholderInfo.current.end - placeholderInfo.current.start + 1}`);
    }
  }
}

export function handleMouseRelease(
  longPressTimer: React.MutableRefObject<any>,
  isLongPress:React.MutableRefObject<boolean>,
  placeHolderRef:React.MutableRefObject<HTMLDivElement | null>,
  placeholderInfo: React.MutableRefObject<PlaceholderInfo>,
  dispatch:AppDispatch,
  person:People,
  projectId?:number,
  isOnLeave?:boolean,
) {
  if (!isLongPress.current) {
    return;
  }
  isLongPress.current = false;
  clearInterval(longPressTimer.current);
  // Your logic for mouse release here
  if (placeHolderRef.current) {
    if (!isOnLeave) {
      dispatch(openModal({
        isOpen: true,
        name: Modals.Alloc,
        taskData: {
          projectId,
          peopleId: person.people_id,
          start: placeholderInfo.current.start,
          end: placeholderInfo.current.end + 1,
        },
      }));
    }
    placeHolderRef.current.classList.remove('grid-stack-placeholder');
    placeHolderRef.current.classList.remove('grid-stack-item');
    placeHolderRef.current.classList.remove('sub');

    placeHolderRef.current.setAttribute('gs-w', `1`);
    placeHolderRef.current.setAttribute('gs-x', `0`);
  }
}

export const addListeners = (
  gridContainerRef: React.MutableRefObject<HTMLDivElement | null>,
  itemsRef: React.MutableRefObject<TaskSlot[] | null>,
  contectSelected: React.MutableRefObject<ContextSelectedType>,
  longPressTimer: React.MutableRefObject<any>,
  isLongPress:React.MutableRefObject<boolean>,
  placeHolderRef:React.MutableRefObject<HTMLDivElement | null>,
  placeholderInfo: React.MutableRefObject<PlaceholderInfo>,
  dispatch:AppDispatch,
  person:People,
  calenderTypeRef: React.MutableRefObject<number>,
  projectId?:number,
) => {
  if (gridContainerRef.current) {
    gridContainerRef.current.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      // Set a timer for long press
      const start = Math.floor((e as any).layerX / calenderTypeRef.current);
      let check = false;
      itemsRef.current?.forEach((item) => {
        if (item.x < start && start < item.x + item.w) {
          check = true;
        }
      });
      if (!check && e.button === 0
         && e.target === gridContainerRef.current
          && contectSelected.current === ContextSelectedType.Add) {
        longPressTimer.current = setTimeout(
          () => handleLongPress(e, isLongPress, placeHolderRef, placeholderInfo, calenderTypeRef),
          200,
        );
      }
    });
    // Add event listener for mouse move
    gridContainerRef.current.addEventListener(
      'mousemove',
      (e:any) => handleMouseMove(e, isLongPress, placeHolderRef, placeholderInfo, calenderTypeRef),
    );

    // Add event listener for mouse up
    gridContainerRef.current.addEventListener(
      'mouseup',
      () => handleMouseRelease(
        longPressTimer,
        isLongPress,
        placeHolderRef,
        placeholderInfo,
        dispatch,
        person,
        projectId,
      ),
    );
    gridContainerRef.current.addEventListener(
      'mouseleave',
      () => handleMouseRelease(
        longPressTimer,
        isLongPress,
        placeHolderRef,
        placeholderInfo,
        dispatch,
        person,
        projectId,
        true,
      ),
    );
  }
};

export function handleLongPressCalender(
  e:any,
  isLongPress:React.MutableRefObject<boolean>,
  hoverArea:React.MutableRefObject<HoverInfoType>,
  calenderTypeRef: React.MutableRefObject<number>,
  setHoverAreaState: React.Dispatch<React.SetStateAction<HoverInfoType>>,
  setAreaSelected: React.Dispatch<React.SetStateAction<boolean>>,

) {
  isLongPress.current = true;
  setAreaSelected(false);
  const el = e.target as HTMLElement;
  const temp = el.getAttribute('data-day');
  if (temp) {
    const start = (+temp * calenderTypeRef.current) - calenderTypeRef.current;
    const end = start;
    hoverArea.current = {
      start,
      end,
      total: 1,
    };
  }
  setHoverAreaState(hoverArea.current);
}

// Function to handle mouse move
export function handleMouseMoveCalender(
  e:any,
  isLongPress:React.MutableRefObject<boolean>,
  hoverArea:React.MutableRefObject<HoverInfoType>,
  calenderTypeRef: React.MutableRefObject<number>,
  setHoverAreaState: React.Dispatch<React.SetStateAction<HoverInfoType>>,
  longPressTimer: React.MutableRefObject<any>,
  setAreaSelected: React.Dispatch<React.SetStateAction<boolean>>,

) {
  if (isLongPress.current && hoverArea.current.start) {
    // Calculate the distance moved
    const el = e.target as HTMLElement;
    if (el.classList.contains('date-item-single')) {
      const temp = el.getAttribute('data-day');
      if (temp) {
        const oldStart = hoverArea.current.start;
        const newEnd = (+temp * calenderTypeRef.current) - calenderTypeRef.current;
        const start = newEnd <= oldStart ? newEnd : oldStart;
        const end = newEnd <= oldStart ? hoverArea.current.end : newEnd;
        hoverArea.current = {
          start,
          end,
          total: Math.floor((end - start) / calenderTypeRef.current) + 1,
        };
        setHoverAreaState(hoverArea.current);
      } else {
        isLongPress.current = false;
        clearInterval(longPressTimer.current);
        setAreaSelected(true);
      }
    } else {
      isLongPress.current = false;
      clearInterval(longPressTimer.current);
      setAreaSelected(true);
    }
  }
}
export function handleMouseReleaseCalender(
  longPressTimer: React.MutableRefObject<any>,
  isLongPress:React.MutableRefObject<boolean>,
  setAreaSelected: React.Dispatch<React.SetStateAction<boolean>>,

) {
  if (!isLongPress.current) {
    return;
  }
  isLongPress.current = false;
  clearInterval(longPressTimer.current);
  setAreaSelected(true);

  // Your logic for mouse release here
}
