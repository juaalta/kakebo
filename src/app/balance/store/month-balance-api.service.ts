import { Injectable } from '@angular/core';
import { BalanceModule } from '../balance.module';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { MonthBalance } from './models/month-balance.model';

@Injectable()
export class MonthBalanceApiService {
  private urlMB = environment.apiUrl + 'priv/monthbalances/';

  constructor(private http: HttpClient) {}

  public getMBList$ = (): Observable<MonthBalance[]> =>
    this.http.get<MonthBalance[]>(this.urlMB);

  public postMB$ = (
    mb: MonthBalance
  ): Observable<MonthBalance> =>
    this.http.post<MonthBalance>(this.urlMB, mb);

  public putMB$ = (mb: MonthBalance): Observable<any> =>
    this.http.put(this.urlMB + mb._id, mb);
}
