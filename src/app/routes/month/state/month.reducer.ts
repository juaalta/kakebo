import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

export const MonthReducers = {
  reduceGetMonthBalances(state: any, monthBalances: MonthBalance[]) {
    if (monthBalances) {
      state.monthBalances = monthBalances;
      MonthReducers.reduceSetCurrentMonthBalance(state);
    }
  },
  reducePostMonthBalance(state: any, monthBalance: MonthBalance) {
    state.monthBalances = [...state.monthBalances, monthBalance];
    MonthReducers.reduceSetCurrentMonthBalance(state);
  },
  reducePutMonthBalance(state: any, monthBalance: MonthBalance) {
    state.monthBalances = state.monthBalances.map(
      m => (m._id === monthBalance._id ? monthBalance : m)
    );
    MonthReducers.reduceSetCurrentMonthBalance(state);
  },
  reduceJournalEntries(state: any, journalEntries: JournalEntry[]): any {
    if (journalEntries) {
      state.journalEntries = [...journalEntries];
      return MonthReducers.reduceSetCurrentMonthBalance(state);
    }
    return state;
  },
  reducePostJournalEntry(state: any, journalEntry: JournalEntry): any {
    state.journalEntries = [...state.journalEntries, journalEntry];
    return { ...state };
  },
  reduceDeleteJournalEntry(state: any, journalEntry: JournalEntry): any {
    state.journalEntries = state.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
    return { ...state };
  },
  reduceSetCurrentMonthBalance(state: any): MonthBalance {
    state.monthBalance = state.monthBalances.find(
      m => m.year === state.year && m.month === state.month
    );
    return MonthReducers.calculateMonthBalance(state);
  },
  calculateMonthBalance(state: any): MonthBalance {
    const mb = state.monthBalance;
    if (mb) {
      if (state.journalEntries) {
        mb.incomes = MonthReducers.sumAmount(
          MonthReducers.filterJournalsByKind(state, "I")
        );
        mb.outgoings = MonthReducers.sumAmount(
          MonthReducers.filterJournalsByKind(state, "O")
        );
        mb.expenses = MonthReducers.sumAmount(
          MonthReducers.filterJournalsByKind(state, "E")
        );
        mb.savings = mb.incomes - mb.outgoings - mb.expenses;
        mb.available = mb.savings - mb.goal;
      }
      return mb;
    }
    return null;
  },
  filterJournalsByKind(state: any, kind: string): JournalEntry[] {
    return state.journalEntries.filter(
      p => p.kind === kind && p.year === state.year && p.month === state.month
    );
  },
  sumAmount(entries: JournalEntry[]): number {
    return entries
      .map(p => p.amount)
      .reduce((state, current) => state + current, 0);
  }
};
