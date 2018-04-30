export interface MonthBalance {
  _id?: string;
  year: number;
  month: number;
  incomes: number;
  outgoings: number;
  goal: number;
  available: number;
  expenses: number;
  savings: number;
}

export const monthBalanceInitialState = {
  year: 0,
  month: 0,
  incomes: 0,
  outgoings: 0,
  goal: 0,
  available: 0,
  expenses: 0,
  savings: 0
};
