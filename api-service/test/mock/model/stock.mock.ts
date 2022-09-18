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
