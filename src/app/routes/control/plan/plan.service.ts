import { Injectable } from '@angular/core';
import { ControlService } from '@routes/control/control.service';
import { JournalEntry } from '@routes/control/models/journal_entry.model';
import { MonthBalance } from '@routes/control/models/month_balance.model';

@Injectable()
export class PlanService {

  private _projectedIncomes: JournalEntry[];
  private _projectedOutgoings: JournalEntry[];
  private _month_balance: MonthBalance = {
    year: 0,
    month: 0,
    incomes: 0,
    outgoigns: 0,
    expenses: 0,
    savings: 0,
    goal: 0
  };
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

  constructor(private controlService:ControlService) { }

  public postNewEntry(projectedEntry: JournalEntry) {
    this.controlService.postJournalEntry(projectedEntry);
    this.updateFilterdeLists();
  }

  private updateFilterdeLists() {
    this._projectedIncomes = this.controlService.journalEntries.filter(p => p.kind === "I");
    this._projectedOutgoings = this.controlService.journalEntries.filter(p => p.kind === "O");
    this._month_balance = {
      ...this._month_balance,
      incomes: this.sumAmount(this._projectedIncomes),
      outgoigns: this.sumAmount(this._projectedOutgoings)
    };
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
