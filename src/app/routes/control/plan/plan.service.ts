import { Injectable } from '@angular/core';
import { ControlService } from '@routes/control/control.service';
import { JournalEntry } from '@routes/control/models/journal_entry.model';
import { MonthBalance } from '@routes/control/models/month_balance.model';
import { SavingsGoal } from '@routes/control/models/savings_goal.model';

@Injectable()
export class PlanService {

  private _projectedIncomes: JournalEntry[] = [];
  private _projectedOutgoings: JournalEntry[] = [];
  private _month_balance: MonthBalance | any= {};
  private _availableToExpend = 0;

  get projectedIncomes(){
    return [...this._projectedIncomes];
  }
  get projectedOutgoins(){
    return [...this._projectedOutgoings];
  }
  get month_balance(){
    return {...this._month_balance};
  }
  get availableToExpend(){
    return this._availableToExpend;
  }
  constructor(private controlService:ControlService) { }

  public postNewEntry(projectedEntry: JournalEntry) {
    this.controlService.postJournalEntry(projectedEntry);
    this.updateFilterdeLists(projectedEntry.year, projectedEntry.month);
  }
  public deleteEntry(projectedEntry: JournalEntry) {
    this.controlService.deleteJournalEntry(projectedEntry);
    this.updateFilterdeLists(projectedEntry.year, projectedEntry.month);
  }
  public setGoalForMonth(savingsGoal: SavingsGoal) {
    this._month_balance = this.controlService.getMonthBalance(this._month_balance.year, this._month_balance.month);
    this._month_balance = {
      ...this._month_balance,
      goal: savingsGoal.goalToSave
    };
    this.controlService.updateMonthBalance(this._month_balance);
    this.updateAvailableAmount();
  }

  private updateFilterdeLists(year: number, month:number) {
    this._projectedIncomes = this.controlService.journalEntries
      .filter(p => p.kind === "I" && p.year===year && p.month===month );
    this._projectedOutgoings = this.controlService.journalEntries
      .filter(p => p.kind === "O" && p.year===year && p.month===month);
    this.updateMothBalance(year, month);
  }
  private updateMothBalance(year: number, month:number){
    this._month_balance = this.controlService.getMonthBalance(year, month);
    this._month_balance = {
      ...this._month_balance,
      incomes: this.sumAmount(this._projectedIncomes),
      outgoigns: this.sumAmount(this._projectedOutgoings)
    };
    this.controlService.updateMonthBalance(this._month_balance);
    this.updateAvailableAmount();
  }
  private updateAvailableAmount() {
    this._availableToExpend =
      this._month_balance.incomes -
      this._month_balance.outgoigns -
      this._month_balance.goal;
  }

  private sumAmount = (entries: JournalEntry[]) =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
