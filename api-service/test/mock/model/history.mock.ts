import { StockHistory } from './../../../src/microservice/domain/schema/stock-history.schema';

export const mockHistoryStockArray = () => {
  const stock = new StockHistory();
  stock.userEmail = 'any_email';
  stock.date = new Date('2022-09-18 17:00');
  stock.name = 'any_name';
  stock.symbol = 'any_symbol';
  stock.open = 100;
  stock.close = 101;
  stock.high = 111;
  stock.low = 90;

  const stock2 = new StockHistory();
  stock2.userEmail = 'any_email';
  stock2.date = new Date('2022-09-17 11:00');
  stock2.name = 'any_name2';
  stock2.symbol = 'any_symbol2';
  stock2.open = 200;
  stock2.close = 201;
  stock2.high = 211;
  stock2.low = 110;

  return [stock, stock2];
};

export const mockHistoryStock = () => {
  const stock = new StockHistory();
  stock.userEmail = 'any_email';
  stock.date = new Date('2022-09-18 17:00');
  stock.name = 'any_name';
  stock.symbol = 'any_symbol';
  stock.open = 100;
  stock.close = 101;
  stock.high = 111;
  stock.low = 90;

  return stock;
};
