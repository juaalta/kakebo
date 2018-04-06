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
  reduceJournalEntries(state: any, journalEntries: JournalEntry[]) {
    if (journalEntries) {
      state.journalEntries = [...journalEntries];
      projectedIncomes$.next(MonthReducers.filterJournalsByKind(state, "I"));
      projectedOutgoings$.next(MonthReducers.filterJournalsByKind(state, "O"));
      expenses$.next(MonthReducers.filterJournalsByKind(state, "E"));
      MonthReducers.reduceSetCurrentMonthBalance(state);
    }
  },
  reducePostJournalEntry(state: any, journalEntry: JournalEntry) {
    state.journalEntries = [...state.journalEntries, journalEntry];
    MonthReducers.updateEntriesByKind(state, journalEntry);
  },
  reduceDeleteJournalEntry(state: any, journalEntry: JournalEntry) {
    state.journalEntries = state.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
    MonthReducers.updateEntriesByKind(state, journalEntry);
  },
  reduceSetCurrentMonthBalance(state: any): void {
    state.monthBalance = state.monthBalances.find(
      m => m.year === state.year && m.month === state.month
    );
    MonthReducers.calculateMonthBalance(state);
  },
  calculateMonthBalance(state: any): void {
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
      monthBalance$.next({ ...state.monthBalance });
    }
  },
  updateEntriesByKind(state: any, journalEntry: JournalEntry) {
    switch (journalEntry.kind) {
      case "I":
        projectedIncomes$.next(MonthReducers.filterJournalsByKind(state, "I"));
        break;
      case "O":
        projectedOutgoings$.next(
          MonthReducers.filterJournalsByKind(state, "O")
        );
        break;
      case "E":
        expenses$.next(MonthReducers.filterJournalsByKind(state, "E"));
        break;
      default:
        break;
    }
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
