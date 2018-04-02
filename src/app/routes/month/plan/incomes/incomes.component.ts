import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { JournalEntry } from "@routes/month/models/journal_entry.model";

@Component({
  selector: "kab-incomes",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <header>
    <h3>Projected Incomes <span class="float-right">{{totalAmount}} €</span></h3>
  </header>
  <table>
    <thead>
      <tr>
        <th>Income</th>
        <th>Amount</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let projection of projectionsToList">
        <td>{{ projection.description }}</td>
        <td>{{ projection.amount }}</td>
        <td><button (click)="delete(projection)">X</button>  </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class IncomesComponent implements OnInit, OnChanges {
  @Input() public projectionsToList: JournalEntry[] = [];
  @Output() public deleteProjection = new EventEmitter<JournalEntry>();
  public totalAmount = 0;
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.projectionsToList) {
      this.totalAmount = this.projectionsToList
        .map(p => p.amount)
        .reduce((state, current) => state + current, 0);
    }
  }
  public delete(projection: JournalEntry) {
    this.deleteProjection.emit(projection);
  }
}
