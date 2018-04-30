import { expenseCategoriesEnum } from './expense-categories.model';
import { journalEntryKindsEnum } from './journal-entry-kinds.model';

export interface JournalEntry {
  _id?: string;
  year: number;
  month: number;
  day: number;
  date?: Date;
  kind?: journalEntryKindsEnum;
  category?: expenseCategoriesEnum;
  description?: string;
  amount: number;
}

export const expenseInitialState = {
  year: 0,
  month: 0,
  day: 0,
  kind: journalEntryKindsEnum.Expense,
  category: expenseCategoriesEnum.General,
  amount: 0
};

export const forecastInitialState = {
  year: 0,
  month: 0,
  day: 0,
  kind: journalEntryKindsEnum.Income,
  amount: 0
};

export const journalEntriesInitialState = [];
