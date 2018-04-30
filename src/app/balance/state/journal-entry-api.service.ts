import { Injectable } from '@angular/core';
import { BalanceModule } from '../balance.module';
import { JournalEntry } from './models/journal-entry.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JournalEntryApiService {
  private urlJE = environment.apiUrl + 'pub/journalentries/';

  constructor(private http: HttpClient) {}

  public getJEList$ = (): Observable<JournalEntry[]> =>
    this.http.get<JournalEntry[]>(this.urlJE);

  public postJE$ = (je: JournalEntry): Observable<any> =>
    this.http.post(this.urlJE, je);

  public deleteJE$ = (jE: JournalEntry): Observable<any> =>
    this.http.delete(this.urlJE + jE._id);
}
