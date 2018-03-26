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
  public getJournalEntries$ = this.journalEntries$.asObservable();
  private monthMustBeRecalculated$ = new Subject<MonthBalance>();
  public getMonthMustBeRecalculated$ = this.monthMustBeRecalculated$.asObservable();

  constructor() {}

  public setMonthBalances(monthBalances: MonthBalance[]) {
    if (monthBalances)
      this.state.monthBalances = [...monthBalances];
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
    this.monthMustRecalculate(journalEntry);
  }
  public deleteJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = this.state.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
    this.journalEntries$.next(this.state.journalEntries);
    this.monthMustRecalculate(journalEntry);
  }
  private monthMustRecalculate(journalEntry: JournalEntry) {
    const month = this.state.monthBalances.find(
      m => m.year === journalEntry.year && m.month === journalEntry.month
    );
    if (month) this.monthMustBeRecalculated$.next(month);
    else console.warn("No month, state: ", this.state);
  }
}
