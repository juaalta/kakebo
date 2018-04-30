import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kab-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: []
})
export class ValidationErrorComponent implements OnInit {
  @Input() public mustShow: boolean;
  @Input() public message: string;
  constructor() {}

  ngOnInit() {}
}
