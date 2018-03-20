export interface JournalEntry {
  _id?: string;
  year: number;
  month: number;
  day: number;
  kind: "I" | "O" | "E";
  expenseCategory?: "G" | "L" | "C" | "E";
  description?: string;
  amount: number;
}
