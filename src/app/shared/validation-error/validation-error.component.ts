import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsService } from 'app/core/forms.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'kab-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: []
})
export class ValidationErrorComponent
  implements OnInit, OnChanges {
  @Input() public control: AbstractControl;
  @Input() public mustShow: boolean;
  @Input() public message: string;
  public mustShowErrors = this.formsService.mustShowErrors;
  constructor(private formsService: FormsService) {}

  ngOnInit() {
    this.checkErrors();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.table(changes.control);
    this.checkErrors();
  }
  private checkErrors() {
    if (this.control) {
      this.mustShow = this.mustShowErrors(this.control);
      if (this.mustShow) {
        this.message = JSON.stringify(this.control.errors);
      }
    }
  }
}
