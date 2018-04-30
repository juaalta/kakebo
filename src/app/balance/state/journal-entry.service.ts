import { Injectable } from '@angular/core';
import {
  JournalEntry,
  journalEntriesInitialState,
  expenseInitialState,
  forecastInitialState
} from './models/journal-entry.model';
import { journalEntryKindsEnum } from './models/journal-entry-kinds.model';
import { JournalEntryApiService } from './journal-entry-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class JournalEntryService {
  constructor(private api: JournalEntryApiService) {}

  public getNewExpense = (): JournalEntry => {
    return { ...expenseInitialState };
  };
  public getNewForecast = (): JournalEntry => {
    return { ...forecastInitialState };
  };

  public getExpensesList$ = (): Observable<JournalEntry[]> =>
    this.api
      .getJEList$()
      .pipe(
        map(list =>
          list.filter(je => je.kind === journalEntryKindsEnum.E)
        )
      );
  public getForecastsList$ = (): Observable<JournalEntry[]> =>
    this.api
      .getJEList$()
      .pipe(
        map(list =>
          list.filter(je => je.kind !== journalEntryKindsEnum.E)
        )
      );

  public saveJournalEntry$(
    journalEntry: JournalEntry
  ): Observable<any> {
    const clonedJournalEntry = {
      ...journalEntry,
      _id: new Date().getTime().toString()
    };
    return this.api.postJE$(journalEntry);
  }
  public deleteJournalEntry$(
    journalEntry: JournalEntry
  ): Observable<any> {
    return this.api.deleteJE$(journalEntry);
  }
}
