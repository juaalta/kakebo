import { Action } from "@ngrx/store";
import {
  YearMonth,
  MonthBalance
} from "@routes/month/state/month-balance/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";

export enum JournalEntryActionTypes {
  GetJournalEntries = "[JournalEntry] GetJournalEntries",
  GetJournalEntriesCompleted = "[JournalEntry] GetJournalEntriesCompleted",
  GetJournalEntriesFailed = "[JournalEntry] GetJournalEntriesFailed",
  PostJournalEntry = "[JournalEntry] PostJournalEntry",
  PostJournalEntryCompleted = "[JournalEntry] PostJournalEntryCompleted",
  PostJournalEntryFailed = "[JournalEntry] PostJournalEntryFailed",
  DeleteJournalEntry = "[JournalEntry] DeleteJournalEntry",
  DeleteJournalEntryCompleted = "[JournalEntry] DeleteJournalEntryCompleted",
  DeleteJournalEntryFailed = "[JournalEntry] DeleteJournalEntryFailed"
}

export class GetJournalEntries implements Action {
  readonly type = JournalEntryActionTypes.GetJournalEntries;
  constructor(public payload: YearMonth) {}
}

export class GetJournalEntriesCompleted implements Action {
  readonly type = JournalEntryActionTypes.GetJournalEntriesCompleted;
  constructor(public payload: JournalEntry[]) {}
}

export class GetJournalEntriesFailed implements Action {
  readonly type = JournalEntryActionTypes.GetJournalEntriesFailed;
  constructor(public payload: any) {}
}

export class PostJournalEntry implements Action {
  readonly type = JournalEntryActionTypes.PostJournalEntry;
  constructor(
    public payload: {
      monthBalanace: MonthBalance;
      journalEntry: JournalEntry;
    }
  ) {}
}

export class PostJournalEntryCompleted implements Action {
  readonly type = JournalEntryActionTypes.PostJournalEntryCompleted;
  constructor(public payload: JournalEntry) {}
}

export class PostJournalEntryFailed implements Action {
  readonly type = JournalEntryActionTypes.PostJournalEntryFailed;
  constructor(public payload: JournalEntry) {}
}

export class DeleteJournalEntry implements Action {
  readonly type = JournalEntryActionTypes.DeleteJournalEntry;
  constructor(
    public payload: {
      monthBalanace: MonthBalance;
      journalEntry: JournalEntry;
    }
  ) {}
}

export class DeleteJournalEntryCompleted implements Action {
  readonly type = JournalEntryActionTypes.DeleteJournalEntryCompleted;
  constructor(public payload: JournalEntry) {}
}

export class DeleteJournalEntryFailed implements Action {
  readonly type = JournalEntryActionTypes.DeleteJournalEntryFailed;
  constructor(public payload: JournalEntry) {}
}

export type JournalEntryActions =
  | GetJournalEntries
  | GetJournalEntriesCompleted
  | GetJournalEntriesFailed
  | PostJournalEntry
  | PostJournalEntryCompleted
  | PostJournalEntryFailed
  | DeleteJournalEntry
  | DeleteJournalEntryCompleted
  | DeleteJournalEntryFailed;
