import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { ControlApiService } from "@routes/control/control-api.service";

@Injectable()
export class StoreService {
  private state = {
    monthBalances: [],
    journalEntries: [],
    year: 0,
    month: 0,
    monthBalance: null
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
    this.reduceSetCurrentMonthBalance();
  }

  public dispatchGetMonthBalances(): void {
    this.controlApi.getMonthBalancesList$().subscribe(res => {
      this.reduceGetMonthBalances(res);
    });
  }
  private reduceGetMonthBalances(monthBalances: MonthBalance[]) {
    if (monthBalances) {
      this.state.monthBalances = monthBalances;
      this.reduceSetCurrentMonthBalance();
    }
    if (!this.state.monthBalance) {
      this.dispatchPostMonthBalance();
    }
  }
  private dispatchPostMonthBalance() {
    this.controlApi
      .postMonthBalance$(this.state.year, this.state.month)
      .subscribe(res => this.reducePostMonthBalance(res));
  }
  private reducePostMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = [...this.state.monthBalances, monthBalance];
    this.reduceSetCurrentMonthBalance();
  }

  public dispatchSetGoalMonth(goal: number): void {
    this.state.monthBalance = { ...this.state.monthBalance, goal };
    this.dispatchPutMonthBalance();
  }
  private dispatchPutMonthBalance(): void {
    this.calculateMonthBalance();
    this.controlApi
      .putMonthBalance$(this.state.monthBalance)
      .subscribe(res => this.reducePutMonthBalance(res));
  }
  private reducePutMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = this.state.monthBalances.map(
      m => (m._id === monthBalance._id ? monthBalance : m)
    );
    this.reduceSetCurrentMonthBalance();
  }

  public dispatchGetJournalEntries() {
    this.controlApi
      .getJournalEntriesList$()
      .subscribe(res => this.reduceJournalEntries(res));
  }
  private reduceJournalEntries(journalEntries: JournalEntry[]) {
    if (journalEntries) {
      this.state.journalEntries = [...journalEntries];
      this.projectedIncomes$.next(this.filterJournalsByKind("I"));
      this.projectedOutgoings$.next(this.filterJournalsByKind("O"));
      this.expenses$.next(this.filterJournalsByKind("E"));
      this.reduceSetCurrentMonthBalance();
    }
  }

  public dispatchPostJournalEntry(aJournalEntry: JournalEntry): void {
    this.controlApi
      .postJournalEntry$(aJournalEntry)
      .subscribe(res => this.reducePostJournalEntry(res));
  }
  private reducePostJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = [...this.state.journalEntries, journalEntry];
    this.updateEntriesByKind(journalEntry);
  }

  public dispatchDeleteJournalEntry(aJournalEntry: JournalEntry) {
    this.controlApi
      .deleteJournalEntry$(aJournalEntry)
      .subscribe(res => this.reduceDeleteJournalEntry(aJournalEntry));
  }
  private reduceDeleteJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = this.state.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
    this.updateEntriesByKind(journalEntry);
  }

  private reduceSetCurrentMonthBalance(): void {
    this.state.monthBalance = this.state.monthBalances.find(
      m => m.year === this.state.year && m.month === this.state.month
    );
    this.calculateMonthBalance();
  }
  private updateEntriesByKind(journalEntry: JournalEntry) {
    switch (journalEntry.kind) {
      case "I":
        this.projectedIncomes$.next(this.filterJournalsByKind("I"));
        break;
      case "O":
        this.projectedOutgoings$.next(this.filterJournalsByKind("O"));
        break;
      case "E":
        this.expenses$.next(this.filterJournalsByKind("E"));
        break;
      default:
        break;
    }
    this.dispatchPutMonthBalance();
  }
  private filterJournalsByKind(kind: string): JournalEntry[] {
    return this.state.journalEntries.filter(
      p =>
        p.kind === kind &&
        p.year === this.state.year &&
        p.month === this.state.month
    );
  }
  private calculateMonthBalance = (): void => {
    const mb = this.state.monthBalance;
    if (mb) {
      if (this.state.journalEntries) {
        mb.incomes = this.sumAmount(this.filterJournalsByKind("I"));
        mb.outgoings = this.sumAmount(this.filterJournalsByKind("O"));
        mb.expenses = this.sumAmount(this.filterJournalsByKind("E"));
        mb.savings = mb.incomes - mb.outgoings - mb.expenses;
        mb.available = mb.savings - mb.goal;
      }
      this.monthBalance$.next({ ...this.state.monthBalance });
    }
  };
  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
