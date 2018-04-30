import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { JournalEntry } from '../../store/models/journal-entry.model';
import { FormsService } from '../../../core/forms.service';

@Component({
  selector: 'kab-new-forecast',
  templateUrl: './new-forecast.component.html',
  styleUrls: []
})
export class NewForecastComponent implements OnInit {
  @Input() public forecast: JournalEntry;
  @Input() public kinds: Array<any>;
  @Output() public save = new EventEmitter<JournalEntry>();
  public mustShowErrors = this.formsService.mustShowErrors;

  constructor(private formsService: FormsService) {}

  ngOnInit() {}

  public onSubmitForecast = () => this.save.next(this.forecast);
}
