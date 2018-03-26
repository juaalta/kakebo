import { Injectable } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";
import { ControlApiService } from "@routes/control/control-api.service";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { StoreService } from "@routes/control/store.service";
@Injectable()
export class ControlService {
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

  constructor(
    private controlApi: ControlApiService,
    private store: StoreService
  ) {
    this.store.getMonthMustBeRecalculated$.subscribe(
      this.calculateMonthBalances
    );
  }

  public getJournalEntries() {
    this.controlApi
      .getJournalEntriesList$()
      .subscribe(res => this.store.setJournalEntries(res));
  }
  public postJournalEntry(aJournalEntry: JournalEntry): void {
    this.controlApi
      .postJournalEntry$(aJournalEntry)
      .subscribe(res => this.store.postJournalEntry(res));
  }
  public deleteJournalEntry(aJournalEntry: JournalEntry) {
    this.controlApi
      .deleteJournalEntry$(aJournalEntry)
      .subscribe(res => this.store.deleteJournalEntry(aJournalEntry));
  }
  public getMonthBalances(year: number, month: number): void {
    this.controlApi.getMonthBalancesList$().subscribe(res => {
      this.store.setMonthBalances(res);
      const month_balance = this.filterMonthBalanceByYearMonth(
        res,
        year,
        month
      );
      if (!month_balance) {
        this.postMonthBalance(year, month);
      }
    });
  }
  public putMonthBalance(aMonthBalance: MonthBalance): void {
    this.calculateMonthBalances(aMonthBalance);
    this.controlApi
      .putMonthBalance$(aMonthBalance)
      .subscribe(res => this.store.putMonthBalance(res));
  }
  private postMonthBalance(year: number, month: number) {
    const monthBalance = {
      ...this._newMonthBalance,
      year,
      month
    };
    this.controlApi
      .postMonthBalance$(monthBalance)
      .subscribe(res => this.store.postMonthBalance(res));
  }
  private calculateMonthBalances = (mb: MonthBalance): any => {
    const entries = this.store.getStateSnapshot().journalEntries;
    mb.incomes = this.sumAmount(
      this.store.filterJournalsByKind("I", mb.year, mb.month)
    );
    mb.outgoigns = this.sumAmount(
      this.store.filterJournalsByKind("O", mb.year, mb.month)
    );
    mb.expenses = this.sumAmount(
      this.store.filterJournalsByKind("E", mb.year, mb.month)
    );
    mb.savings = mb.incomes - mb.outgoigns - mb.expenses;
    mb.available = mb.savings - mb.goal;
  };

  public filterMonthBalanceByYearMonth(
    monthBalances: MonthBalance[],
    year: number,
    month: number
  ) {
    if (monthBalances) {
      return monthBalances.find(m => m.year === year && m.month === month);
    }
    return null;
  }
  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
