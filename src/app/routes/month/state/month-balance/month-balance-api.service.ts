import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "@environments/environment";
import {
  MonthBalance,
  YearMonth
} from "@routes/month/state/month-balance/models/month_balance.model";

@Injectable()
export class MonthBalanceApi {
  private url = environment.apiUrl + "priv/monthbalances/";
  constructor(private http: HttpClient) {}

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
}
