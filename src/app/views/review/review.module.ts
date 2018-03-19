import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ComponentsModule } from '@lib/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReviewRoutingModule,
    ComponentsModule
  ],
  declarations: []
})
export class ReviewModule { }
