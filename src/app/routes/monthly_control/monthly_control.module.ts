import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MonthlyControlRoutingModule } from "./monthly_control-routing.module";
import { MonthlyControlComponent } from "./monthly_control.component";
import { ComponentsModule } from "@tools/components/components.module";

@NgModule({
  imports: [CommonModule, MonthlyControlRoutingModule, ComponentsModule],
  declarations: [MonthlyControlComponent]
})
export class MonthlyControlModule {}
