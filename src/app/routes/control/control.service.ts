import { Injectable } from '@angular/core';
import { JournalEntry } from '@routes/control/models/journal_entry.model';
import { MonthBalance } from '@routes/control/models/month_balance.model';

@Injectable()
export class ControlService {

  private _journalEntries: JournalEntry[] = [];
  private _monthBalances : MonthBalance[] = [];
  private _newMonthBalance : MonthBalance =  {
    year:0,
    month:0,
    incomes: 0,
    outgoigns: 0,
    expenses: 0,
    savings: 0,
    goal: 0
  };
  get journalEntries(){
    return [...this._journalEntries];
  }

  get mothBalances(){
    return this._monthBalances;
  }

  constructor() { }


  public postJournalEntry(newJournalEntry: JournalEntry){
    this._journalEntries = this.postToArray(this._journalEntries,newJournalEntry);
  }
  public deleteJournalEntry(aJournalEntry: JournalEntry){
    this._journalEntries = this.deleteFromArray(this._journalEntries,aJournalEntry);
  }

  public postMonthBalance(newMonthBalance: MonthBalance){
    this._monthBalances = this.postToArray(this._monthBalances,newMonthBalance);
  }
  public getMonthBalance(year: number, month:number): MonthBalance{
    let monthBalance = this._monthBalances.find(m=>m.year===year && m.month===month);
    if(!monthBalance){
      monthBalance = {
        ...this._newMonthBalance,
        year,
        month,
      }
      this.postMonthBalance(monthBalance);
    }
    return monthBalance;
  }
  public updateMonthBalance(aMonthBalance: MonthBalance){
    this._monthBalances = this._monthBalances.filter(m=>m.year===aMonthBalance.year && m.month===aMonthBalance.month);
    this.postMonthBalance(aMonthBalance);
  }
  public deleteMonthBalance(aMonthBalance: MonthBalance){
      this._monthBalances = this.deleteFromArray(this._monthBalances,aMonthBalance);
  }  

  
  private postToArray = (array :any[], element:any) => [...array,element]
  private deleteFromArray = (array :any[], element:any) => array.filter(e=>e===element)
  
}

