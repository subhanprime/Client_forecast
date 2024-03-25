import { render, cleanup } from '@testing-library/react';
import React from 'react';
import {
  handleLongPress,
  handleLongPressCalender,
  handleMouseMove,
  handleMouseMoveCalender,
  handleMouseRelease,
  handleMouseReleaseCalender,
} from '../utils/longPressHelpers';

interface PlaceholderInfo {
  start: number;
  end: number;
}
describe('pressHelper', () => {
  let isLongPress: React.MutableRefObject<boolean>;
  let placeHolderRef: React.MutableRefObject<HTMLDivElement | null>;
  let placeholderInfo: React.MutableRefObject<PlaceholderInfo>;
  let longPressTimer: React.MutableRefObject<any>;
  let dispatch: jest.Mock;
  let person: PeopleTasks;
  let projectId: number;
  let calenderTypeRef:React.MutableRefObject<number>;

  beforeEach(() => {
    isLongPress = { current: false };
    placeHolderRef = { current: document.createElement('div') };
    placeholderInfo = { current: { start: 0, end: 0 } };
    longPressTimer = { current: null };
    calenderTypeRef = { current: 100 };
    dispatch = jest.fn();
    person = {
      people_id: 18123922,
      name: 'Abdul Hadi',
      email: 'abdul.hadi@txend.com',
      job_title: 'Developer',
      role_id: 233302,
      auto_email: -1,
      employee_type: 1,
      active: 1,
      people_type_id: 1,
      tags: [
        {
          name: 'Shaheen',
          id: 1,
        },
      ],
      default_hourly_rate: '0.0000',
      modified: '2023-12-07 12:46:15',
      department_id: 16915826,
      managers: [
        815533,
      ],
      tasks: [],
      department: 'Engineering',
    };
    projectId = 123;
  });

  afterEach(() => {
    cleanup();
  });

  describe('handleLongPress', () => {
    it('should handle long press and update placeholder', () => {
      const e = { layerX: 100 };
      render(<div ref={placeHolderRef} />);
      handleLongPress(e, isLongPress, placeHolderRef, placeholderInfo, calenderTypeRef);

      expect(isLongPress.current).toBe(true);
      if (!placeHolderRef.current) {
        return;
      }
      expect(placeHolderRef.current.classList).toContain('grid-stack-placeholder');
      expect(placeholderInfo.current.start).toBe(1);
      expect(placeholderInfo.current.end).toBe(1);
      expect(placeHolderRef.current.getAttribute('gs-x')).toBe('1');
      expect(placeHolderRef.current.getAttribute('gs-w')).toBe('1');
    });

    it('should not update placeholder if gs-x is not set', () => {
      const e = { layerX: 100 };
      render(<div />);
      handleLongPress(e, isLongPress, placeHolderRef, placeholderInfo, calenderTypeRef);

      expect(isLongPress.current).toBe(true);
      if (!placeHolderRef.current) {
        return;
      }
      expect(placeHolderRef.current.classList).toContain('grid-stack-placeholder');
      expect(placeholderInfo.current.start).toBe(1);
      expect(placeholderInfo.current.end).toBe(1);
    });
  });

  describe('handleMouseMove', () => {
    it('should update placeholder on mouse move', () => {
      isLongPress.current = true;
      placeholderInfo.current.start = 1;
      const e = { layerX: 200 };
      render(<div ref={placeHolderRef} />);
      handleMouseMove(e, isLongPress, placeHolderRef, placeholderInfo, calenderTypeRef);

      expect(placeholderInfo.current.start).toBe(1);
      expect(placeholderInfo.current.end).toBe(2);
      if (!placeHolderRef.current) {
        return;
      }
      expect(placeHolderRef.current.getAttribute('gs-x')).toBe('1');
      expect(placeHolderRef.current.getAttribute('gs-w')).toBe('2');
    });

    it('should not update placeholder if isLongPress is false', () => {
      const e = { layerX: 200 };

      render(<div ref={placeHolderRef} />);
      handleMouseMove(e, isLongPress, placeHolderRef, placeholderInfo, calenderTypeRef);

      expect(placeholderInfo.current.start).toBe(0);
      expect(placeholderInfo.current.end).toBe(0);
      if (!placeHolderRef.current) {
        return;
      }
      expect(placeHolderRef?.current.getAttribute('gs-x')).toBe(null);
      expect(placeHolderRef?.current.getAttribute('gs-w')).toBe(null);
    });
  });

  describe('handleMouseRelease', () => {
    it('should handle mouse release and open modal', () => {
      isLongPress.current = true;
      render(<div ref={placeHolderRef} />);
      handleMouseRelease(
        longPressTimer,
        isLongPress,
        placeHolderRef,
        placeholderInfo,
        dispatch,
        person,
        projectId,
      );

      expect(isLongPress.current).toBe(false);
      expect(dispatch).toHaveBeenCalledWith(
        {
          payload: {
            isOpen: true,
            name: 'management',
            taskData: {
              end: 1, peopleId: 18123922, projectId: 123, start: 0,
            },
          },
          type: 'modal/openModal',
        },
      );
      if (!placeHolderRef.current) {
        return;
      }
      expect(placeHolderRef.current.classList).not.toContain('grid-stack-placeholder');
      expect(placeHolderRef.current.getAttribute('gs-w')).toBe('1');
      expect(placeHolderRef.current.getAttribute('gs-x')).toBe('0');
    });

    it('should not open modal if isOnLeave is true', () => {
      isLongPress.current = true;
      render(<div ref={placeHolderRef} />);
      handleMouseRelease(
        longPressTimer,
        isLongPress,
        placeHolderRef,
        placeholderInfo,
        dispatch,
        person,
        projectId,
        true,
      );

      expect(isLongPress.current).toBe(false);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should not do anything if isLongPress is false', () => {
      render(<div ref={placeHolderRef} />);
      handleMouseRelease(
        longPressTimer,
        isLongPress,
        placeHolderRef,
        placeholderInfo,
        dispatch,
        person,
        projectId,
      );

      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});

interface HoverInfoType {
  start: number;
  end: number;
  total: number;
}

describe('pressHelperCalender', () => {
  let isLongPress: React.MutableRefObject<boolean>;
  let hoverArea: React.MutableRefObject<HoverInfoType>;
  let calenderTypeRef: React.MutableRefObject<number>;
  let setHoverAreaState: React.Dispatch<React.SetStateAction<HoverInfoType>>;
  let longPressTimer: React.MutableRefObject<any>;
  let setAreaSelected: React.Dispatch<React.SetStateAction<boolean>>;

  beforeEach(() => {
    isLongPress = { current: false };
    hoverArea = { current: { start: 0, end: 0, total: 0 } };
    calenderTypeRef = { current: 100 };
    setHoverAreaState = jest.fn();
    longPressTimer = { current: null };
    setAreaSelected = jest.fn();
  });

  afterEach(() => {
    cleanup();
  });

  describe('handleLongPressCalender', () => {
    it('should handle long press and update hover area', () => {
      const e = { target: { getAttribute: () => '1' } };
      render(<div />);
      handleLongPressCalender(
        e,
        isLongPress,

        hoverArea,

        calenderTypeRef,

        setHoverAreaState,

        setAreaSelected,
      );

      expect(isLongPress.current).toBe(true);
      expect(setAreaSelected).toHaveBeenCalledWith(false);
      expect(hoverArea.current.start).toBe(0);
      expect(hoverArea.current.end).toBe(0);
      expect(hoverArea.current.total).toBe(1);
    });

    it('should not update hover area if data-day is not set', () => {
      const e = { target: { getAttribute: () => null } };
      render(<div />);
      handleLongPressCalender(
        e,
        isLongPress,

        hoverArea,

        calenderTypeRef,

        setHoverAreaState,

        setAreaSelected,
      );

      expect(isLongPress.current).toBe(true);
      expect(setAreaSelected).toHaveBeenCalledWith(false);
      expect(hoverArea.current.start).toBe(0);
      expect(hoverArea.current.end).toBe(0);
      expect(hoverArea.current.total).toBe(0);
    });
  });

  describe('handleMouseMoveCalender', () => {
    it('should update hover area on mouse move', () => {
      isLongPress.current = true;
      hoverArea.current.start = 1;
      const e = { target: { classList: { contains: () => true }, getAttribute: () => '2' } };
      render(<div />);
      handleMouseMoveCalender(
        e,
        isLongPress,
        hoverArea,
        calenderTypeRef,
        setHoverAreaState,
        longPressTimer,
        setAreaSelected,
      );

      expect(hoverArea.current.start).toBe(1);
    });

    it('should not update hover area if isLongPress is false', () => {
      const e = { target: { classList: { contains: () => true }, getAttribute: () => '2' } };
      render(<div />);
      handleMouseMoveCalender(
        e,
        isLongPress,

        hoverArea,

        calenderTypeRef,

        setHoverAreaState,

        longPressTimer,

        setAreaSelected,
      );

      expect(hoverArea.current.start).toBe(0);
      expect(hoverArea.current.end).toBe(0);
      expect(hoverArea.current.total).toBe(0);
    });

    it('should not update hover area if classList does not contain date-item-single', () => {
      isLongPress.current = true;
      const e = { target: { classList: { contains: () => false } } };
      render(<div />);
      handleMouseMoveCalender(
        e,
        isLongPress,

        hoverArea,

        calenderTypeRef,

        setHoverAreaState,

        longPressTimer,

        setAreaSelected,
      );

      expect(hoverArea.current.start).toBe(0);
      expect(hoverArea.current.end).toBe(0);
      expect(hoverArea.current.total).toBe(0);
    });

    it('should stop long press if data-day is not set', () => {
      isLongPress.current = true;
      const e = { target: { classList: { contains: () => true }, getAttribute: () => null } };
      render(<div />);
      handleMouseMoveCalender(
        e,
        isLongPress,

        hoverArea,

        calenderTypeRef,

        setHoverAreaState,

        longPressTimer,

        setAreaSelected,
      );

      expect(isLongPress.current).toBe(true);
    });
  });

  describe('handleMouseReleaseCalender', () => {
    it('should handle mouse release and set area selected to true', () => {
      isLongPress.current = true;
      render(<div />);
      handleMouseReleaseCalender(longPressTimer, isLongPress, setAreaSelected);

      expect(isLongPress.current).toBe(false);
      expect(setAreaSelected).toHaveBeenCalledWith(true);
    });

    it('should not set area selected if isLongPress is false', () => {
      render(<div />);
      handleMouseReleaseCalender(longPressTimer, isLongPress, setAreaSelected);

      expect(setAreaSelected).not.toHaveBeenCalled();
    });
  });
});
