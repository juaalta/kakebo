import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { JournalEntry } from '../../state/models/journal-entry.model';
import { AbstractControl } from '@angular/forms';
import { FormsService } from '../../../core/forms.service';

@Component({
  selector: 'kab-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: []
})
export class NewExpenseComponent implements OnInit {
  @Input() public expense: JournalEntry;
  @Input() public categories: Array<any>;
  @Output() public save = new EventEmitter<JournalEntry>();
  public mustShowErrors = this.formsService.mustShowErrors;

  constructor(private formsService: FormsService) {}

  ngOnInit() {}

  public onSubmitExpense = () => this.save.next(this.expense);
}
