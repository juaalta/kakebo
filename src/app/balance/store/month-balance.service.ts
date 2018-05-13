import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { journalEntryKindsEnum } from './models/journal-entry-kinds.model';
import { JournalEntry } from './models/journal-entry.model';
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

  public getMonthBalances$ = (): Observable<MonthBalance[]> =>
    this.api.getMBList$();

  public createMonthBalance$ = (
    monthBalance: MonthBalance
  ): Observable<any> => this.api.postMB$(monthBalance);

  public updateMonthBalance$ = (
    monthBalance: MonthBalance
  ): Observable<any> => {
    monthBalance.savings =
      monthBalance.incomes -
      monthBalance.outgoings -
      monthBalance.expenses;
    monthBalance.available =
      monthBalance.savings - monthBalance.goal;
    return this.api.putMB$(monthBalance);
  };
  public calculateMonthBalance = (
    journalEntry: JournalEntry,
    sign: number
  ): any =>
    this.getMonthBalances$().subscribe(list =>
      this.calculateWhenListArrives(list, journalEntry, sign)
    );

  private calculateWhenListArrives = (
    list: MonthBalance[],
    journalEntry: JournalEntry,
    sign: number
  ): void => {
    const monthBalance = this.getMonthBalanceFromList(list);
    this.calculateFromAmount(monthBalance, journalEntry, sign);
    this.updateMonthBalance$(monthBalance).subscribe();
  };
  private getMonthBalanceFromList = list =>
    list ? list[0] : this.getNewMonthBalance();
  private calculateFromAmount = (
    monthBalance: MonthBalance,
    journalEntry: JournalEntry,
    sign: number
  ): void => {
    switch (journalEntry.kind) {
      case journalEntryKindsEnum.Income:
        monthBalance.incomes += journalEntry.amount * sign;
        break;
      case journalEntryKindsEnum.Outgoing:
        monthBalance.outgoings += journalEntry.amount * sign;
        break;
      case journalEntryKindsEnum.Expense:
        monthBalance.expenses += journalEntry.amount * sign;
        break;
    }
  };
}
