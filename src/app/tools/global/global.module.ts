import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptorService } from "@tools/global/token-interceptor.service";
import { CatchInterceptorService } from "@tools/global/catch-interceptor.service";
import { GlobalStore } from "@tools/global/state/global-store.state";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    GlobalStore,
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
