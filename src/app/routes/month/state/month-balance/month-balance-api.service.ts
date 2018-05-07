import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { MonthBalance, YearMonth } from "@routes/month/state/month-balance/models/month_balance.model";
import { Observable } from "rxjs";

@Injectable()
export class MonthBalanceApi {
  private url = environment.apiUrl + "priv/monthbalances/";
  constructor(private http: HttpClient) { }

  public getMonthBalancesByYearMonth$(
    yearMonth: YearMonth
  ): Observable<MonthBalance[]> {
    const url = `${this.url}${yearMonth.year}/${yearMonth.month}`;
    return this.http.get<MonthBalance[]>(url);
  }
  public postMonthBalance$(
    monthBalance: MonthBalance
  ): Observable<MonthBalance> {
    return this.http.post<MonthBalance>(this.url, monthBalance);
  }

  public putMonthBalance$(
    monthBalance: MonthBalance
  ): Observable<MonthBalance> {
    const url = `${this.url}${monthBalance._id}`;
    return this.http.put<MonthBalance>(url, monthBalance);
  }
}
