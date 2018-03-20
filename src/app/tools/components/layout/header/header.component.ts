import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-header",
  template: `
    <header>
      <a class="button button-clear" routerLink="">Kakebo</a>
      <a class="button button-clear" routerLink="about">About</a>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
