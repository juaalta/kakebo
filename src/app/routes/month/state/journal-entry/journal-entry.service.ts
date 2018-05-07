import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { MonthState } from "@routes/month/state";
import { JournalEntryApi } from "@routes/month/state/journal-entry/journal-entry-api.service";
import { DeleteJournalEntry, DeleteJournalEntryCompleted, DeleteJournalEntryFailed, GetJournalEntries, GetJournalEntriesCompleted, GetJournalEntriesFailed, PostJournalEntry, PostJournalEntryCompleted, PostJournalEntryFailed } from "@routes/month/state/journal-entry/journal-entry.actions";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";
import { CalculateMonthBalance } from "@routes/month/state/month-balance/month-balance.actions";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class JournalEntryService {
  constructor(
    private JournalEntryApi: JournalEntryApi,
    private store: Store<MonthState>
  ) { }

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