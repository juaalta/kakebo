import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "kab-widget-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'h1'">
        <h1>{{ caption }} <span>{{value}}</span></h1>  
      </ng-container>
      <ng-container *ngSwitchCase="'h2'">
        <h2>{{ caption }} <span>{{value}}</span></h2>  
      </ng-container>
      <ng-container *ngSwitchCase="'h3'">
        <h3>{{ caption }} <span>{{value}}</span></h3>  
      </ng-container>
    </ng-container>
  `,
  styles: ["header { padding: 0px !important;}"]
})
export class WidgetHeaderComponent implements OnInit {
  @Input() public mode: "h1" | "h2" | "h3";
  @Input() public caption: string;
  @Input() public value: string;
  constructor() { }

  ngOnInit() { }
}
