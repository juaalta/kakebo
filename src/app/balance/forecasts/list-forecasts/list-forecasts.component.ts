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
