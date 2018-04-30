import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MonthBalance,
  monthBalanceInitialState
} from './models/month-balance.model';
import { MonthBalanceApiService } from './month-balance-api.service';
@Injectable()
export class MonthBalanceService {
  constructor(private api: MonthBalanceApiService) {}

  public getNewMonthBalance = (): MonthBalance => {
    return { ...monthBalanceInitialState };
  };

  public getMonthBalancesList$ = (): Observable<
    MonthBalance[]
  > => this.api.getMBList$();

  public saveMonthBalance$(
    monthBalance: MonthBalance
  ): Observable<any> {
    const clonedMonthBalance = {
      ...monthBalance,
      _id: new Date().getTime().toString()
    };
    return this.api.postMB$(monthBalance);
  }
  public deleteMonthBalance$(
    monthBalance: MonthBalance
  ): Observable<any> {
    return this.api.putMB$(monthBalance);
  }
}
