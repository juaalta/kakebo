import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./month-routing.module";
import { MonthComponent } from "./month.component";
import { ComponentsModule } from "@tools/components/components.module";
import { ApiService } from "@routes/month/api.service";
import { StoreService } from "@routes/month/store.service";
import { Reducers } from "@routes/month/reducers.service";
import { StoreModule } from '@ngrx/store';
import * as fromMonth from '../../state';

@NgModule({
  imports: [CommonModule, ControlRoutingModule, ComponentsModule, StoreModule.forFeature('month', fromMonth.reducers, { metaReducers: fromMonth.metaReducers })],
  declarations: [MonthComponent],
  providers: [ApiService, StoreService, Reducers]
})
export class MonthModule {}
