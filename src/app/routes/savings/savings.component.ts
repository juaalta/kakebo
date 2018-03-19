import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-savings",
  template: `
  <h1>Your savings...<span class="float-right">1135 €</span></h1>
  <section class="row">
    <kab-nav class="column column-20"></kab-nav>
    <section class="column float-left">
      <router-outlet></router-outlet>
    </section>    
  </section>
  `,
  styles: []
})
export class SavingsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
