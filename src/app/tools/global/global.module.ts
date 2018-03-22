import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestInterceptorService } from '@tools/global/request-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptorService,
    multi: true
  }]
})
/**
 * Core module with providers for the Root Module
 */
export class GlobalModule { }
