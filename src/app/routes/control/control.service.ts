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

  public getJournalEntries$(): Observable<JournalEntry[]> {
    return this.controlApi
      .getJournalEntriesList$()
      .pipe(tap(res => this.store.setJournalEntries(res)));
  }
  public postJournalEntry$(aJournalEntry: JournalEntry) {
    return this.controlApi
      .postJournalEntry$(aJournalEntry)
      .pipe(tap(res => this.store.postJournalEntry(res)));
  }
  public deleteJournalEntry$(aJournalEntry: JournalEntry) {
    return this.controlApi
      .deleteJournalEntry$(aJournalEntry)
      .pipe(tap(res => this.store.deleteJournalEntry(aJournalEntry)));
  }

  public getMonthBalances$(): Observable<MonthBalance[]> {
    return this.controlApi
      .getMonthBalancesList$()
      .pipe(tap(res => this.store.setMonthBalances(res)));
  }
  public postMonthBalance$(aMonthBalance: MonthBalance): Observable<any> {
    return this.controlApi
      .postMonthBalance$(aMonthBalance)
      .pipe(tap(res => this.store.postMonthBalance(res)));
  }
  public putMonthBalance$(aMonthBalance: MonthBalance): Observable<any> {
    return this.controlApi
      .putMonthBalance$(aMonthBalance)
      .pipe(tap(res => this.store.putMonthBalance(res)));
  }

  public createNewMonthBalance(year: number, month: number): MonthBalance {
    const monthBalance = {
      ...this._newMonthBalance,
      year,
      month
    };
    return monthBalance;
  }

  public calculateMonthBalances = (mb: MonthBalance): any => {
    const entries = this.store.getStateSnapshot().journalEntries;
    mb.incomes = this.sumAmount(
      this.filterJournalsByKind(entries, "I", mb.year, mb.month)
    );
    mb.outgoigns = this.sumAmount(
      this.filterJournalsByKind(entries, "O", mb.year, mb.month)
    );
    mb.expenses = this.sumAmount(
      this.filterJournalsByKind(entries, "E", mb.year, mb.month)
    );
    mb.savings = mb.incomes - mb.outgoigns - mb.expenses;
    mb.available = mb.savings - mb.goal;
    this.putMonthBalance$(mb).subscribe();
  };

  public filterJournalsByKind(
    entries: JournalEntry[],
    kind: string,
    year: number,
    month: number
  ): JournalEntry[] {
    return entries.filter(
      p => p.kind === kind && p.year === year && p.month === month
    );
  }
  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
