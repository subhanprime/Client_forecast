// ********************************** People Component *****************************

import axios from 'axios';
import { getPeopleDataMockoon } from '../services/peopleTableService';
import { getProjectDataMockoon } from '../services/projectTableService';

jest.mock('axios');
it('handles errors appropriately people mockoon', async () => {
  // Arrange
  const errorMessage = 'Error fetching data';
  (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

  // Act and Assert
  await expect(getPeopleDataMockoon()).rejects.toThrow(errorMessage);
});
it('handles errors appropriately project mockoon', async () => {
  // Arrange
  const errorMessage = 'Error fetching data';
  (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

  // Act and Assert
  await expect(getProjectDataMockoon()).rejects.toThrow(errorMessage);
});
