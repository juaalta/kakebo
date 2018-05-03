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
  @Input() public expense: JournalEntry;
  @Input() public categories: Array<any>;
  @Output() public save = new EventEmitter<JournalEntry>();
  public form: FormGroup;
  public mustShowErrors = this.formsService.mustShowErrors;

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: this.expense.description,
      amount: [
        this.expense.amount,
        [Validators.required, Validators.min(0)]
      ],
      category: [this.expense.category, Validators.required],
      date: this.formsService.getSafeDateFromMonth(2018, 5)
    });
  }

  public onSubmitExpense = (expense: JournalEntry) =>
    this.save.next(expense);
}
