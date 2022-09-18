import { Stat } from './../../../src/microservice/domain/model/stat.model';

export const mockDesornedStats = () => {
  const stat = new Stat();
  stat.stock = 'any_stock';
  stat.times_requested = 55;

  const stat2 = new Stat();
  stat2.stock = 'any_stock2';
  stat2.times_requested = 33;

  const stat5 = new Stat();
  stat5.stock = 'any_stock5';
  stat5.times_requested = 15;

  const stat6 = new Stat();
  stat6.stock = 'any_stock6';
  stat6.times_requested = 13;

  const stat7 = new Stat();
  stat7.stock = 'any_stock7';
  stat7.times_requested = 11;

  const stat3 = new Stat();
  stat3.stock = 'any_stock3';
  stat3.times_requested = 21;

  const stat4 = new Stat();
  stat4.stock = 'any_stock4';
  stat4.times_requested = 20;

  const stat1 = new Stat();
  stat1.stock = 'any_stock1';
  stat1.times_requested = 45;

  return [stat, stat1, stat2, stat3, stat4, stat5, stat6, stat7];
};

export const mockExpectedStats = () => {
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
  stat4.times_requested = 20;

  return [stat, stat1, stat2, stat3, stat4];
};

export const mockAgregatedStats = () => {
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
