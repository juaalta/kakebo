import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./month-routing.module";
import { MonthComponent } from "./month.component";
import { ComponentsModule } from "@tools/components/components.module";
import { ApiService } from "@routes/month/api.service";
import { StoreService } from "@routes/month/store.service";
import { Reducers } from "@routes/month/reducers.service";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "@routes/month/state";
import { EffectsModule } from "@ngrx/effects";
import { MonthBalanceEffects } from "@routes/month/state/month-balance/month-balance.effects";
import { MonthBalanceApi } from "@routes/month/state/month-balance/month-balance-api.service";

@NgModule({
  imports: [
    CommonModule,
    ControlRoutingModule,
    ComponentsModule,
    StoreModule.forFeature("month", reducers, { metaReducers }),
    EffectsModule.forFeature([MonthBalanceEffects])
  ],
  declarations: [MonthComponent],
  providers: [ApiService, MonthBalanceApi , StoreService, Reducers]
})
export class MonthModule {}
