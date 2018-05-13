import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { JournalEntry } from '../../store/models/journal-entry.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
