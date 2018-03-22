import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "kab-widge-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="container">
      <h3 class="row">
      <span class="float-left">{{ title }}</span> <span class="float-right">{{value}} {{ unit }}</span>
      </h3>
      <p> {{ subtitle }} <span class="float-right">{{subvalue}} {{subunit}}</span> </p>
    </header>
  `,
  styles: []
})
export class WidgetHeaderComponent implements OnInit {
  @Input() public title: string;
  @Input() public value: number;
  @Input() public unit: string;
  @Input() public subtitle: string;
  @Input() public subvalue: number;
  @Input() public subunit: string;
  constructor() {}

  ngOnInit() {}
}
