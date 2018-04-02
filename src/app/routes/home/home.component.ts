import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-home",
  template: `
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
