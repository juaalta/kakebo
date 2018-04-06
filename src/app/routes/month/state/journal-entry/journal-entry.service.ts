import { Injectable } from "@angular/core";
import { JournalEntryApi } from "@routes/month/state/journal-entry/journal-entry-api.service";
import { Store } from "@ngrx/store";
import { MonthState } from "@routes/month/state";
import { GetJournalEntries, GetJournalEntriesCompleted, GetJournalEntriesFailed, PostJournalEntry, PostJournalEntryCompleted, PostJournalEntryFailed, DeleteJournalEntry, DeleteJournalEntryCompleted, DeleteJournalEntryFailed } from "@routes/month/state/journal-entry/journal-entry.actions";
import { map } from "rxjs/operators/map";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";
import { catchError } from "rxjs/operators/catchError";
import { of } from "rxjs/observable/of";
import { CalculateMonthBalance } from "@routes/month/state/month-balance/month-balance.actions";

@Injectable()
export class JournalEntryService{
    constructor(
        private JournalEntryApi: JournalEntryApi,
        private store: Store<MonthState>
      ) {}

      public getJournalEntries$ = (action: GetJournalEntries) => {
        return this.JournalEntryApi.getJournalEntriesByYearMonth$(
          action.payload
        ).pipe(
          map((res: JournalEntry[]) => {
            return new GetJournalEntriesCompleted(res);
          }),
          catchError((err, caught) => {
            return of(new GetJournalEntriesFailed(action.payload));
          })
        );
      };
    
      public postJournalEntry$ = (action: PostJournalEntry) => {
        return this.JournalEntryApi.postJournalEntry$(
          action.payload.journalEntry
        ).pipe(
          map((res: JournalEntry) => {
            this.store.dispatch(
              new CalculateMonthBalance({
                monthBalance: action.payload.monthBalance,
                journalEntry: action.payload.journalEntry,
                amountSing: 1
              })
            );
            return new PostJournalEntryCompleted(res);
          }),
          catchError((err, caught) => {
            return of(new PostJournalEntryFailed(err));
          })
        );
      };
    
      public deleteJournalEntry$ = (action: DeleteJournalEntry) => {
        return this.JournalEntryApi.deleteJournalEntry$(
          action.payload.journalEntry
        ).pipe(
          map((res: JournalEntry) => {
            this.store.dispatch(
              new CalculateMonthBalance({
                monthBalance: action.payload.monthBalance,
                journalEntry: action.payload.journalEntry,
                amountSing: -1
              })
            );
            return new DeleteJournalEntryCompleted(action.payload.journalEntry);
          }),
          catchError((err, caught) => {
            return of(new DeleteJournalEntryFailed(err));
          })
        );
      };
}