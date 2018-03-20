import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "kab-monthly-contoller",
  template: `
  <h1>On {{ month }} of {{ year }} you have... <span class="float-right">1135 €</span></h1>
  <section class="row">
    <kab-nav class="column column-20"></kab-nav>
    <section class="column float-left">
      <router-outlet></router-outlet>
    </section>    
  </section>
  `,
  styles: []
})
export class MonthlyControllerComponent implements OnInit {
  public month;
  public year;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.month = params["m"];
    this.year = params["y"];
  }
}
