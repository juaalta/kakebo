import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";

@Component({
  selector: "kab-goal",
  template: `
  <section *ngIf="month_balance">
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
    {{month_balance | json}}
  </section>
  `,
  styles: []
})
export class GoalComponent implements OnInit, OnChanges {
  @Input() public month_balance: MonthBalance;
  @Output() setGoal = new EventEmitter<SavingsGoal>();
  public form: FormGroup;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.month_balance) {
      const month_goal: SavingsGoal = {
        available:
          this.month_balance.incomes -
          this.month_balance.outgoigns -
          this.month_balance.expenses,
        goalToSave: this.month_balance.goal
      };
      this.form = this.formbuilder.group({
        available: month_goal.available,
        goalToSave: [
          month_goal.goalToSave,
          [Validators.required, Validators.max(month_goal.available)]
        ]
      });
    }
  }

  public submit(month_goal: SavingsGoal) {
    console.log(month_goal);
    this.setGoal.emit(month_goal);
  }
}
