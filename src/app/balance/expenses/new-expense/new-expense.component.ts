import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { JournalEntry } from '../../store/models/journal-entry.model';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { FormsService } from 'app/core/forms.service';

@Component({
  selector: 'kab-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: []
})
export class NewExpenseComponent implements OnInit {
  public form: FormGroup;
  @Input() public categories: Array<any>;
  @Output() public save = new EventEmitter<JournalEntry>();
  public mustShowErrors = this.formsService.mustShowErrors;

  constructor(
    private formbuilder: FormBuilder,
    private formsService: FormsService
  ) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      description: '',
      amount: [0, [Validators.required, Validators.min(0)]],
      expenseCategory: [null, Validators.required],
      date: this.formsService.getSafeDateFromMonth(2018, 5)
    });
  }

  public onSubmitExpense = (expense: JournalEntry) =>
    this.save.next(expense);
}
