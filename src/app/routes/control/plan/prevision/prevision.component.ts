import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "kab-prevision",
  template: `
  <h3>Prevision</h3>
  <form [formGroup]="form" (submit)="submit(form.value)">
    <fieldset>
      <label for="kindOfPrevision">Kind of prevision</label>
      <select formControlName="kindOfPrevision" name="kindOfPrevision">
        <option value="1">Projected Income</option>
        <option value="-1">Regular Outgoing</option>
      </select>
      <label for="date">Date</label>
      <input type="date" formControlName="date">
      <label for="description">Description</label>
      <input type="text" formControlName="description">
      <label for="amount">Amount</label>
      <input type="number" formControlName="amount">
      <input class="button-primary" type="submit" value="Save" [disabled]="form.invalid">
    </fieldset>
  </form>
  `,
  styles: []
})
export class PrevisionComponent implements OnInit {
  public form: FormGroup;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      kindOfPrevision: -1,
      date: new Date(),
      description: "",
      amount: [0, Validators.required]
    });
  }

  public submit(newProyection) {
    console.log(newProyection);
  }
}
