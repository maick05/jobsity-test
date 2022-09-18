import {
  Stock,
  StockResponse
} from './../../src/microservice/domain/model/stock.model';
export const mockStockRes = () => {
  const stockRes = new StockResponse();
  const stock = new Stock();
  stock.name = 'any_name';
  stock.symbol = 'any_symbol';
  stock.date = 'any_date';
  stock.time = 'any_time';
  stock.open = 100;
  stock.close = 101;
  stock.high = 111;
  stock.low = 90;
  stock.volume = 190;
  stockRes.symbols = [stock];
  return stockRes;
};

export const mockRes = {
  data: mockStockRes(),
  headers: {},
  config: { url: 'any' },
  status: 200,
  statusText: 'OK'
};

export const mockStockExpected = () => {
  return [
    {
      close: 101,
      date: 'any_date',
      high: 111,
      low: 90,
      name: 'any_name',
      open: 100,
      symbol: 'any_symbol',
      time: 'any_time',
      volume: 190
    }
  ];
};
