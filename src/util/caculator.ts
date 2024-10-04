export const numbWin = (orders: Array<number>): number => {
  return orders.filter((i) => i > 0).length;
};

export const numbLost = (orders: Array<number>): number => {
  return orders.filter((i) => i < 0).length;
};

export const winRate = (orders: Array<number>): number => {
  const result = (numbWin(orders) / orders.length) * 100;
  return +result.toFixed(2);
};

export const profitCalculator = (
  init: number,
  orders: Array<number>
): [number, number] => {
  const gain = orders.reduce((acc, cur) => acc + cur, 0);
  const gain_p = (gain / init) * 100;
  return [+gain_p.toFixed(2), gain];
};
