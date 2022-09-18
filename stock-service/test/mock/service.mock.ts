import { of } from 'rxjs';
import { mockRes } from './stock.mock';

export const mockHttpClientService = {
  makeGet: () => {
    return {};
  }
};

export const mockHttpService = {
  get: jest.fn(() => of(mockRes))
};

export const mockGetStock = {
  getStock: () => {
    return [];
  }
};

export const mockConfig = {
  get: () => {
    return 'any';
  }
};
