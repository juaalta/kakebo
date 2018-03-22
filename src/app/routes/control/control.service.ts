import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";
import { ControlApiService } from "@routes/control/control-api.service";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
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

  constructor(private controlApi: ControlApiService) {}

  public getJournalEntries$(): Observable<JournalEntry[]> {
    return this.controlApi.getJournalEntriesList$();
  }
  public getMonthBalances$(): Observable<MonthBalance[]> {
    return this.controlApi.getMonthBalancesList$();
  }
  public postJournalEntry$(aJournalEntry: JournalEntry) {
    return this.controlApi.postJournalEntry$(aJournalEntry).pipe(
      tap(res => {
        this.getMonthBalances$().subscribe(mothBalances => {
          const monthBalance = this.findMonthBalance(
            mothBalances,
            aJournalEntry.year,
            aJournalEntry.month
          );
          switch (aJournalEntry.kind) {
            case "I":
              monthBalance.incomes += aJournalEntry.amount;
            case "O":
              monthBalance.outgoigns += aJournalEntry.amount;
            case "E":
              monthBalance.expenses += aJournalEntry.amount;
          }
          monthBalance.savings =
            monthBalance.incomes -
            monthBalance.outgoigns -
            monthBalance.expenses;
          monthBalance.available = monthBalance.savings - monthBalance.goal;
          this.updateMonthBalance$(monthBalance).subscribe();
        });
      })
    );
  }
  public deleteJournalEntry$(aJournalEntry: JournalEntry): Observable<any> {
    return this.controlApi.deleteJournalEntry$(aJournalEntry).pipe(
      tap(res => {
        this.getMonthBalances$().subscribe(mothBalances => {
          const monthBalance = this.findMonthBalance(
            mothBalances,
            aJournalEntry.year,
            aJournalEntry.month
          );
          switch (aJournalEntry.kind) {
            case "I":
              monthBalance.incomes -= aJournalEntry.amount;
            case "O":
              monthBalance.outgoigns -= aJournalEntry.amount;
            case "E":
              monthBalance.expenses -= aJournalEntry.amount;
          }
          monthBalance.savings =
            monthBalance.incomes -
            monthBalance.outgoigns -
            monthBalance.expenses;
          monthBalance.available = monthBalance.savings - monthBalance.goal;
          this.updateMonthBalance$(monthBalance).subscribe();
        });
      })
    );
  }
  public postMonthBalance$(aMonthBalance: MonthBalance): Observable<any> {
    return this.controlApi.postMonthBalance$(aMonthBalance);
  }
  public createNewMonthBalance(year: number, month: number): MonthBalance {
    const monthBalance = {
      ...this._newMonthBalance,
      year,
      month
    };
    return monthBalance;
  }
  public updateMonthBalance$(aMonthBalance: MonthBalance): Observable<any> {
    return this.controlApi.deleteMonthBalance$(aMonthBalance).pipe(
      tap(res => {
        this.controlApi.postMonthBalance$(aMonthBalance).subscribe();
      })
    );
  }
  public deleteMonthBalance$(aMonthBalance: MonthBalance): Observable<any> {
    return this.controlApi.deleteMonthBalance$(aMonthBalance);
  }
  public updateMonthGoal$(savingsGoal: SavingsGoal): Observable<any> {
    const year = savingsGoal.year;
    const month = savingsGoal.month;
    return this.controlApi.getMonthBalancesList$().pipe(
      tap(monthBalances => {
        const monthBalance = this.findMonthBalance(monthBalances, year, month);
        monthBalance.goal = savingsGoal.goalToSave;
        monthBalance.available = monthBalance.savings - monthBalance.goal;
        this.updateMonthBalance$(monthBalance);
      })
    );
  }

  public findJournalsByKind(
    journalEntries: JournalEntry[],
    kind: string,
    year: number,
    month: number
  ): JournalEntry[] {
    return journalEntries.filter(
      p => p.kind === kind && p.year === year && p.month === month
    );
  }
  public findMonthBalance(
    monthBalances: MonthBalance[],
    year: number,
    month: number
  ): MonthBalance {
    return monthBalances.find(m => m.year === year && m.month === month);
  }
}
