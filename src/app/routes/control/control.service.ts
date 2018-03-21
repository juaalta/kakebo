import { Injectable } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";

@Injectable()
export class ControlService {
  private _journalEntries: JournalEntry[] = [];
  private _monthBalances: MonthBalance[] = [];
  private _newMonthBalance: MonthBalance = {
    year: 0,
    month: 0,
    incomes: 0,
    outgoigns: 0,
    expenses: 0,
    savings: 0,
    goal: 0
  };
  get journalEntries() {
    return [...this._journalEntries];
  }

  get mothBalances() {
    return this._monthBalances;
  }

  constructor() {}

  public postJournalEntry(newJournalEntry: JournalEntry) {
    newJournalEntry._id = new Date().getTime().toString();
    this._journalEntries = this.postToArray(
      this._journalEntries,
      newJournalEntry
    );
    this.calculateMonthBalance(newJournalEntry.year, newJournalEntry.month);
  }
  public deleteJournalEntry(aJournalEntry: JournalEntry) {
    this._journalEntries = this.deleteFromArray(
      this._journalEntries,
      aJournalEntry
    );
    this.calculateMonthBalance(aJournalEntry.year, aJournalEntry.month);
  }
  public filterJournalsByKind(
    kind: string,
    year: number,
    month: number
  ): JournalEntry[] {
    return this._journalEntries.filter(
      p => p.kind === kind && p.year === year && p.month === month
    );
  }

  public postMonthBalance(newMonthBalance: MonthBalance) {
    newMonthBalance._id = new Date().getTime().toString();
    this._monthBalances = this.postToArray(
      this._monthBalances,
      newMonthBalance
    );
  }
  public getMonthBalance(year: number, month: number): MonthBalance {
    let monthBalance = this._monthBalances.find(
      m => m.year === year && m.month === month
    );
    if (!monthBalance) {
      monthBalance = {
        ...this._newMonthBalance,
        year,
        month
      };
      this.postMonthBalance(monthBalance);
    }
    return monthBalance;
  }
  public updateMonthBalance(monthBalance: MonthBalance) {
    const i = this._monthBalances.findIndex(m => m._id === monthBalance._id);
    if (i) {
      this._monthBalances[i] = { ...monthBalance };
    }
  }
  public deleteMonthBalance(aMonthBalance: MonthBalance) {
    this._monthBalances = this.deleteFromArray(
      this._monthBalances,
      aMonthBalance
    );
  }

  private calculateMonthBalance(year: number, month: number) {
    let monthBalance = this.getMonthBalance(year, month);
    monthBalance.incomes = this.sumAmount(
      this.filterJournalsByKind("I", year, month)
    );
    monthBalance.outgoigns = this.sumAmount(
      this.filterJournalsByKind("O", year, month)
    );
  }
  private postToArray = (array: any[], element: any) => [...array, element];
  private deleteFromArray = (array: any[], element: any) =>
    array.filter(e => e._id !== element._id);

  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
