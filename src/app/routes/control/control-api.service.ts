import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JournalEntry } from '@routes/control/models/journal_entry.model';
import { MonthBalance } from '@routes/control/models/month_balance.model';

@Injectable()
export class ControlApiService {
  private urlJournalEntries = environment.apiUrl + "pub/journalentries/";
  private urlMonthBalances = environment.apiUrl + "pub/monthbalances/";
  
  constructor(private http: HttpClient) { }

  public getJournalEntriesList$(): Observable<JournalEntry[]> {
    return this.http.get<JournalEntry[]>(this.urlJournalEntries);
  }

  public postJournalEntry$(JournalEntry: JournalEntry): Observable<any> {
    return this.http.post(this.urlJournalEntries, JournalEntry);
  }

  public deleteJournalEntry$(JournalEntry: JournalEntry): Observable<any> {
    return this.http.delete(this.urlJournalEntries + JournalEntry._id);
  }

  public getMonthBalancesList$(): Observable<MonthBalance[]> {
    return this.http.get<MonthBalance[]>(this.urlMonthBalances);
  }

  public postMonthBalance$(MonthBalance: MonthBalance): Observable<any> {
    return this.http.post(this.urlMonthBalances, MonthBalance);
  }

  public deleteMonthBalance$(MonthBalance: MonthBalance): Observable<any> {
    return this.http.delete(this.urlMonthBalances + MonthBalance._id);
  }
}
