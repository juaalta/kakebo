import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ValidationErrorComponent],
  exports: [ValidationErrorComponent, FormsModule]
})
export class SharedModule {}
