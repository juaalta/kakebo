import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { JournalEntry } from '../../store/models/journal-entry.model';
import { FormsService } from 'app/core/forms.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'kab-new-forecast',
  templateUrl: './new-forecast.component.html',
  styleUrls: []
})
export class NewForecastComponent implements OnInit {
  @Input() public forecast: JournalEntry;
  @Input() public kinds: Array<any>;
  @Output() public save = new EventEmitter<JournalEntry>();
  public form: FormGroup;
  public mustShowErrors = this.formsService.mustShowErrors;

  constructor(
    private formbuilder: FormBuilder,
    private formsService: FormsService
  ) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      kind: [this.forecast.kind, Validators.required],
      description: this.forecast.description,
      amount: [
        this.forecast.amount,
        [Validators.required, Validators.min(0)]
      ],
      date: this.formsService.getSafeDateFromMonth(2018, 5)
    });
  }

  public onSubmitForecast = (forecast: JournalEntry) =>
    this.save.next(forecast);
}
