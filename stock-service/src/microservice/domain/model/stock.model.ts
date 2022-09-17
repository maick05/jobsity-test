export class StockResponse {
  symbols: Stock[];
}

export class Stock {
  symbol: string;
  date: string;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  name: string;
}
