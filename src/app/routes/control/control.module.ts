import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./control-routing.module";
import { ControlComponent } from "./control.component";
import { ComponentsModule } from "@tools/components/components.module";
import { ControlApiService } from "@routes/control/control-api.service";
import { StoreService } from "@routes/control/store.service";

@NgModule({
  imports: [CommonModule, ControlRoutingModule, ComponentsModule],
  declarations: [ControlComponent],
  providers: [ControlApiService, StoreService]
})
export class ControlModule {}
