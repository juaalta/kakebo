import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { JournalEntry } from "@routes/control/models/journal_entry.model";

@Injectable()
export class StoreService {
  private state = {
    monthBalances: [],
    journalEntries: []
  };
  public getStateSnapshot = () => {
    return { ...this.state };
  };

  private monthBalance$ = new BehaviorSubject<MonthBalance[]>([]);
  public getMonthBalance$ = this.monthBalance$.asObservable();

  private journalEntries$ = new BehaviorSubject<JournalEntry[]>([]);
  // public getJournalEntries$ = this.journalEntries$.asObservable();

  private projectedIncomes$ = new BehaviorSubject<JournalEntry[]>([]);
  public getProjectedIncomes$ = this.projectedIncomes$.asObservable();
  private projectedOutgoings$ = new BehaviorSubject<JournalEntry[]>([]);
  public getProjectedOutgoings$ = this.projectedOutgoings$.asObservable();
  private expenses$ = new BehaviorSubject<JournalEntry[]>([]);
  public getExpenses$ = this.expenses$.asObservable();

  private monthMustBeRecalculated$ = new Subject<MonthBalance>();
  public getMonthMustBeRecalculated$ = this.monthMustBeRecalculated$.asObservable();

  constructor() {}

  public setMonthBalances(monthBalances: MonthBalance[]) {
    if (monthBalances) this.state.monthBalances = [...monthBalances];
    this.monthBalance$.next(this.state.monthBalances);
  }
  public postMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = [...this.state.monthBalances, monthBalance];
    this.monthBalance$.next(this.state.monthBalances);
  }
  public putMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = this.state.monthBalances.map(
      m => (m._id === monthBalance._id ? monthBalance : m)
    );
    this.monthBalance$.next(this.state.monthBalances);
  }

  public setJournalEntries(journalEntries: JournalEntry[]) {
    if (journalEntries) this.state.journalEntries = [...journalEntries];
    this.journalEntries$.next(this.state.journalEntries);
  }
  public postJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = [...this.state.journalEntries, journalEntry];
    this.journalEntries$.next(this.state.journalEntries);
    this.mustUpdateEntries(journalEntry);
    this.monthMustRecalculate(journalEntry);
  }
  public deleteJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = this.state.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
    this.journalEntries$.next(this.state.journalEntries);
    this.mustUpdateEntries(journalEntry);
    this.monthMustRecalculate(journalEntry);
  }
  private mustUpdateEntries(journalEntry: JournalEntry) {
    switch (journalEntry.kind) {
      case "I":
        this.updateIncomes(journalEntry.year, journalEntry.month);
        break;
      case "O":
        this.updateOutgoins(journalEntry.year, journalEntry.month);
        break;
      case "E":
        this.updateExpenses(journalEntry.year, journalEntry.month);
        break;
      default:
        break;
    }
  }
  private updateIncomes(year: number, month: number) {
    const incomes = this.filterJournalsByKind("I", year, month);
    this.projectedIncomes$.next(incomes);
  }
  private updateOutgoins(year: number, month: number) {
    const incomes = this.filterJournalsByKind("O", year, month);
    this.projectedOutgoings$.next(incomes);
  }
  private updateExpenses(year: number, month: number) {
    const incomes = this.filterJournalsByKind("E", year, month);
    this.expenses$.next(incomes);
  }
  public filterJournalsByKind(
    kind: string,
    year: number,
    month: number
  ): JournalEntry[] {
    return this.state.journalEntries.filter(
      p => p.kind === kind && p.year === year && p.month === month
    );
  }
  private monthMustRecalculate(journalEntry: JournalEntry) {
    const month = this.state.monthBalances.find(
      m => m.year === journalEntry.year && m.month === journalEntry.month
    );
    if (month) this.monthMustBeRecalculated$.next(month);
    else console.warn("No month, state: ", this.state);
  }
}
