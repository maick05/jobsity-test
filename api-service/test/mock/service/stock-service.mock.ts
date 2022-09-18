import { of } from 'rxjs';

export const mockGetStockService = {
  getStock: () => {
    return;
  }
};

export const mockLogHistoryService = {
  logHistory: () => {
    return;
  }
};

export const mockGetHistoryService = {
  getHistory: () => {
    return [];
  }
};

export const mockGetStatsService = {
  getStats: () => {
    return [];
  }
};

export const mockHttpService = (response) => {
  return {
    get: jest.fn(() => of(response))
  };
};
