export interface JournalEntry {
  _id?: string;
  year: number;
  month: number;
  day: number;
  date?: Date;
  kind?: "I" | "O" | "E";
  expenseCategory?: "G" | "L" | "C" | "E";
  description?: string;
  amount: number;
}

export const journalEntryInitialState: JournalEntry = {
  year: 0,
  month: 0,
  day: 0,
  amount: 0
}

export const journalEntriesInitialState: JournalEntry[] = [];
