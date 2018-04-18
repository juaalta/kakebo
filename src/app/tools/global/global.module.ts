import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptorService } from "@tools/global/token-interceptor.service";
import { CatchInterceptorService } from "@tools/global/catch-interceptor.service";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "@environments/environment";
import { reducers, metaReducers } from "@tools/global/state";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "@tools/global/state/user/user.effects";
import { UserApi } from "@tools/global/state/user/user-api.service";
import { UserService } from "@tools/global/state/user/user.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchInterceptorService,
      multi: true
    },
    UserApi,
    UserService
  ]
})
/**
 * Core module with providers for the Root Module
 */
export class GlobalModule { }
