import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./month-routing.module";
import { MonthComponent } from "./month.component";
import { ComponentsModule } from "@tools/components/components.module";
import { ApiService } from "@routes/month/api.service";
import { MonthStore } from "@routes/month/state/month-store.state";

@NgModule({
  imports: [CommonModule, ControlRoutingModule, ComponentsModule],
  declarations: [MonthComponent],
  providers: [ApiService, MonthStore]
})
export class MonthModule {}
