import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-new-expense",
  template: `
  <h3>New Expense</h3>
  <form>
    <fieldset>
      <select id="ageRangeField">
        <option value="G">General</option>
        <option value="L">Leisure</option>
        <option value="C">Culture</option>
        <option value="E">Extras</option>
      </select>
      <label for="date">Date</label>
      <input type="date" name="date">
      <label for="description">Description</label>
      <input type="text" name="description">
      <label for="amount">Amount</label>
      <input type="number" name="amount">
      <input class="button-primary" type="submit" value="Save">
    </fieldset>
  </form>
  `,
  styles: []
})
export class NewExpenseComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
