import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  constructor() {}

  public mustShowErrors = (control: AbstractControl) =>
    (control.touched || control.dirty) && control.invalid;
}
