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
import { MonthBalance } from "@routes/month/state/month-balance/models/month_balance.model";

@Component({
  selector: "kab-goal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  // template: `
  // <section *ngIf="monthBalance">
  //   <form [formGroup]="form" (submit)="submit(form.value)"> 
  //     <fieldset >
  //       <section  class="row">
  //         <label for="goalToSave">Goal to save</label>
  //         <section class="column ">
  //           <input type="number" formControlName="goalToSave">
  //           <p><small>Maximun {{monthBalance?.savings}}</small></p>
  //         </section>
  //         <input class="button-primary" type="submit" value="Save Goal" [disabled]="form.invalid">
  //       </section>
  //     </fieldset>
  //   </form>
  // </section>
  // `,
  templateUrl: './goal.component.html',
  styles: []
})
export class GoalComponent implements OnInit, OnChanges {
  @Input() public monthBalance: MonthBalance;
  @Output() setGoal = new EventEmitter<number>();
  public form: FormGroup;
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.monthBalance) {
      this.form = this.formbuilder.group({
        goalToSave: [
          this.monthBalance.goal,
          [Validators.required, Validators.max(this.monthBalance.savings)]
        ]
      });
    }
  }

  public submit(value) {
    this.setGoal.emit(value.goalToSave);
  }
}
