import { Stat } from './../../../src/microservice/domain/model/stat.model';

export const mockStats = () => {
  const stat = new Stat();
  stat.stock = 'any_stock';
  stat.times_requested = 55;

  const stat1 = new Stat();
  stat1.stock = 'any_stock1';
  stat1.times_requested = 45;

  const stat2 = new Stat();
  stat2.stock = 'any_stock2';
  stat2.times_requested = 33;

  const stat3 = new Stat();
  stat3.stock = 'any_stock3';
  stat3.times_requested = 21;

  const stat4 = new Stat();
  stat4.stock = 'any_stock4';
  stat4.times_requested = 15;

  return [stat, stat1, stat2, stat3, stat4];
};
