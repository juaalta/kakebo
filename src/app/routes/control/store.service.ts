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
    journalEntries: [],
    year: 0,
    month: 0,
    monthBalance: null
  };
  public getStateSnapshot = () => {
    return { ...this.state };
  };

  private monthBalance$ = new BehaviorSubject<MonthBalance>(null);
  public getMonthBalance$ = this.monthBalance$.asObservable();

  private projectedIncomes$ = new BehaviorSubject<JournalEntry[]>([]);
  public getProjectedIncomes$ = this.projectedIncomes$.asObservable();
  private projectedOutgoings$ = new BehaviorSubject<JournalEntry[]>([]);
  public getProjectedOutgoings$ = this.projectedOutgoings$.asObservable();
  private expenses$ = new BehaviorSubject<JournalEntry[]>([]);
  public getExpenses$ = this.expenses$.asObservable();

  private monthMustBeRecalculated$ = new Subject<MonthBalance>();
  public getMonthMustBeRecalculated$ = this.monthMustBeRecalculated$.asObservable();

  constructor() {}

  public setYearMonth(year: number, month: number) {
    this.state = { ...this.state, year, month };
  }

  public setMonthBalances(monthBalances: MonthBalance[]) {
    if (monthBalances) {
      this.state.monthBalances = [...monthBalances];
    }
    this.filterMonthBalance();
  }
  public postMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = [...this.state.monthBalances, monthBalance];
    this.filterMonthBalance();
  }
  public putMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = this.state.monthBalances.map(
      m => (m._id === monthBalance._id ? monthBalance : m)
    );
    this.filterMonthBalance();
  }

  public setJournalEntries(journalEntries: JournalEntry[]) {
    if (journalEntries) {
      this.state.journalEntries = [...journalEntries];
      this.updateIncomes(this.state.year, this.state.month);
      this.updateOutgoins(this.state.year, this.state.month);
      this.updateExpenses(this.state.year, this.state.month);
    }
  }
  public postJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = [...this.state.journalEntries, journalEntry];
    this.mustUpdateEntries(journalEntry);
    this.monthMustRecalculate(journalEntry);
  }
  public deleteJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = this.state.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
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
    this.filterMonthBalance();
    this.monthMustBeRecalculated$.next(this.state.monthBalance);
  }
  private filterMonthBalance(): void {
    this.state.monthBalance = this.state.monthBalances.find(
      m => m.year === this.state.year && m.month === this.state.month
    );
    this.monthBalance$.next(this.state.monthBalance);
  }
}
