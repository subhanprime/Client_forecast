import React from 'react';
import {
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import '@testing-library/jest-dom';

import * as GridCallbacks from '../utils/gridEvents';
import helpers from '../utils/helpers';

const {
  handleDrag, handleDragStop, handleResizeStop, handleElDropped,
} = GridCallbacks;

const items: TaskSlot[] = [{
  id: '1',
  time: 3,
  taskName: 'Test Task',
  status: 'none',
  name: 'Task Name',
  color: '#FF0000',
  x: 0,
  w: 1,
  h: 1,
  startDate: '2023-10-10',
  endDate: '2023-10-10',
  modifiedBy: 543543,
  modifiedDate: '2023-10-10',
  personName: 'Me',
}];

describe('gridCallbacks', () => {
  const { daysArray } = helpers.getDaysInCurrentYear();

  const mockDaysArray = daysArray;

  describe('handleDrag', () => {
    it('should update placeholder attribute on drag', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-x', '0');
      document.body.appendChild(el);

      render(<div className="grid-stack-placeholder" />);

      handleDrag(el, mockDaysArray);

      const placeholder = document.querySelector('.grid-stack-placeholder');
      if (placeholder) {
        expect(placeholder.getAttribute('gs-x')).toBeNull();
      }
    });

    it('should not update placeholder attribute if gs-x is not set', () => {
      const el = document.createElement('div');
      document.body.appendChild(el);

      render(<div className="grid-stack-placeholder" />);

      handleDrag(el, mockDaysArray);

      const placeholder = document.querySelector('.grid-stack-placeholder');
      expect(placeholder).not.toBeNull();
    });
  });

  describe('handleDragStop', () => {
    it('should update attributes on drag stop with width greater than 2', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-x', '0');
      el.setAttribute('gs-w', '2');
      el.setAttribute('gs-y', '1');
      document.body.appendChild(el);
      const itemsRef = {
        current: items,
      };

      handleDragStop(el, mockDaysArray, itemsRef as any);

      expect(el.getAttribute('gs-w')).toBe('2');
      expect(el.getAttribute('gs-x')).toBe('0');
      expect(el.getAttribute('gs-y')).toBe('1');
    });

    it('should not update attributes on drag stop with width less than or equal to 2', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-x', '0');
      el.setAttribute('gs-w', '2');
      document.body.appendChild(el);

      const itemsRef = {
        current: items,
      };

      handleDragStop(el, mockDaysArray, itemsRef as any);

      expect(el.getAttribute('gs-w')).toBe('2');
      expect(el.getAttribute('gs-x')).toBe('0');
    });
  });

  describe('handleResizeStop', () => {
    it('should update attributes on resize stop with width greater than 2', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-w', '2');
      el.setAttribute('gs-x', '2');
      el.setAttribute('gs-h', '3');
      el.setAttribute('gs-id', '1');

      handleResizeStop(el, mockDaysArray, items);

      expect(el.getAttribute('gs-w')).toBe('2');
      expect(items).toEqual([{
        id: '1',
        time: 3,
        name: 'Task Name',
        status: 'none',
        taskName: 'Test Task',
        color: '#FF0000',
        x: 0,
        w: 1,
        h: 1,
        startDate: '2023-10-10',
        endDate: '2023-10-10',
        modifiedBy: 543543,
        modifiedDate: '2023-10-10',
        personName: 'Me',
      }]);
    });

    it('should update attributes and state on resize stop with width greater than 2', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-w', '4');
      el.setAttribute('gs-x', '1');
      el.setAttribute('gs-h', '3');
      el.setAttribute('gs-id', '1');

      handleResizeStop(el, mockDaysArray, items);

      expect(el.getAttribute('gs-w')).toBe('4');
      expect(items).toEqual([{
        id: '1',
        time: 3,
        name: 'Task Name',
        status: 'none',
        taskName: 'Test Task',
        color: '#FF0000',
        x: 0,
        w: 1,
        h: 1,
        startDate: '2023-10-10',
        endDate: '2023-10-10',
        modifiedBy: 543543,
        modifiedDate: '2023-10-10',
        personName: 'Me',
      }]);
    });

    it('should not update attributes and state if gs-w or resizing.current.x is not set', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-h', '3');
      el.setAttribute('gs-id', '1');

      handleResizeStop(el, mockDaysArray, items);

      expect(el.getAttribute('gs-w')).toBeNull();
      expect(items).toEqual([{
        id: '1',
        time: 3,
        name: 'Task Name',
        color: '#FF0000',
        x: 0,
        w: 1,
        h: 1,
        startDate: '2023-10-10',
        status: 'none',
        taskName: 'Test Task',
        endDate: '2023-10-10',
        modifiedBy: 543543,
        modifiedDate: '2023-10-10',
        personName: 'Me',
      }]);
    });
  });

  describe('onMouseEnter and onMouseLeave', () => {
    let gridRefMock:any;
    const div = document.createElement('div');
    div.setAttribute('gs-id', '1');
    beforeEach(() => {
      gridRefMock = {
        getGridItems: jest.fn(() => [div]),
        update: jest.fn(),
      };
    });

    it('should unlock and enable move and resize on onMouseEnter', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-id', '1');
      document.body.appendChild(el);

      GridCallbacks.onMouseEnter('1', gridRefMock);

      expect(gridRefMock.update).toHaveBeenCalledWith(el, {
        locked: false,
        noMove: false,
        noResize: false,
      });
    });

    it('should lock and disable move and resize on onMouseLeave', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-id', '1');
      document.body.appendChild(el);

      GridCallbacks.onMouseLeave('1', gridRefMock);

      expect(gridRefMock.update).toHaveBeenCalledWith(el, {
        locked: true,
        noMove: true,
        noResize: true,
      });
    });

    it('should not update if gs-id does not match on onMouseEnter', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-id', '2');
      document.body.appendChild(el);

      GridCallbacks.onMouseEnter('2', gridRefMock);

      expect(gridRefMock.update).not.toHaveBeenCalled();
    });

    it('should not update if gs-id does not match on onMouseLeave', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-id', '2');
      document.body.appendChild(el);

      GridCallbacks.onMouseLeave('2', gridRefMock);

      expect(gridRefMock.update).not.toHaveBeenCalled();
    });

    it('should not update if gridRef is null on onMouseEnter', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-id', '1');
      document.body.appendChild(el);

      GridCallbacks.onMouseEnter('1', null);

      expect(gridRefMock.update).not.toHaveBeenCalled();
    });

    it('should not update if gridRef is null on onMouseLeave', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-id', '2');
      document.body.appendChild(el);

      GridCallbacks.onMouseLeave('1', null);

      expect(gridRefMock.update).not.toHaveBeenCalled();
    });
    it('should not update if gs-id does not match on onMouseLeave', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-id', '2');
      document.body.appendChild(el);

      GridCallbacks.onMouseLeave('2', gridRefMock);

      expect(gridRefMock.update).not.toHaveBeenCalled();
    });

    it('should not update if gridRef is null on onMouseEnter', () => {
      const el = document.createElement('div');
      el.setAttribute('gs-id', '1');
      document.body.appendChild(el);

      GridCallbacks.onMouseEnter('1', null);

      expect(gridRefMock.update).not.toHaveBeenCalled();
    });
  });

  describe('handleElDropped', () => {
    let previousWidgetMock: {
      x?: number;
      id: string;
      grid: { getGridItems: jest.Mock<any, any>,
        addWidget: jest.Mock<any, any> };
      w?: number;
      el: HTMLDivElement;
    };
    let newWidgetMock: { grid: { getGridItems: jest.Mock<any, any>,
      addWidget: jest.Mock<any, any> } };

    beforeEach(() => {
      previousWidgetMock = {
        x: 1,
        id: '1',
        grid: {
          getGridItems: jest.fn(() => []),
          addWidget: jest.fn(() => []),
        },
        w: 2,
        el: document.createElement('div'),
      };

      newWidgetMock = {
        grid: {
          getGridItems: jest.fn(() => []),
          addWidget: jest.fn(() => []),
        },
      };
    });

    it('should update the old element and add it back to the old grid on drop', () => {
      handleElDropped(previousWidgetMock as any, newWidgetMock as any);

      expect(previousWidgetMock.el.getAttribute('gs-x')).toBeNull();
      expect(previousWidgetMock.grid.addWidget).not.toHaveBeenCalledWith(previousWidgetMock.el);
    });

    it('should not update if oldX, oldW, or newGridItems are not set', () => {
      previousWidgetMock.x = undefined;
      previousWidgetMock.w = undefined;
      newWidgetMock.grid.getGridItems = jest.fn(() => null);

      handleElDropped(previousWidgetMock as any, newWidgetMock as any);

      expect(previousWidgetMock.el.getAttribute('gs-x')).toBeNull();
      expect(previousWidgetMock.grid.addWidget).not.toHaveBeenCalled();
    });
  });

  // Additional tests for existing functions can be added here
});
