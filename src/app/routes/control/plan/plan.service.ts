import { Injectable } from "@angular/core";
import { ControlService } from "@routes/control/control.service";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";

@Injectable()
export class PlanService {
  private _projectedIncomes: JournalEntry[] = [];
  private _projectedOutgoings: JournalEntry[] = [];
  private _month_balance: MonthBalance | any = {};
  private _availableToExpend = 0;

  get projectedIncomes() {
    return [...this._projectedIncomes];
  }
  get projectedOutgoins() {
    return [...this._projectedOutgoings];
  }
  get month_balance() {
    return { ...this._month_balance };
  }
  get availableToExpend() {
    return this._availableToExpend;
  }
  constructor(private controlService: ControlService) {}

  public postNewEntry(projectedEntry: JournalEntry) {
    this.controlService.postJournalEntry(projectedEntry);
    this.getData(projectedEntry.year, projectedEntry.month);
  }
  public deleteEntry(projectedEntry: JournalEntry) {
    this.controlService.deleteJournalEntry(projectedEntry);
    this.getData(projectedEntry.year, projectedEntry.month);
  }
  public setGoalForMonth(savingsGoal: SavingsGoal) {
    this._month_balance = this.controlService.getMonthBalance(
      savingsGoal.year,
      savingsGoal.month
    );
    this._month_balance.goal = savingsGoal.goalToSave;
    this.controlService.updateMonthBalance(this._month_balance);
    this.calculateAvailableAmount();
  }

  private getData(year: number, month: number) {
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
    this._month_balance = this.controlService.getMonthBalance(year, month);
    this.calculateAvailableAmount();
  }

  private calculateAvailableAmount() {
    this._availableToExpend =
      this._month_balance.incomes -
      this._month_balance.outgoigns -
      this._month_balance.goal;
  }
}
