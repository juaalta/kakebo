import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatchInterceptorService } from './catch-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import { FormsService } from './forms.service';
import { HeaderComponent } from './header/header.component';
import { RequestInterceptorService } from './request-interceptor.service';
import { GlobalStoreService } from './store/global-store.service';
import { TokenInterceptorService } from './token-interceptor.service';

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
