import { Injectable } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";
import { ControlApiService } from "@routes/control/control-api.service";
import { tap } from "rxjs/operators";
@Injectable()
export class ControlService {
  private _journalEntries: JournalEntry[] = [];
  private _monthBalances: MonthBalance[];
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
  get journalEntries() {
    if(this._journalEntries)
      return [...this._journalEntries];
    else return null;
  }

  get mothBalances() {
    if(this._monthBalances)
      return [...this._monthBalances];
    else return null;
  }

  constructor(private controlApi: ControlApiService) {
  
  }

  public getData(){
    console.log('chain')
    return this.controlApi.getMonthBalancesList$()
    .pipe(tap(monthBalances=>{
      this._monthBalances = monthBalances?monthBalances:[];
      console.log(this._monthBalances);
      this.controlApi.getJournalEntriesList$().subscribe(journalEntries=>this._journalEntries = journalEntries?journalEntries:[]);
    }));
  }

  public postJournalEntry(aJournalEntry: JournalEntry) {
    this.controlApi.postJournalEntry$(aJournalEntry).subscribe(res=>{
      this._journalEntries = this.postToArray(
        this._journalEntries,
        aJournalEntry
      );
      this.calculateMonthBalance(aJournalEntry.year, aJournalEntry.month);
    });
  }
  public deleteJournalEntry(aJournalEntry: JournalEntry) {
    this.controlApi.deleteJournalEntry$(aJournalEntry).subscribe(res=>{
      this._journalEntries = this.deleteFromArray(
        this._journalEntries,
        aJournalEntry
      );
      this.calculateMonthBalance(aJournalEntry.year, aJournalEntry.month);
    });
  }
  public filterJournalsByKind(
    kind: string,
    year: number,
    month: number
  ): JournalEntry[] {
    return this._journalEntries.filter(
      p => p.kind === kind && p.year === year && p.month === month
    );
  }

  public postMonthBalance(aMonthBalance: MonthBalance) {
    this.controlApi.postMonthBalance$(aMonthBalance).subscribe(res=>{
      this._monthBalances = this.postToArray(
        this._monthBalances,
        aMonthBalance
      );
    });
  }
  public getMonthBalance(year: number, month: number): MonthBalance {
    let monthBalance = this._monthBalances.find(
      m => m.year === year && m.month === month
    );
    if (!monthBalance) {
      monthBalance = this.createNewMonthBalance(year,month);
    }
    return monthBalance;
  }
  public createNewMonthBalance(year: number, month: number):MonthBalance{
    const monthBalance = {
      ...this._newMonthBalance,
      year,
      month
    };
    this.postMonthBalance(monthBalance);
    return monthBalance;
  }
  public updateMonthBalance(aMonthBalance: MonthBalance){
    this.controlApi.deleteMonthBalance$(aMonthBalance).subscribe(res=>{
        this.deleteFromArray(this._monthBalances, aMonthBalance);
        this.controlApi.postMonthBalance$(aMonthBalance).subscribe(res=>{
          this.postToArray(this._monthBalances,aMonthBalance);
        });
    });
  }
  public deleteMonthBalance(aMonthBalance: MonthBalance) {
    this.controlApi.deleteMonthBalance$(aMonthBalance).subscribe(res=>{
      this._monthBalances = this.deleteFromArray(
        this._monthBalances,
        aMonthBalance
      );
    }
    );
  }
  public updateMonthGoal(savingsGoal: SavingsGoal ) :MonthBalance{
    const year = savingsGoal.year;
    const month = savingsGoal.month;
    let monthBalanceTemp = this.getMonthBalance(year,month);
    monthBalanceTemp.goal = savingsGoal.goalToSave;
    this.updateMonthBalance(monthBalanceTemp);
    this.calculateMonthBalance(year,month);
    return this.getMonthBalance(year,month);
  }

  private calculateMonthBalance(year: number, month: number) {
    let monthBalance = this.getMonthBalance(year, month);
    monthBalance.incomes = this.sumAmount(
      this.filterJournalsByKind("I", year, month)
    );
    monthBalance.outgoigns = this.sumAmount(
      this.filterJournalsByKind("O", year, month)
    );
    monthBalance.expenses = this.sumAmount(
      this.filterJournalsByKind("E", year, month)
    );
    monthBalance.savings =
      monthBalance.incomes - monthBalance.outgoigns - monthBalance.expenses;
    monthBalance.available = monthBalance.savings - monthBalance.goal;
  }
  private postToArray = (array: any[], element: any) => [...array, element];
  private deleteFromArray = (array: any[], element: any) =>
    array.filter(e => e._id !== element._id);

  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
