import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-prevision",
  template: `
  <h3>Prevision</h3>
  <form>
    <fieldset>
      <select id="ageRangeField">
        <option value="1">Income</option>
        <option value="-1">Regular Outgoings</option>
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
export class PrevisionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
