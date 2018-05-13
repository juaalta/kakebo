import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthBalanceStoreService } from './store/balance-store.service';
import { MonthBalance } from './store/models/month-balance.model';

@Component({
  selector: 'kab-balance',
  templateUrl: './balance.component.html',
  styleUrls: []
})
export class BalanceComponent implements OnInit {
  public monthBalance$: Observable<MonthBalance>;
  constructor(private store: MonthBalanceStoreService) {}

  ngOnInit() {
    this.monthBalance$ = this.store.selectMonthBalance$();
  }
}
