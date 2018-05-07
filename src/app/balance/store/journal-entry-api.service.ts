import { Injectable } from '@angular/core';
import { BalanceModule } from '../balance.module';
import { JournalEntry } from './models/journal-entry.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class JournalEntryApiService {
  private urlJE = environment.apiUrl + 'priv/journalentries/';

  constructor(private http: HttpClient) {}

  public getJEList$ = (): Observable<JournalEntry[]> =>
    this.http.get<JournalEntry[]>(this.urlJE);

  public postJE$ = (
    je: JournalEntry
  ): Observable<JournalEntry> =>
    this.http.post<JournalEntry>(this.urlJE, je);

  public deleteJE$ = (jE: JournalEntry): Observable<any> =>
    this.http.delete(this.urlJE + jE._id);
}
