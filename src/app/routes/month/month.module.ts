import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./month-routing.module";
import { MonthComponent } from "./month.component";
import { ComponentsModule } from "@tools/components/components.module";
import { ApiService } from "@routes/month/api.service";
import { StoreService } from "@routes/month/store.service";
import { Reducers } from "@routes/month/reducers.service";

@NgModule({
  imports: [CommonModule, ControlRoutingModule, ComponentsModule],
  declarations: [MonthComponent],
  providers: [ApiService, StoreService, Reducers]
})
export class MonthModule {}
