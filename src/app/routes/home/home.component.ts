import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-home",
  template: `
  <header>
    <h1>Kakebo</h1>  
  </header>
  <main>
    <kab-dashboard></kab-dashboard>
  </main>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
