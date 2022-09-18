import { Stock } from '../../../src/microservice/domain/model/stock.model';

export const mockStock = () => {
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

  return stock;
};

export const mockMappedStock = () => {
  return {
    close: 101,
    date: 'any_date',
    high: 111,
    low: 90,
    name: 'any_name',
    open: 100,
    symbol: 'any_symbol',
    time: 'any_time',
    volume: 190
  };
};

export const mockStockResponse = () => {
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
