import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-widget",
  template: `
    <header class="container">
      <h3 class="row">
        <ng-content select="[kab-widget-title]"></ng-content>
        <ng-content select="[kab-widget-value]" class="float-right"></ng-content>
      </h3>
      <ng-content select="[kab-widget-subtitle]"></ng-content>
    </header>
    <main class ="container">
      <ng-content select="[kab-widget-main]"></ng-content>
    </main>
  `,
  styles: []
})
export class WidgetComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
