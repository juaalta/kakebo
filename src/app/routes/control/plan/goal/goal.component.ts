import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";

@Component({
  selector: "kab-goal",
  template: `
  <h3>Set your saving goal</h3>
  <form [formGroup]="form" (submit)="submit(form.value)"> 
    <fieldset>
      <label for="available">Available</label>
      <input type="number" formControlName="available" readonly>
      <label for="goalToSave">Goal to save</label>
      <input type="number" formControlName="goalToSave">
      <input class="button-primary" type="submit" value="Save Goal" [disabled]="form.invalid">
    </fieldset>
  </form>
  `,
  styles: []
})
export class GoalComponent implements OnInit {
  public form: FormGroup;
  public month_balance: MonthBalance = {
    year: 2018,
    month: 4,
    incomes: 1987,
    outgoigns: 867,
    expenses: 0,
    savings: 0,
    goal: 0
  };
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    const month_goal: SavingsGoal = {
      available:
        this.month_balance.incomes -
        this.month_balance.outgoigns -
        this.month_balance.expenses,
      goalToSave: 0
    };
    this.form = this.formbuilder.group({
      available: month_goal.available,
      goalToSave: [
        month_goal.goalToSave,
        [Validators.required, Validators.max(month_goal.available)]
      ]
    });
  }

  public submit(month_goal: SavingsGoal) {
    this.month_balance.goal = month_goal.goalToSave;
    console.log(month_goal);
  }
}
