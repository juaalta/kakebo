import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ApiService } from "@routes/month/api.service";
import { MonthReducers } from "@routes/month/state/month.reducer";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import {
  Month,
  monthInitialState
} from "@routes/month/state/models/month.model";

@Injectable()
export class MonthStore {
  private state: Month = monthInitialState;
  private monthBalance$ = new BehaviorSubject<MonthBalance>(null);
  private projectedIncomes$ = new BehaviorSubject<JournalEntry[]>([]);
  private projectedOutgoings$ = new BehaviorSubject<JournalEntry[]>([]);
  private expenses$ = new BehaviorSubject<JournalEntry[]>([]);

  public selectMonthBalance$ = this.monthBalance$.asObservable();
  public selectProjectedIncomes$ = this.projectedIncomes$.asObservable();
  public selectProjectedOutgoings$ = this.projectedOutgoings$.asObservable();
  public selectExpenses$ = this.expenses$.asObservable();

  constructor(private controlApi: ApiService) {}

  public dispatchYearMonth(year: number, month: number): void {
    this.state = MonthReducers.reduceYearMonth(this.state, year, month);
    this.monthBalance$.next(this.state.monthBalance);
  }
  public dispatchGetMonthBalances(): void {
    this.controlApi.getMonthBalancesList$().subscribe(res => {
      this.state = MonthReducers.reduceGetMonthBalances(this.state, res);
      if (!this.state.monthBalance) {
        this.dispatchPostMonthBalance();
      }
    });
  }

  public dispatchSetGoalMonth(goal: number): void {
    this.state = MonthReducers.reduceSetGoalMonth(this.state, goal);
    this.dispatchPutMonthBalance();
  }
  public dispatchGetJournalEntries(): void {
    this.controlApi.getJournalEntriesList$().subscribe(res => {
      this.state = MonthReducers.reduceJournalEntries(this.state, res);
      this.projectedIncomes$.next(
        MonthReducers.filterJournalsByKind(this.state, "I")
      );
      this.projectedOutgoings$.next(
        MonthReducers.filterJournalsByKind(this.state, "O")
      );
      this.expenses$.next(MonthReducers.filterJournalsByKind(this.state, "E"));
    });
  }
  public dispatchPostJournalEntry(aJournalEntry: JournalEntry): void {
    this.controlApi.postJournalEntry$(aJournalEntry).subscribe(res => {
      this.state = MonthReducers.reducePostJournalEntry(this.state, res);
      this.updateEntriesByKind(this.state, aJournalEntry);
      this.dispatchPutMonthBalance();
    });
  }
  public dispatchDeleteJournalEntry(aJournalEntry: JournalEntry): void {
    this.controlApi.deleteJournalEntry$(aJournalEntry).subscribe(res => {
      this.state = MonthReducers.reduceDeleteJournalEntry(
        this.state,
        aJournalEntry
      );
      this.updateEntriesByKind(this.state, aJournalEntry);
      this.dispatchPutMonthBalance();
    });
  }

  private dispatchPostMonthBalance(): void {
    this.controlApi
      .postMonthBalance$(this.state.year, this.state.month)
      .subscribe(
        res =>
          (this.state = MonthReducers.reducePostMonthBalance(this.state, res))
      );
  }
  private dispatchPutMonthBalance(): void {
    this.state = MonthReducers.calculateMonthBalance(this.state);
    this.controlApi
      .putMonthBalance$(this.state.monthBalance)
      .subscribe(
        res =>
          (this.state = MonthReducers.reducePutMonthBalance(this.state, res))
      );
  }

  private updateEntriesByKind = (state: any, journalEntry: JournalEntry) => {
    switch (journalEntry.kind) {
      case "I":
        this.projectedIncomes$.next(
          MonthReducers.filterJournalsByKind(state, "I")
        );
        break;
      case "O":
        this.projectedOutgoings$.next(
          MonthReducers.filterJournalsByKind(state, "O")
        );
        break;
      case "E":
        this.expenses$.next(MonthReducers.filterJournalsByKind(state, "E"));
        break;
      default:
        break;
    }
  };
}
