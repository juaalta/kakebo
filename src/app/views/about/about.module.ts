import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { ComponentsModule } from '../../lib/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    ComponentsModule
  ],
  declarations: []
})
export class AboutModule { }
