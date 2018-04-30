import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsService } from './forms.service';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { RequestInterceptorService } from './request-interceptor.service';
import { CatchInterceptorService } from './catch-interceptor.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { GlobalStoreService } from './state/global-store.service';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
  providers: [
    FormsService,
    GlobalStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
