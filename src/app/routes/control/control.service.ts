import { Injectable } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";
import { ControlApiService } from "@routes/control/control-api.service";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
@Injectable()
export class ControlService {
  constructor(private controlApi: ControlApiService) {
    // this.store.selectMonthMustBeRecalculated$.subscribe(
    //   this.putMonthBalance.bind(this)
    // );
  }
}
