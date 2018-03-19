import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-header",
  template: `
    <a class="button button-clear" routerLink="">Kakebo</a>
    <a class="button button-clear" routerLink="about">About</a>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
