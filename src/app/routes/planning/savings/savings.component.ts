import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-savings",
  template: `
  <h3>I want to save</h3>
  <form>
    <fieldset>
      <label for="amount">Left to expend</label>
      <input type="number" name="left" readonly>
      <label for="amount">Amount to save</label>
      <input type="number" name="amount">
      <input class="button-primary" type="submit" value="Save">
    </fieldset>
  </form>
  `,
  styles: []
})
export class SavingsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
