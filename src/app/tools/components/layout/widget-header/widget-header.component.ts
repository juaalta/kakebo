import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "kab-widget-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <small>
      <em>{{ target | json }}</em>
    </small>
  `,
  styles: []
})
export class WidgetHeaderComponent implements OnInit {
  @Input() public target: any;
  constructor() {}

  ngOnInit() {}
}
