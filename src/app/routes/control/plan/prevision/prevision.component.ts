import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "kab-prevision",
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
  public form: FormGroup;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      kind: [null, Validators.required],
      date: new Date(),
      description: "",
      amount: [0, Validators.required]
    });
  }

  public submit(newProyection) {
    console.log(newProyection);
  }
}
