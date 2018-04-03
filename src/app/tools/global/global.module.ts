import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { GlobalStoreService } from "@tools/global/global-store.service";
import { TokenInterceptorService } from "@tools/global/token-interceptor.service";
import { CatchInterceptorService } from "@tools/global/catch-interceptor.service";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, StoreModule.forRoot(reducers, { metaReducers }), !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
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
