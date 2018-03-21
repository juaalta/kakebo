import { Injectable } from '@angular/core';
import { JournalEntry } from '@routes/control/models/journal_entry.model';
import { MonthBalance } from '@routes/control/models/month_balance.model';

@Injectable()
export class ControlService {

  private _journalEntries: JournalEntry[];
  private _mothBalances : MonthBalance[];

  get journalEntries(){
    return [...this._journalEntries];
  }

  get mothBalances(){
    return this._mothBalances;
  }

  constructor() { }


  public postJournalEntry(newJournalEntry: JournalEntry){
    this._journalEntries = this.postToArrray(this._journalEntries,newJournalEntry);
  }
  public deleteJournalEntry(aJournalEntry: JournalEntry){
    this._journalEntries = this.deleteFromArrray(this._journalEntries,aJournalEntry);
  }

  public postMonthBalance(newMonthBalance: MonthBalance){
    this._mothBalances = this.postToArrray(this._mothBalances,newMonthBalance);
  }
  public deleteMonthBalance(aMonthBalance: MonthBalance){
    this._mothBalances = this.deleteFromArrray(this._mothBalances,aMonthBalance);
  }

  private postToArrray = (array :any[], element:any) => [...array,element]
  private deleteFromArrray = (array :any[], element:any) => array.filter(e=>e===element)
}

