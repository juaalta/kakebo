import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-nav",
  template: `
  <nav>
    <a class="button button-clear" routerLink="">Plan</a>
    <a class="button button-clear" routerLink="">Track</a>
    <a class="button button-clear" routerLink="">Review</a>
  </nav>
  `,
  styles: []
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
