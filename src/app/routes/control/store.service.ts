import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { ControlApiService } from "@routes/control/control-api.service";

@Injectable()
export class StoreService {
  private _newMonthBalance: MonthBalance = {
    year: 0,
    month: 0,
    incomes: 0,
    outgoigns: 0,
    expenses: 0,
    savings: 0,
    goal: 0,
    available: 0
  };
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
  public selectMonthBalance$ = this.monthBalance$.asObservable();

  private projectedIncomes$ = new BehaviorSubject<JournalEntry[]>([]);
  public selectProjectedIncomes$ = this.projectedIncomes$.asObservable();
  private projectedOutgoings$ = new BehaviorSubject<JournalEntry[]>([]);
  public selectProjectedOutgoings$ = this.projectedOutgoings$.asObservable();
  private expenses$ = new BehaviorSubject<JournalEntry[]>([]);
  public selectExpenses$ = this.expenses$.asObservable();

  constructor(private controlApi: ControlApiService) {}

  public dispatchYearMonth(year: number, month: number) {
    this.state = { ...this.state, year, month };
    this.setCurrentMonthBalance();
  }

  public dispatchGetMonthBalances(): void {
    this.controlApi.getMonthBalancesList$().subscribe(res => {
      this.getMonthBalances(res);
      if (!this.state.monthBalance) {
        const monthBalance = {
          ...this._newMonthBalance,
          year: this.state.year,
          month: this.state.month
        };
        this.controlApi
          .postMonthBalance$(monthBalance)
          .subscribe(res => this.postMonthBalance(res));
      }
    });
  }
  private getMonthBalances(monthBalances: MonthBalance[]) {
    if (monthBalances) {
      this.state.monthBalances = monthBalances;
      this.setCurrentMonthBalance();
    }
  }
  private postMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = [...this.state.monthBalances, monthBalance];
    this.setCurrentMonthBalance();
  }

  public dispatchPutMonthBalance(aMonthBalance: MonthBalance): void {
    this.calculateMonthBalance();
    this.controlApi
      .putMonthBalance$(aMonthBalance)
      .subscribe(res => this.putMonthBalance(res));
  }
  private putMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = this.state.monthBalances.map(
      m => (m._id === monthBalance._id ? monthBalance : m)
    );
    this.setCurrentMonthBalance();
  }

  public dispatchGetJournalEntries() {
    this.controlApi
      .getJournalEntriesList$()
      .subscribe(res => this.getJournalEntries(res));
  }
  private getJournalEntries(journalEntries: JournalEntry[]) {
    if (journalEntries) {
      this.state.journalEntries = [...journalEntries];
      this.updateIncomes();
      this.updateOutgoins();
      this.updateExpenses();
      this.setCurrentMonthBalance();
    }
  }

  public dispatchPostJournalEntry(aJournalEntry: JournalEntry): void {
    this.controlApi
      .postJournalEntry$(aJournalEntry)
      .subscribe(res => this.postJournalEntry(res));
  }
  private postJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = [...this.state.journalEntries, journalEntry];
    this.updateEntriesByKind(journalEntry);
    this.calculateMonthBalance();
  }

  public dispatchDeleteJournalEntry(aJournalEntry: JournalEntry) {
    this.controlApi
      .deleteJournalEntry$(aJournalEntry)
      .subscribe(res => this.deleteJournalEntry(aJournalEntry));
  }
  private deleteJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = this.state.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
    this.updateEntriesByKind(journalEntry);
    this.calculateMonthBalance();
  }

  private updateEntriesByKind(journalEntry: JournalEntry) {
    switch (journalEntry.kind) {
      case "I":
        this.updateIncomes();
        break;
      case "O":
        this.updateOutgoins();
        break;
      case "E":
        this.updateExpenses();
        break;
      default:
        break;
    }
  }
  private updateIncomes() {
    const incomes = this.filterJournalsByKind("I");
    this.projectedIncomes$.next(incomes);
  }
  private updateOutgoins() {
    const incomes = this.filterJournalsByKind("O");
    this.projectedOutgoings$.next(incomes);
  }
  private updateExpenses() {
    const incomes = this.filterJournalsByKind("E");
    this.expenses$.next(incomes);
  }
  private filterJournalsByKind(kind: string): JournalEntry[] {
    return this.state.journalEntries.filter(
      p =>
        p.kind === kind &&
        p.year === this.state.year &&
        p.month === this.state.month
    );
  }
  private setCurrentMonthBalance(): void {
    this.state.monthBalance = this.state.monthBalances.find(
      m => m.year === this.state.year && m.month === this.state.month
    );
    this.calculateMonthBalance();
  }
  private calculateMonthBalance = (): any => {
    const mb = this.state.monthBalance;
    if (mb) {
      const entries = this.state.journalEntries;
      if (entries) {
        mb.incomes = this.sumAmount(this.filterJournalsByKind("I"));
        mb.outgoigns = this.sumAmount(this.filterJournalsByKind("O"));
        mb.expenses = this.sumAmount(this.filterJournalsByKind("E"));
        mb.savings = mb.incomes - mb.outgoigns - mb.expenses;
        mb.available = mb.savings - mb.goal;
      }
      this.monthBalance$.next(this.state.monthBalance);
    }
  };
  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
