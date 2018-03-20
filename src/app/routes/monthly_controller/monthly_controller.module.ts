import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MonthlyControllerRoutingModule } from "./monthly_controller-routing.module";
import { MonthlyControllerComponent } from "./monthly_controller.component";
import { ComponentsModule } from "@tools/components/components.module";

@NgModule({
  imports: [CommonModule, MonthlyControllerRoutingModule, ComponentsModule],
  declarations: [MonthlyControllerComponent]
})
export class MonthlyControllerModule {}
