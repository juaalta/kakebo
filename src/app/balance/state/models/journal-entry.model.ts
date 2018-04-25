export interface JournalEntry {
  _id?: string;
  year: number;
  month: number;
  day: number;
  date?: Date;
  kind?: string;
  category?: string;
  description?: string;
  amount: number;
}

export const expenseInitialState = {
  year: 0,
  month: 0,
  day: 0,
  kind: 'E',
  category: 'G',
  amount: 0
};

export const journalEntriesInitialState = [];
