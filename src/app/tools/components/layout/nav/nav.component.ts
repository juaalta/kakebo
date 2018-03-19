import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-nav",
  template: `
  <nav>
    <a class="button button-clear" routerLink="plan">Plan</a>
    <a class="button button-clear" routerLink="track">Track</a>
    <a class="button button-clear" routerLink="review">Review</a>
  </nav>
  `,
  styles: []
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
