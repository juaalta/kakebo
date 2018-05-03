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
import { map, tap } from 'rxjs/operators';
import { MonthBalanceService } from './month-balance.service';
@Injectable()
export class JournalEntryService {
  constructor(
    private api: JournalEntryApiService,
    private mbService: MonthBalanceService
  ) {}

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
        map(list => (list ? list : [])),
        map(list =>
          list.filter(
            je => je.kind === journalEntryKindsEnum.Expense
          )
        )
      );
  public getForecastsList$ = (): Observable<JournalEntry[]> =>
    this.api
      .getJEList$()
      .pipe(
        map(list => (list ? list : [])),
        map(list =>
          list.filter(
            je => je.kind !== journalEntryKindsEnum.Expense
          )
        )
      );

  public saveJournalEntry$(
    journalEntry: JournalEntry
  ): Observable<any> {
    const clonedJournalEntry = {
      ...journalEntry,
      _id: new Date().getTime().toString()
    };
    return this.api
      .postJE$(journalEntry)
      .pipe(
        tap(() => this.calculateMonthBalance(journalEntry, 1))
      );
  }
  public deleteJournalEntry$(
    journalEntry: JournalEntry
  ): Observable<any> {
    return this.api
      .deleteJE$(journalEntry)
      .pipe(
        tap(() => this.calculateMonthBalance(journalEntry, -1))
      );
  }

  private calculateMonthBalance(
    journalEntry: JournalEntry,
    sign: number
  ): void {
    this.mbService.calculateMonthBalance(journalEntry, sign);
  }
}
