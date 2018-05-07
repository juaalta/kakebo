import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from 'app/core/forms.service';
import { GlobalStoreService } from '../../core/store/global-store.service';
import { MonthBalance } from '../store/models/month-balance.model';
import { MonthBalanceService } from '../store/month-balance.service';

@Component({
  selector: 'kab-goal',
  templateUrl: './goal.component.html',
  styleUrls: []
})
export class GoalComponent implements OnInit {
  public monthBalance: MonthBalance = this.mbService.getNewMonthBalance();
  public mustShowErrors = this.formsService.mustShowErrors;
  public form: FormGroup;
  constructor(
    private globalStore: GlobalStoreService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private mbService: MonthBalanceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
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

  public onSubmitGoal(formValue: any) {
    this.monthBalance.goal = formValue.goal;
    this.mbService
      .updateMonthBalance$(this.monthBalance)
      .subscribe(() => {
        this.globalStore.dispatchUserMessage(
          'Savings goal: ' + formValue.goal
        );
        this.router.navigate(['./balance']);
      });
  }

  private refreshData = () => {
    this.mbService.getMonthBalancesList$().subscribe(list => {
      this.monthBalance = list[0];
      const goalControl = this.form.controls['goal'];
      goalControl.setValue(this.monthBalance.goal);
      goalControl.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(this.monthBalance.savings)
      ]);
      goalControl.updateValueAndValidity();
    });
  };
}
