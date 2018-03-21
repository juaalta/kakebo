import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";

@Component({
  selector: "kab-expenses-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h3>Expenses <span class="float-right">{{ totalAmount }} €</span></h3>
  <p>General, Leisure, Culture, Extras...</p>
  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Expense</th>
        <th>Amount</th>
        <th>X</th>
      </tr>
    </thead>
    <tbody>
    <tr *ngFor="let expense of expensesToList">
    <td>{{ expense.expenseCategory | categoryName }}</td>
    <td>{{ expense.description }}</td>
    <td>{{ expense.amount }}</td>
    <td><button (click)="delete(expense)">X</button>  </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class ExpensesListComponent implements OnInit {
  @Input() public expensesToList: JournalEntry[] = [];
  @Output() public deleteExpense = new EventEmitter<JournalEntry>();
  public totalAmount: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expensesToList) {
      this.totalAmount = this.expensesToList
        .map(p => p.amount)
        .reduce((state, current) => state + current, 0);
    }
  }
  public delete(expense: JournalEntry) {
    this.deleteExpense.emit(expense);
  }
}
