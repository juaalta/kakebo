import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app.component";

import { environment } from "../environments/environment";
import { GlobalModule } from "@tools/global/global.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    GlobalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
