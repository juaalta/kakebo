import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { JournalEntry } from '../../state/models/journal-entry.model';

@Component({
  selector: 'kab-list-forecasts',
  templateUrl: './list-forecasts.component.html',
  styleUrls: []
})
export class ListForecastsComponent implements OnInit {
  @Input() public forecasts: JournalEntry[];
  @Output() public delete = new EventEmitter<JournalEntry>();
  constructor() {}

  ngOnInit() {}

  public onClickDeleteForecast = (forecast: JournalEntry) =>
    this.delete.next(forecast);
}
