import { Injectable } from "@angular/core";
import { ControlService } from "@routes/control/control.service";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PlanService {
  private _projectedIncomes: JournalEntry[] = [];
  private _projectedOutgoings: JournalEntry[] = [];
  private _month_balance: MonthBalance | any = {};

  get projectedIncomes() {
    return [...this._projectedIncomes];
  }
  get projectedOutgoins() {
    return [...this._projectedOutgoings];
  }
  get month_balance() {
    return { ...this._month_balance };
  }
  constructor(private controlService: ControlService) {}

  public postNewEntry$(projectedEntry: JournalEntry): Observable<any> {
    return this.controlService.postJournalEntry$(projectedEntry);
  }
  public deleteEntry$(projectedEntry: JournalEntry): Observable<any> {
    return this.controlService.deleteJournalEntry$(projectedEntry);
  }
  public setGoalForMonth$(savingsGoal: SavingsGoal): Observable<any> {
    return this.controlService.updateMonthGoal$(savingsGoal);
  }

  public getData$(year: number, month: number): Observable<any> {
    return this.controlService.getJournalEntries$().pipe(
      tap(() => {
        this._projectedIncomes = this.controlService.filterJournalsByKind(
          "I",
          year,
          month
        );
        this._projectedOutgoings = this.controlService.filterJournalsByKind(
          "O",
          year,
          month
        );
      })
    );
  }

  public getMonthBalance$(year: number, month: number) {
    return this.controlService
      .getMonthBalances$()
      .pipe(
        tap(
          () =>
            (this._month_balance = this.controlService.getMonthBalance(
              year,
              month
            ))
        )
      );
  }
}
