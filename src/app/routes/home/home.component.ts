import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-home",
  template: `
    <h1>Kakebo</h1>  
    <kab-dashboard></kab-dashboard>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
