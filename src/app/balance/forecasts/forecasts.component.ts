import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../state/journal-entry.service';
import { JournalEntry } from '../state/models/journal-entry.model';

@Component({
  selector: 'kab-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: []
})
export class ForecastsComponent implements OnInit {
  public forecastKinds: any[];
  public currentForecast: JournalEntry;
  public forecastsList: JournalEntry[];
  public title = 'New Forecast';

  constructor(private jeService: JournalEntryService) {}

  ngOnInit() {
    this.refreshData();
  }

  public onSaveForecast() {
    this.jeService.saveJournalEntry(this.currentForecast);
    this.refreshData();
  }
  public onDeleteForecast(forecast: JournalEntry) {
    this.jeService.deleteJournalEntry(forecast);
    this.refreshData();
  }

  private refreshData = () => {
    this.currentForecast = this.jeService.getNewForecast();
    this.forecastsList = this.jeService.getForecastList();
  };
}
