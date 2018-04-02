import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import { MonthBalance } from "@routes/month/models/month_balance.model";
import { JournalEntry } from "@routes/month/models/journal_entry.model";
import { ApiService } from "@routes/month/api.service";
import { Reducers } from "@routes/month/reducers.service";

@Injectable()
export class StoreService {
  private state = {
    monthBalances: [],
    journalEntries: [],
    year: 0,
    month: 0,
    monthBalance: null
  };

  public selectMonthBalance$ = this.reducers.monthBalance$.asObservable();
  public selectProjectedIncomes$ = this.reducers.projectedIncomes$.asObservable();
  public selectProjectedOutgoings$ = this.reducers.projectedOutgoings$.asObservable();
  public selectExpenses$ = this.reducers.expenses$.asObservable();

  constructor(private controlApi: ApiService, private reducers: Reducers) {}

  public dispatchYearMonth(year: number, month: number) {
    this.state = { ...this.state, year, month };
    this.reducers.reduceSetCurrentMonthBalance(this.state);
  }
  public dispatchGetMonthBalances(): void {
    this.controlApi.getMonthBalancesList$().subscribe(res => {
      this.reducers.reduceGetMonthBalances(this.state, res);
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
      .subscribe(res => this.reducers.reduceJournalEntries(this.state, res));
  }
  public dispatchPostJournalEntry(aJournalEntry: JournalEntry): void {
    this.controlApi.postJournalEntry$(aJournalEntry).subscribe(res => {
      this.reducers.reducePostJournalEntry(this.state, res);
      this.dispatchPutMonthBalance();
    });
  }
  public dispatchDeleteJournalEntry(aJournalEntry: JournalEntry) {
    this.controlApi.deleteJournalEntry$(aJournalEntry).subscribe(res => {
      this.reducers.reduceDeleteJournalEntry(this.state, aJournalEntry);
      this.dispatchPutMonthBalance();
    });
  }

  private dispatchPostMonthBalance() {
    this.controlApi
      .postMonthBalance$(this.state.year, this.state.month)
      .subscribe(res => this.reducers.reducePostMonthBalance(this.state, res));
  }
  private dispatchPutMonthBalance(): void {
    this.reducers.calculateMonthBalance(this.state);
    this.controlApi
      .putMonthBalance$(this.state.monthBalance)
      .subscribe(res => this.reducers.reducePutMonthBalance(this.state, res));
  }
}
