import { Component, OnInit } from '@angular/core';
import { MonthBalanceService } from '../state/month-balance.service';
import { MonthBalance } from '../state/models/month-balance.model';

@Component({
  selector: 'kab-review',
  templateUrl: './review.component.html',
  styleUrls: []
})
export class ReviewComponent implements OnInit {
  public monthBalance: MonthBalance;
  constructor(private mbService: MonthBalanceService) {}

  ngOnInit() {
    this.refreshData();
  }

  private refreshData = () => {
    this.mbService.getMonthBalancesList$().subscribe(list => {
      if (!list || list.length === 0) {
        this.createMonthBalance();
      } else {
        this.monthBalance = list[0];
      }
    });
  };

  private createMonthBalance() {
    this.monthBalance = this.mbService.getNewMonthBalance();
    this.mbService
      .createMonthBalance$(this.monthBalance)
      .subscribe(this.refreshData);
  }
}
