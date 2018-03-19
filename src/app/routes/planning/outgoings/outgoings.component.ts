import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-outgoings",
  template: `
  <h3>Regular Outgoings <span class="float-right">357 €</span></h3>
  <p>Mortgage, energy, communications...</p>
  <table>
    <thead>
      <tr>
        <th>Outgoing</th>
        <th>Amount</th>
        <th>X</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Description</td>
        <td>357</td>
        <td>X</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class OutgoingsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
