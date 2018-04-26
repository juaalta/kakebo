import { Injectable } from '@angular/core';
import {
  JournalEntry,
  journalEntriesInitialState,
  expenseInitialState
} from './models/journal-entry.model';
import { journalEntryKindsEnum } from './models/journal-entry-kinds.model';

@Injectable()
export class JournalEntryService {
  public journalEntriesList: JournalEntry[] = journalEntriesInitialState;

  constructor() {}

  public getNewExpense = (): JournalEntry =>
    expenseInitialState;

  public getExpensesList = (): JournalEntry[] =>
    this.journalEntriesList.filter(
      je => je.kind === journalEntryKindsEnum.E
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
