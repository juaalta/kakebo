import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MonthBalance,
  monthBalanceInitialState
} from './models/month-balance.model';
import { MonthBalanceApiService } from './month-balance-api.service';
import { JournalEntry } from './models/journal-entry.model';
import { journalEntryKindsEnum } from './models/journal-entry-kinds.model';
@Injectable()
export class MonthBalanceService {
  constructor(private api: MonthBalanceApiService) {}

  public getNewMonthBalance = (): MonthBalance => {
    return { ...monthBalanceInitialState };
  };

  public getMonthBalancesList$ = (): Observable<
    MonthBalance[]
  > => this.api.getMBList$();

  public createMonthBalance$(
    monthBalance: MonthBalance
  ): Observable<any> {
    const clonedMonthBalance = {
      ...monthBalance,
      _id: new Date().getTime().toString()
    };
    return this.api.postMB$(monthBalance);
  }
  public updateMonthBalance$(
    monthBalance: MonthBalance
  ): Observable<any> {
    monthBalance.savings =
      monthBalance.incomes -
      monthBalance.outgoings -
      monthBalance.expenses;
    monthBalance.available =
      monthBalance.savings - monthBalance.goal;
    return this.api.putMB$(monthBalance);
  }
  public calculateMonthBalance(
    journalEntry: JournalEntry,
    sign: number
  ): void {
    this.getMonthBalancesList$().subscribe(list =>
      this.calculateWhenListArrives(list, journalEntry, sign)
    );
  }
  private calculateWhenListArrives(
    list: MonthBalance[],
    journalEntry: JournalEntry,
    sign: number
  ): void {
    const monthBalance = this.getMonthBalanceFromList(list);
    this.calculateFromAmount(monthBalance, journalEntry, sign);
    this.updateMonthBalance$(monthBalance).subscribe();
  }
  private getMonthBalanceFromList = list =>
    list ? list[0] : this.getNewMonthBalance();
  private calculateFromAmount(
    monthBalance: MonthBalance,
    journalEntry: JournalEntry,
    sign: number
  ): void {
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
  }
}
