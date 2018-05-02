import { Component, OnInit } from '@angular/core';
import { MonthBalance } from '../store/models/month-balance.model';
import { MonthBalanceService } from '../store/month-balance.service';
import { FormsService } from 'app/core/forms.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'kab-goal',
  templateUrl: './goal.component.html',
  styleUrls: []
})
export class GoalComponent implements OnInit {
  public form: FormGroup;
  public monthBalance: MonthBalance = this.mbService.getNewMonthBalance();
  public mustShowErrors = this.formsService.mustShowErrors;
  constructor(
    private formbuilder: FormBuilder,
    private formsService: FormsService,
    private mbService: MonthBalanceService
  ) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      goal: [
        this.monthBalance.goal,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(this.monthBalance.savings)
        ]
      ]
    });
    this.refreshData();
  }

  public onSubmitGoal() {
    this.mbService
      .updateMonthBalance$(this.monthBalance)
      .subscribe();
  }

  private refreshData = () => {
    this.mbService.getMonthBalancesList$().subscribe(list => {
      this.monthBalance = list[0];
      this.form.controls['goal'].setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(this.monthBalance.savings)
      ]);
      this.form.controls['goal'].updateValueAndValidity();
    });
  };
}
