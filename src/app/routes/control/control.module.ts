import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./control-routing.module";
import { ControlComponent } from "./control.component";
import { ComponentsModule } from "@tools/components/components.module";
import { ControlService } from "@routes/control/control.service";
import { ControlApiService } from "@routes/control/control-api.service";
import { ControlGuard } from "@routes/control/control.guard";

@NgModule({
  imports: [CommonModule, ControlRoutingModule, ComponentsModule],
  declarations: [ControlComponent],
  providers:[ControlService, ControlApiService, ControlGuard]
})
export class ControlModule {}
