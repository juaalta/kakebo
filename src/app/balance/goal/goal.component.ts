import { Component, OnInit } from '@angular/core';
import { MonthBalance } from '../state/models/month-balance.model';
import { MonthBalanceService } from '../state/month-balance.service';
import { FormsService } from '../../core/forms.service';

@Component({
  selector: 'kab-goal',
  templateUrl: './goal.component.html',
  styleUrls: []
})
export class GoalComponent implements OnInit {
  public monthBalance: MonthBalance = this.mbService.getNewMonthBalance();
  public mustShowErrors = this.formsService.mustShowErrors;
  constructor(
    private mbService: MonthBalanceService,
    private formsService: FormsService
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  public onSubmitGoal() {
    this.mbService
      .updateMonthBalance$(this.monthBalance)
      .subscribe();
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
