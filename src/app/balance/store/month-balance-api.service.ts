import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MonthBalanceStoreService } from './balance-store.service';
import { MonthBalance } from './models/month-balance.model';

@Injectable()
export class MonthBalanceApiService {
  private urlMB = environment.apiUrl + 'priv/monthbalances/';

  constructor(
    private http: HttpClient,
    private store: MonthBalanceStoreService
  ) {}

  public getMBList$ = (): Observable<MonthBalance[]> =>
    this.http
      .get<MonthBalance[]>(this.urlMB)
      .pipe(tap(res => this.dispatchMonthBalance(res[0])));

  public postMB$ = (
    mb: MonthBalance
  ): Observable<MonthBalance> =>
    this.http
      .post<MonthBalance>(this.urlMB, mb)
      .pipe(tap(this.dispatchMonthBalance));

  public putMB$ = (mb: MonthBalance): Observable<any> =>
    this.http
      .put(this.urlMB + mb._id, mb)
      .pipe(tap(this.dispatchMonthBalance));

  private dispatchMonthBalance = mb =>
    this.store.dispatchMonthBalance(mb);
}
