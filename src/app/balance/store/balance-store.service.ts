import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  MonthBalance,
  monthBalanceInitialState
} from './models/month-balance.model';

@Injectable()
export class MonthBalanceStoreService {
  private state: MonthBalance = monthBalanceInitialState;

  private monthBalance$ = new BehaviorSubject<MonthBalance>(
    this.state
  );
  constructor() {}

  public selectMonthBalance$(): Observable<MonthBalance> {
    return this.monthBalance$.asObservable();
  }

  public dispatchMonthBalance(monthBalance: MonthBalance) {
    this.state = { ...monthBalance };
    this.monthBalance$.next(this.state);
  }
}
