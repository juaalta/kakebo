import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { JournalEntry } from '../../state/models/journal-entry.model';

@Component({
  selector: 'kab-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: []
})
export class ListExpensesComponent implements OnInit {
  @Input() public expenses: JournalEntry[];
  @Output() public delete = new EventEmitter<JournalEntry>();
  constructor() {}

  ngOnInit() {}

  public onClickDeleteExpense = (expense: JournalEntry) =>
    this.delete.next(expense);
}
