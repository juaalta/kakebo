import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { NavComponent } from "./layout/nav/nav.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [HeaderComponent, FooterComponent, NavComponent],
  exports: [ReactiveFormsModule, HeaderComponent, FooterComponent, NavComponent]
})
/**
 * Shared module with components for every view
 */
export class ComponentsModule {}
