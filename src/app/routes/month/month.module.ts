import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./month-routing.module";
import { MonthComponent } from "./month.component";
import { ComponentsModule } from "@tools/components/components.module";
import { ApiService } from "@routes/month/api.service";
import { StoreService } from "@routes/month/store.service";
import { Reducers } from "@routes/month/reducers.service";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers, MONTH_FEATURE } from "@routes/month/state";
import { EffectsModule } from "@ngrx/effects";
import { MonthBalanceEffects } from "@routes/month/state/month-balance/month-balance.effects";
import { MonthBalanceApi } from "@routes/month/state/month-balance/month-balance-api.service";
import { JournalEntryEffects } from "@routes/month/state/journal-entry/journal-entry.effects";
import { JournalEntryApi } from "@routes/month/state/journal-entry/journal-entry-api.service";

@NgModule({
  imports: [
    CommonModule,
    ControlRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(MONTH_FEATURE, reducers, { metaReducers }),
    EffectsModule.forFeature([MonthBalanceEffects,JournalEntryEffects])
  ],
  declarations: [MonthComponent],
  providers: [ApiService, MonthBalanceApi ,JournalEntryApi, StoreService, Reducers]
})
export class MonthModule {}
