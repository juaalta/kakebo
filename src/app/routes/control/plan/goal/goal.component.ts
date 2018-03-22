import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";

@Component({
  selector: "kab-goal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section *ngIf="month_balance">
    <form [formGroup]="form" (submit)="submit(form.value)"> 
      <fieldset >
        <section  class="row">
          <label for="goalToSave">Goal to save</label>
          <section class="column ">
            <input type="number" formControlName="goalToSave">
            <p><small>Maximun {{month_balance?.savings}}</small></p>
          </section>
          <input class="button-primary" type="submit" value="Save Goal" [disabled]="form.invalid">
        </section>
      </fieldset>
    </form>
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
      this.form = this.formbuilder.group({
        goalToSave: [
          this.month_balance.goal,
          [Validators.required, Validators.max(this.month_balance.savings)]
        ]
      });
    }
  }

  public submit(value) {
    const month_goal: SavingsGoal = {
      year: this.month_balance.year,
      month: this.month_balance.month,
      goalToSave: value.goalToSave
    };
    this.setGoal.emit(month_goal);
  }
}
