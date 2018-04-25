import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { JournalEntry } from '../../state/models/journal-entry.model';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'kab-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: []
})
export class NewExpenseComponent implements OnInit {
  @Input() public expense: JournalEntry;
  @Input() public expenseCategories: Array<any>;
  @Output() public save = new EventEmitter<JournalEntry>();
  constructor() {}

  ngOnInit() {}

  public mustShowErrors = (control: AbstractControl) =>
    (control.touched || control.dirty) && control.invalid;

  public submitExpense = () => this.save.next(this.expense);
}
