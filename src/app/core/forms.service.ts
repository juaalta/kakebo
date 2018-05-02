import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  constructor() {}

  public mustShowErrors = (control: AbstractControl) =>
    (control.touched || control.dirty) && control.invalid;

  public getSafeDateFromMonth = (year, month): string =>
    new Date(year, month - 1, 1, 12, 0, 0)
      .toISOString()
      .substring(0, 10);
  public getSafeDay = (date: Date): number =>
    new Date(date).getDay();
}
