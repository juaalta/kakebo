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

  public postJournalEntry$(journalEntry: JournalEntry): Observable<any> {
    return this.http.post(this.urlJournalEntries, journalEntry);
  }

  public deleteJournalEntry$(journalEntry: JournalEntry): Observable<any> {
    return this.http.delete(this.urlJournalEntries + journalEntry._id);
  }

  public getMonthBalancesList$(): Observable<MonthBalance[]> {
    return this.http.get<MonthBalance[]>(this.urlMonthBalances);
  }

  public postMonthBalance$(monthBalance: MonthBalance): Observable<any> {
    return this.http.post(this.urlMonthBalances, monthBalance);
  }

  public putMonthBalance$(monthBalance: MonthBalance): Observable<any> {
    return this.http.put(this.urlMonthBalances + monthBalance._id, monthBalance);
  }

  public deleteMonthBalance$(monthBalance: MonthBalance): Observable<any> {
    return this.http.delete(this.urlMonthBalances + monthBalance._id);
  }
}
