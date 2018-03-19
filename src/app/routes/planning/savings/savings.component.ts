import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "kab-savings",
  template: `
  <h3>I want to save</h3>
  <form [formGroup]="form" (submit)="submit(form.value)"> 
    <fieldset>
      <label for="amount">Left to expend</label>
      <input type="number" formControlName="toExpend" readonly>
      <label for="amount">Amount to save</label>
      <input type="number" formControlName="toSave">
      <input class="button-primary" type="submit" value="Save">
    </fieldset>
  </form>
  `,
  styles: []
})
export class SavingsComponent implements OnInit {
  public form: FormGroup;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      toExpend: 519,
      toSave: 0
    });
  }

  public submit(newProyection) {
    console.log(newProyection);
  }
}
