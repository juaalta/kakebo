import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../store/journal-entry.service';
import { JournalEntry } from '../store/models/journal-entry.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'kab-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: []
})
export class ForecastsComponent implements OnInit {
  public title = 'New Forecast';
  public forecastKinds: any[];
  public currentForecast: JournalEntry;
  public forecastsList$: Observable<JournalEntry[]>;

  constructor(private jeService: JournalEntryService) {}

  ngOnInit() {
    this.refreshData();
  }

  public onSaveForecast(forecast: JournalEntry) {
    this.currentForecast = forecast;
    this.jeService
      .saveJournalEntry$(this.currentForecast)
      .subscribe(this.refreshData);
  }
  public onDeleteForecast(forecast: JournalEntry) {
    this.jeService
      .deleteJournalEntry$(forecast)
      .subscribe(this.refreshData);
  }
  private refreshData = () => {
    this.currentForecast = this.jeService.getNewForecast();
    this.forecastsList$ = this.jeService.getForecastsList$();
  };
}
