import { MonthBalance } from "@routes/month/models/month_balance.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { JournalEntry } from "@routes/month/models/journal_entry.model";
import { Injectable } from "@angular/core";

@Injectable()
export class Reducers {
  public monthBalance$ = new BehaviorSubject<MonthBalance>(null);
  public projectedIncomes$ = new BehaviorSubject<JournalEntry[]>([]);
  public projectedOutgoings$ = new BehaviorSubject<JournalEntry[]>([]);
  public expenses$ = new BehaviorSubject<JournalEntry[]>([]);

  public reduceGetMonthBalances(state: any, monthBalances: MonthBalance[]) {
    if (monthBalances) {
      state.monthBalances = monthBalances;
      this.reduceSetCurrentMonthBalance(state);
    }
  }
  public reducePostMonthBalance(state: any, monthBalance: MonthBalance) {
    state.monthBalances = [...state.monthBalances, monthBalance];
    this.reduceSetCurrentMonthBalance(state);
  }
  public reducePutMonthBalance(state: any, monthBalance: MonthBalance) {
    state.monthBalances = state.monthBalances.map(
      m => (m._id === monthBalance._id ? monthBalance : m)
    );
    this.reduceSetCurrentMonthBalance(state);
  }
  public reduceJournalEntries(state: any, journalEntries: JournalEntry[]) {
    if (journalEntries) {
      state.journalEntries = [...journalEntries];
      this.projectedIncomes$.next(this.filterJournalsByKind(state, "I"));
      this.projectedOutgoings$.next(this.filterJournalsByKind(state, "O"));
      this.expenses$.next(this.filterJournalsByKind(state, "E"));
      this.reduceSetCurrentMonthBalance(state);
    }
  }
  public reducePostJournalEntry(state: any, journalEntry: JournalEntry) {
    state.journalEntries = [...state.journalEntries, journalEntry];
    this.updateEntriesByKind(state, journalEntry);
  }
  public reduceDeleteJournalEntry(state: any, journalEntry: JournalEntry) {
    state.journalEntries = state.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
    this.updateEntriesByKind(state, journalEntry);
  }
  public reduceSetCurrentMonthBalance(state: any): void {
    state.monthBalance = state.monthBalances.find(
      m => m.year === state.year && m.month === state.month
    );
    this.calculateMonthBalance(state);
  }
  public calculateMonthBalance = (state: any): void => {
    const mb = state.monthBalance;
    if (mb) {
      if (state.journalEntries) {
        mb.incomes = this.sumAmount(this.filterJournalsByKind(state, "I"));
        mb.outgoings = this.sumAmount(this.filterJournalsByKind(state, "O"));
        mb.expenses = this.sumAmount(this.filterJournalsByKind(state, "E"));
        mb.savings = mb.incomes - mb.outgoings - mb.expenses;
        mb.available = mb.savings - mb.goal;
      }
      this.monthBalance$.next({ ...state.monthBalance });
    }
  };

  private updateEntriesByKind(state: any, journalEntry: JournalEntry) {
    switch (journalEntry.kind) {
      case "I":
        this.projectedIncomes$.next(this.filterJournalsByKind(state, "I"));
        break;
      case "O":
        this.projectedOutgoings$.next(this.filterJournalsByKind(state, "O"));
        break;
      case "E":
        this.expenses$.next(this.filterJournalsByKind(state, "E"));
        break;
      default:
        break;
    }
  }
  private filterJournalsByKind(state: any, kind: string): JournalEntry[] {
    return state.journalEntries.filter(
      p => p.kind === kind && p.year === state.year && p.month === state.month
    );
  }
  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
