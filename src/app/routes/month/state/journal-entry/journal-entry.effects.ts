import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { switchMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import {
  JournalEntryActionTypes,
  GetJournalEntries,
  GetJournalEntriesCompleted,
  GetJournalEntriesFailed,
  PostJournalEntry,
  PostJournalEntryCompleted,
  PostJournalEntryFailed,
  DeleteJournalEntry,
  DeleteJournalEntryCompleted,
  DeleteJournalEntryFailed
} from "@routes/month/state/journal-entry/journal-entry.actions";
import {
  JournalEntry,
  journalEntriesInitialState
} from "@routes/month/state/journal-entry/models/journal-entry.model";
import { JournalEntryApi } from "@routes/month/state/journal-entry/journal-entry-api.service";
import { MonthState } from "@routes/month/state";
import { HttpErrorResponse } from "@angular/common/http";
import { CalculateMonthBalance } from "@routes/month/state/month-balance/month-balance.actions";

@Injectable()
export class JournalEntryEffects {
  private onGetJournalEntries$ = (action: GetJournalEntries) => {
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

  private onPostJournalEntry$ = (action: PostJournalEntry) => {
    return this.JournalEntryApi.postJournalEntry$(
      action.payload.journalEntry
    ).pipe(
      map((res: JournalEntry) => {
        this.store.dispatch(
          new CalculateMonthBalance({
            monthBalance: action.payload.monthBalanace,
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

  private onDeleteJournalEntry$ = (action: DeleteJournalEntry) => {
    return this.JournalEntryApi.deleteJournalEntry$(
      action.payload.journalEntry
    ).pipe(
      map((res: JournalEntry) => {
        this.store.dispatch(
          new CalculateMonthBalance({
            monthBalance: action.payload.monthBalanace,
            journalEntry: action.payload.journalEntry,
            amountSing: -1
          })
        );
        return new DeleteJournalEntryCompleted(res);
      }),
      catchError((err, caught) => {
        return of(new DeleteJournalEntryFailed(err));
      })
    );
  };

  constructor(
    private actions$: Actions,
    private JournalEntryApi: JournalEntryApi,
    private store: Store<MonthState>
  ) {}

  @Effect()
  public GetJournalEntries$: Observable<Action> = this.actions$.pipe(
    ofType<GetJournalEntries>(JournalEntryActionTypes.GetJournalEntries),
    switchMap(this.onGetJournalEntries$)
  );

  @Effect()
  public PostJournalEntry$: Observable<Action> = this.actions$.pipe(
    ofType<PostJournalEntry>(JournalEntryActionTypes.PostJournalEntry),
    switchMap(this.onPostJournalEntry$)
  );

  @Effect()
  public DeleteJournalEntry$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteJournalEntry>(JournalEntryActionTypes.DeleteJournalEntry),
    switchMap(this.onDeleteJournalEntry$)
  );
}
