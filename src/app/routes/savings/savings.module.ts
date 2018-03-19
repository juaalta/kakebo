import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { KakeboRoutingModule } from "./savings-routing.module";
import { SavingsComponent } from "./savings.component";
import { ComponentsModule } from "@tools/components/components.module";

@NgModule({
  imports: [CommonModule, KakeboRoutingModule, ComponentsModule],
  declarations: [SavingsComponent]
})
export class SavingsModule {}
