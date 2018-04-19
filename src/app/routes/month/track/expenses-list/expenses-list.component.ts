import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";

@Component({
  selector: "kab-expenses-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  // template: `
  // <kab-widget-header mode="h3" caption="Expenses" value="{{ totalAmount }} €"></kab-widget-header>
  // <table>
  //   <thead>
  //     <tr>
  //       <th>Category</th>
  //       <th>Expense</th>
  //       <th>Amount</th>
  //       <th>X</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //   <tr *ngFor="let expense of expensesToList">
  //   <td>{{ expense.expenseCategory | categoryName }}</td>
  //   <td>{{ expense.description }}</td>
  //   <td>{{ expense.amount }}</td>
  //   <td><button (click)="delete(expense)">X</button>  </td>
  //     </tr>
  //   </tbody>
  // </table>
  // `,
  templateUrl: './expenses-list.component.html',
  styles: []
})
export class ExpensesListComponent implements OnInit {
  @Input() public expensesToList: JournalEntry[] = [];
  @Output() public deleteExpense = new EventEmitter<JournalEntry>();
  public totalAmount: number;
  public columnsToDisplay = ['expenseCategory', 'description', 'amount', 'actions'];

  constructor() { }

  ngOnInit() { }

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
