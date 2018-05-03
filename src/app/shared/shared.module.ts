import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorComponent } from './validation-error/validation-error.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ValidationErrorComponent],
  exports: [ValidationErrorComponent, ReactiveFormsModule]
})
export class SharedModule {}
