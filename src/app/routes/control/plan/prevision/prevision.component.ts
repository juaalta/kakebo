import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { JournalEntry } from "@routes/control/models/journal_entry.model";

@Component({
  selector: "kab-prevision",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h3>Set your Previsions</h3>
  <form [formGroup]="form" (submit)="submit(form.value)">
    <fieldset>
      <label for="kind">Kind of prevision</label>
      <input type="radio" name="kind" formControlName="kind" value="I"> + Projected Income: <small>Salary, extras</small><br>
      <input type="radio" name="kind" formControlName="kind" value="O"> - Regular Outgoing: <small>Mortgage, energy, phone</small><br>
      <label for="date">Date</label>
      <input type="date" formControlName="date">
      <label for="description">Description</label>
      <input type="text" formControlName="description">
      <label for="amount">Amount</label>
      <input type="number" formControlName="amount">
      <input class="button-primary" type="submit" value="Save Prevision" [disabled]="form.invalid">
    </fieldset>
  </form>
  `,
  styles: []
})
export class PrevisionComponent implements OnInit {
  @Input() public year: number;
  @Input() public month: number;
  @Output() public saveProjection = new EventEmitter<JournalEntry>();
  public form: FormGroup;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      kind: [null, Validators.required],
      date: [
        new Date(this.year, this.month - 1, 1, 12, 0, 0)
          .toISOString()
          .substring(0, 10)
      ],
      description: "",
      amount: [0, Validators.required]
    });
  }

  public submit(newProjection) {
    newProjection.year = this.year;
    newProjection.month = this.month;
    newProjection.day = new Date(newProjection.date).getDay();
    this.saveProjection.emit(newProjection);
    this.form.reset({
      amount: 0,
      date: new Date(this.year, this.month - 1, 1, 12, 0, 0)
        .toISOString()
        .substring(0, 10)
    });
  }
}
