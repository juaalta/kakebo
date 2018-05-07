import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { DeleteJournalEntry, GetJournalEntries, JournalEntryActionTypes, PostJournalEntry } from "@routes/month/state/journal-entry/journal-entry.actions";
import { JournalEntryService } from "@routes/month/state/journal-entry/journal-entry.service";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";


@Injectable()
export class JournalEntryEffects {

  constructor(
    private actions$: Actions,
    private journalEntryService: JournalEntryService
  ) { }

  @Effect()
  public GetJournalEntries$: Observable<Action> = this.actions$.pipe(
    ofType<GetJournalEntries>(JournalEntryActionTypes.GetJournalEntries),
    switchMap(this.journalEntryService.getJournalEntries$)
  );

  @Effect()
  public PostJournalEntry$: Observable<Action> = this.actions$.pipe(
    ofType<PostJournalEntry>(JournalEntryActionTypes.PostJournalEntry),
    switchMap(this.journalEntryService.postJournalEntry$)
  );

  @Effect()
  public DeleteJournalEntry$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteJournalEntry>(JournalEntryActionTypes.DeleteJournalEntry),
    switchMap(this.journalEntryService.deleteJournalEntry$)
  );
}
