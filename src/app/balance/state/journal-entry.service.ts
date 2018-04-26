import { Injectable } from '@angular/core';
import {
  JournalEntry,
  journalEntriesInitialState,
  expenseInitialState,
  forecastInitialState
} from './models/journal-entry.model';
import { journalEntryKindsEnum } from './models/journal-entry-kinds.model';

@Injectable()
export class JournalEntryService {
  private journalEntriesList: JournalEntry[] = journalEntriesInitialState;

  constructor() {}

  public getNewExpense = (): JournalEntry =>
    expenseInitialState;
  public getNewForecast = (): JournalEntry =>
    forecastInitialState;

  public getExpensesList = (): JournalEntry[] =>
    this.journalEntriesList.filter(
      je => je.kind === journalEntryKindsEnum.E
    );
  public getForecastList = (): JournalEntry[] =>
    this.journalEntriesList.filter(
      je => je.kind !== journalEntryKindsEnum.E
    );

  public saveJournalEntry(journalEntry: JournalEntry): void {
    const clonedJournalEntry = {
      ...journalEntry,
      _id: new Date().getTime().toString()
    };
    this.journalEntriesList.push(clonedJournalEntry);
  }
  public deleteJournalEntry(journalEntry: JournalEntry): void {
    const index = this.journalEntriesList.indexOf(journalEntry);
    this.journalEntriesList.splice(index, 1);
  }
}
