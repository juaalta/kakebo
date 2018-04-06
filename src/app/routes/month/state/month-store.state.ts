import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ApiService } from "@routes/month/api.service";
import { MonthReducers } from "@routes/month/state/month.reducer";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
@Injectable()
export class MonthStore {
  private state = {
    monthBalances: [],
    journalEntries: [],
    year: 0,
    month: 0,
    monthBalance: null
  };
  private monthBalance$ = new BehaviorSubject<MonthBalance>(null);
  private projectedIncomes$ = new BehaviorSubject<JournalEntry[]>([]);
  private projectedOutgoings$ = new BehaviorSubject<JournalEntry[]>([]);
  private expenses$ = new BehaviorSubject<JournalEntry[]>([]);

  public selectMonthBalance$ = this.monthBalance$.asObservable();
  public selectProjectedIncomes$ = this.projectedIncomes$.asObservable();
  public selectProjectedOutgoings$ = this.projectedOutgoings$.asObservable();
  public selectExpenses$ = this.expenses$.asObservable();

  constructor(private controlApi: ApiService) {}

  public dispatchYearMonth(year: number, month: number) {
    this.state = { ...this.state, year, month };
    MonthReducers.reduceSetCurrentMonthBalance(this.state);
  }
  public dispatchGetMonthBalances(): void {
    this.controlApi.getMonthBalancesList$().subscribe(res => {
      MonthReducers.reduceGetMonthBalances(this.state, res);
      if (!this.state.monthBalance) {
        this.dispatchPostMonthBalance();
      }
    });
  }
  public dispatchSetGoalMonth(goal: number): void {
    this.state.monthBalance = { ...this.state.monthBalance, goal };
    this.dispatchPutMonthBalance();
  }
  public dispatchGetJournalEntries() {
    this.controlApi
      .getJournalEntriesList$()
      .subscribe(res => MonthReducers.reduceJournalEntries(this.state, res));
  }
  public dispatchPostJournalEntry(aJournalEntry: JournalEntry): void {
    this.controlApi.postJournalEntry$(aJournalEntry).subscribe(res => {
      MonthReducers.reducePostJournalEntry(this.state, res);
      this.dispatchPutMonthBalance();
    });
  }
  public dispatchDeleteJournalEntry(aJournalEntry: JournalEntry) {
    this.controlApi.deleteJournalEntry$(aJournalEntry).subscribe(res => {
      MonthReducers.reduceDeleteJournalEntry(this.state, aJournalEntry);
      this.dispatchPutMonthBalance();
    });
  }

  private dispatchPostMonthBalance() {
    this.controlApi
      .postMonthBalance$(this.state.year, this.state.month)
      .subscribe(res => MonthReducers.reducePostMonthBalance(this.state, res));
  }
  private dispatchPutMonthBalance(): void {
    MonthReducers.calculateMonthBalance(this.state);
    this.controlApi
      .putMonthBalance$(this.state.monthBalance)
      .subscribe(res => MonthReducers.reducePutMonthBalance(this.state, res));
  }
}
