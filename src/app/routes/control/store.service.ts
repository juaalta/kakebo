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

  private monthMustBeRecalculated$ = new Subject<MonthBalance>();
  public selectMonthMustBeRecalculated$ = this.monthMustBeRecalculated$.asObservable();

  constructor(private controlApi: ControlApiService) {}

  public dispatchYearMonth(year: number, month: number) {
    this.state = { ...this.state, year, month };
  }

  public dispatchGetMonthBalances(year: number, month: number): void {
    this.controlApi.getMonthBalancesList$().subscribe(res => {
      this.setMonthBalances(res);
      const month_balance = this.getStateSnapshot().monthBalance;
      if (!month_balance) {
        this.postMonthBalance(year, month);
      }
    });
  }
  private setMonthBalances(monthBalances: MonthBalance[]) {
    if (monthBalances) {
      this.state.monthBalances = [...monthBalances];
    }
    this.filterMonthBalance();
  }
  private postMonthBalance(year: number, month: number) {
    const monthBalance = {
      ...this._newMonthBalance,
      year,
      month
    };
    this.controlApi
      .postMonthBalance$(monthBalance)
      .subscribe(res => this.setMonthBalance(res));
  }
  private setMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = [...this.state.monthBalances, monthBalance];
    this.filterMonthBalance();
  }

  public dispatchPutMonthBalance(aMonthBalance: MonthBalance): void {
    this.calculateMonthBalances(aMonthBalance);
    this.controlApi
      .putMonthBalance$(aMonthBalance)
      .subscribe(res => this.putMonthBalance(res));
  }
  private putMonthBalance(monthBalance: MonthBalance) {
    this.state.monthBalances = this.state.monthBalances.map(
      m => (m._id === monthBalance._id ? monthBalance : m)
    );
    this.filterMonthBalance();
  }
  private calculateMonthBalances = (mb: MonthBalance): any => {
    const entries = this.getStateSnapshot().journalEntries;
    mb.incomes = this.sumAmount(
      this.filterJournalsByKind("I", mb.year, mb.month)
    );
    mb.outgoigns = this.sumAmount(
      this.filterJournalsByKind("O", mb.year, mb.month)
    );
    mb.expenses = this.sumAmount(
      this.filterJournalsByKind("E", mb.year, mb.month)
    );
    mb.savings = mb.incomes - mb.outgoigns - mb.expenses;
    mb.available = mb.savings - mb.goal;
  };
  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);

  public dispatchGetJournalEntries() {
    this.controlApi
      .getJournalEntriesList$()
      .subscribe(res => this.setJournalEntries(res));
  }
  private setJournalEntries(journalEntries: JournalEntry[]) {
    if (journalEntries) {
      this.state.journalEntries = [...journalEntries];
      this.updateIncomes(this.state.year, this.state.month);
      this.updateOutgoins(this.state.year, this.state.month);
      this.updateExpenses(this.state.year, this.state.month);
    }
  }

  public dispatchPostJournalEntry(aJournalEntry: JournalEntry): void {
    this.controlApi
      .postJournalEntry$(aJournalEntry)
      .subscribe(res => this.postJournalEntry(res));
  }
  private postJournalEntry(journalEntry: JournalEntry) {
    this.state.journalEntries = [...this.state.journalEntries, journalEntry];
    this.mustUpdateEntries(journalEntry);
    this.monthMustRecalculate(journalEntry);
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
