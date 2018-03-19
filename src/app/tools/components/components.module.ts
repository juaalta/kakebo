import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { NavComponent } from "./layout/nav/nav.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent, FooterComponent, NavComponent],
  exports: [HeaderComponent, FooterComponent, NavComponent]
})
/**
 * Shared module with components for every view
 */
export class ComponentsModule {}
