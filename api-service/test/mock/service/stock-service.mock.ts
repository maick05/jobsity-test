import { of } from 'rxjs';

export const mockStockService = {
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

export const mockHttpService = {
  get: jest.fn(() => of(null))
};
