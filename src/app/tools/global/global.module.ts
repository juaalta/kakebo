import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { GlobalStoreService } from "@tools/global/global-store.service";
import { TokenInterceptorService } from "@tools/global/token-interceptor.service";
import { CatchInterceptorService } from "@tools/global/catch-interceptor.service";
import { StoreModule } from '@ngrx/store';
import * as fromState from './reducers';

@NgModule({
  imports: [CommonModule, HttpClientModule, StoreModule.forFeature('state', fromState.reducers, { metaReducers: fromState.metaReducers })],
  providers: [
    GlobalStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchInterceptorService,
      multi: true
    }
  ]
})
/**
 * Core module with providers for the Root Module
 */
export class GlobalModule {}
