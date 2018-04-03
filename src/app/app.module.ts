import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app.component";

import { environment } from "../environments/environment";
import { GlobalModule } from "@tools/global/global.module";
import { ComponentsModule } from "@tools/components/components.module";
import { StoreModule } from '@ngrx/store';
import * as fromState from './reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    GlobalModule,
    ComponentsModule,
    StoreModule.forFeature('state', fromState.reducers, { metaReducers: fromState.metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
